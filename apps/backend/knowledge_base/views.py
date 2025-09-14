from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q, Count, Avg
from django.utils import timezone
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import json
import markdown
from bleach import clean
import re

from .models import (
    Article, Category, Tag, ArticleRevision, Attachment,
    ArticleView, ArticleFeedback, SearchQuery, ArticleApproval,
    KnowledgeBaseSetting
)
from .serializers import (
    ArticleSerializer, CategorySerializer, TagSerializer,
    ArticleRevisionSerializer, AttachmentSerializer,
    ArticleViewSerializer, ArticleFeedbackSerializer,
    SearchQuerySerializer, ArticleApprovalSerializer,
    KnowledgeBaseSettingSerializer
)


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Article.objects.select_related('author', 'category').prefetch_related('tags')
        
        # Filter by status for non-admin users
        if not self.request.user.is_staff:
            queryset = queryset.filter(status='published')
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by tag
        tag = self.request.query_params.get('tag', None)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        
        # Filter by author
        author = self.request.query_params.get('author', None)
        if author:
            queryset = queryset.filter(author__username=author)
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(summary__icontains=search) |
                Q(content_markdown__icontains=search)
            )
        
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        article = self.get_object()
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        article.status = 'published'
        article.published_at = timezone.now()
        article.save()
        
        return Response({'status': 'published'})

    @action(detail=True, methods=['post'])
    def unpublish(self, request, pk=None):
        article = self.get_object()
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        article.status = 'draft'
        article.published_at = None
        article.save()
        
        return Response({'status': 'unpublished'})

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        article = self.get_object()
        new_article = Article.objects.create(
            title=f"{article.title} (Copy)",
            slug=f"{article.slug}-copy-{timezone.now().timestamp()}",
            summary=article.summary,
            content_markdown=article.content_markdown,
            category=article.category,
            author=request.user,
            status='draft',
            visibility=article.visibility,
            language=article.language,
            product=article.product,
            version=article.version
        )
        new_article.tags.set(article.tags.all())
        
        serializer = self.get_serializer(new_article)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        article = self.get_object()
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        article.status = 'archived'
        article.save()
        
        return Response({'status': 'archived'})

    @action(detail=True, methods=['get'])
    def revisions(self, request, pk=None):
        article = self.get_object()
        revisions = ArticleRevision.objects.filter(article=article).order_by('-revision_number')
        serializer = ArticleRevisionSerializer(revisions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def create_revision(self, request, pk=None):
        article = self.get_object()
        
        # Create revision
        revision_number = ArticleRevision.objects.filter(article=article).count() + 1
        revision = ArticleRevision.objects.create(
            article=article,
            title=article.title,
            content_markdown=article.content_markdown,
            content_html=article.content_html,
            summary=article.summary,
            revision_number=revision_number,
            change_summary=request.data.get('change_summary', ''),
            author=request.user
        )
        
        serializer = ArticleRevisionSerializer(revision)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def restore_revision(self, request, pk=None):
        article = self.get_object()
        revision_id = request.data.get('revision_id')
        
        try:
            revision = ArticleRevision.objects.get(id=revision_id, article=article)
            article.title = revision.title
            article.content_markdown = revision.content_markdown
            article.content_html = revision.content_html
            article.summary = revision.summary
            article.save()
            
            return Response({'status': 'restored'})
        except ArticleRevision.DoesNotExist:
            return Response({'error': 'Revision not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def track_view(self, request, pk=None):
        article = self.get_object()
        
        # Track view
        ArticleView.objects.create(
            article=article,
            user=request.user if request.user.is_authenticated else None,
            ip_address=self.get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
            referrer=request.META.get('HTTP_REFERER', '')
        )
        
        # Update view count
        article.view_count += 1
        article.save()
        
        return Response({'view_count': article.view_count})

    @action(detail=True, methods=['post'])
    def feedback(self, request, pk=None):
        article = self.get_object()
        is_helpful = request.data.get('is_helpful', True)
        comment = request.data.get('comment', '')
        
        # Create feedback
        ArticleFeedback.objects.create(
            article=article,
            user=request.user if request.user.is_authenticated else None,
            ip_address=self.get_client_ip(request),
            is_helpful=is_helpful,
            comment=comment
        )
        
        # Update counts
        if is_helpful:
            article.helpful_count += 1
        else:
            article.not_helpful_count += 1
        article.save()
        
        return Response({
            'helpful_count': article.helpful_count,
            'not_helpful_count': article.not_helpful_count,
            'helpfulness_rate': article.get_helpfulness_rate()
        })

    @action(detail=False, methods=['get'])
    def featured(self, request):
        articles = Article.objects.filter(
            is_featured=True,
            status='published'
        ).order_by('-created_at')[:10]
        
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popular(self, request):
        articles = Article.objects.filter(
            status='published'
        ).order_by('-view_count')[:10]
        
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        articles = Article.objects.filter(
            status='published'
        ).order_by('-published_at')[:10]
        
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Category.objects.filter(is_active=True)
        
        # Include article counts
        queryset = queryset.annotate(
            article_count=Count('article', filter=Q(article__status='published'))
        )
        
        return queryset.order_by('sort_order', 'name')

    def perform_create(self, serializer):
        serializer.save()


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Tag.objects.all()
        
        # Include article counts
        queryset = queryset.annotate(
            article_count=Count('article', filter=Q(article__status='published'))
        )
        
        return queryset.order_by('name')


class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Attachment.objects.filter(article__author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class SearchViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({'results': [], 'total': 0})
        
        # Track search query
        SearchQuery.objects.create(
            query=query,
            user=request.user if request.user.is_authenticated else None,
            ip_address=self.get_client_ip(request)
        )
        
        # Search articles
        articles = Article.objects.filter(
            Q(title__icontains=query) |
            Q(summary__icontains=query) |
            Q(content_markdown__icontains=query),
            status='published'
        ).order_by('-view_count')
        
        # Pagination
        page = int(request.query_params.get('page', 1))
        per_page = int(request.query_params.get('per_page', 20))
        paginator = Paginator(articles, per_page)
        page_obj = paginator.get_page(page)
        
        serializer = ArticleSerializer(page_obj, many=True)
        
        return Response({
            'results': serializer.data,
            'total': paginator.count,
            'page': page,
            'per_page': per_page,
            'pages': paginator.num_pages
        })

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class AnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        # Basic analytics
        total_articles = Article.objects.count()
        published_articles = Article.objects.filter(status='published').count()
        total_views = ArticleView.objects.count()
        total_feedback = ArticleFeedback.objects.count()
        
        # Top articles by views
        top_articles = Article.objects.filter(
            status='published'
        ).order_by('-view_count')[:10]
        
        # Most helpful articles
        helpful_articles = Article.objects.filter(
            status='published'
        ).annotate(
            helpfulness_rate=Avg('feedback__is_helpful')
        ).order_by('-helpfulness_rate')[:10]
        
        # Recent searches
        recent_searches = SearchQuery.objects.order_by('-created_at')[:20]
        
        # Zero result searches
        zero_result_searches = SearchQuery.objects.filter(
            results_count=0
        ).order_by('-created_at')[:20]
        
        return Response({
            'overview': {
                'total_articles': total_articles,
                'published_articles': published_articles,
                'total_views': total_views,
                'total_feedback': total_feedback
            },
            'top_articles': ArticleSerializer(top_articles, many=True).data,
            'helpful_articles': ArticleSerializer(helpful_articles, many=True).data,
            'recent_searches': SearchQuerySerializer(recent_searches, many=True).data,
            'zero_result_searches': SearchQuerySerializer(zero_result_searches, many=True).data
        })


class KnowledgeBaseSettingViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeBaseSetting.objects.all()
    serializer_class = KnowledgeBaseSettingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_staff:
            return KnowledgeBaseSetting.objects.none()
        return KnowledgeBaseSetting.objects.all()

    def list(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        settings = {}
        for setting in self.get_queryset():
            settings[setting.key] = setting.value
        
        return Response(settings)

    def update(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            setting = self.get_object()
            setting.value = request.data.get('value', setting.value)
            setting.save()
            
            return Response({'status': 'updated'})
        except KnowledgeBaseSetting.DoesNotExist:
            return Response({'error': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)


# Markdown to HTML conversion utility
def markdown_to_html(markdown_text):
    """Convert markdown to HTML with security sanitization"""
    html = markdown.markdown(
        markdown_text,
        extensions=['codehilite', 'fenced_code', 'tables', 'toc']
    )
    
    # Sanitize HTML to prevent XSS
    allowed_tags = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 'strike',
        'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
        'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span'
    ]
    
    allowed_attributes = {
        'a': ['href', 'title'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'table': ['class'],
        'th': ['class'],
        'td': ['class'],
        'div': ['class'],
        'span': ['class']
    }
    
    return clean(html, tags=allowed_tags, attributes=allowed_attributes)
