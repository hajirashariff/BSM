from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Article, Category, Tag, ArticleRevision, Attachment,
    ArticleView, ArticleFeedback, SearchQuery, ArticleApproval,
    KnowledgeBaseSetting
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class CategorySerializer(serializers.ModelSerializer):
    article_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'parent', 'sort_order',
            'is_active', 'article_count', 'created_at', 'updated_at'
        ]


class TagSerializer(serializers.ModelSerializer):
    article_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Tag
        fields = [
            'id', 'name', 'slug', 'color', 'description',
            'article_count', 'created_at', 'updated_at'
        ]


class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    helpfulness_rate = serializers.SerializerMethodField()
    is_published = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'summary', 'content_markdown', 'content_html',
            'category', 'author', 'tags', 'status', 'visibility', 'is_featured',
            'language', 'product', 'version', 'seo_title', 'seo_description',
            'scheduled_publish_at', 'published_at', 'view_count', 'helpful_count',
            'not_helpful_count', 'helpfulness_rate', 'is_published',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'published_at', 'view_count', 'helpful_count', 'not_helpful_count']

    def get_helpfulness_rate(self, obj):
        return obj.get_helpfulness_rate()

    def get_is_published(self, obj):
        return obj.is_published()

    def create(self, validated_data):
        # Convert markdown to HTML
        if 'content_markdown' in validated_data:
            validated_data['content_html'] = self.markdown_to_html(validated_data['content_markdown'])
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Convert markdown to HTML
        if 'content_markdown' in validated_data:
            validated_data['content_html'] = self.markdown_to_html(validated_data['content_markdown'])
        
        return super().update(instance, validated_data)

    def markdown_to_html(self, markdown_text):
        """Convert markdown to HTML with security sanitization"""
        import markdown
        from bleach import clean
        
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


class ArticleRevisionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = ArticleRevision
        fields = [
            'id', 'article', 'title', 'content_markdown', 'content_html',
            'summary', 'revision_number', 'change_summary', 'author', 'created_at'
        ]
        read_only_fields = ['article', 'author', 'revision_number']


class AttachmentSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Attachment
        fields = [
            'id', 'article', 'filename', 'original_filename', 'file_path',
            'file_size', 'mime_type', 'uploaded_by', 'created_at'
        ]
        read_only_fields = ['uploaded_by']


class ArticleViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ArticleView
        fields = [
            'id', 'article', 'user', 'ip_address', 'user_agent',
            'referrer', 'viewed_at'
        ]


class ArticleFeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ArticleFeedback
        fields = [
            'id', 'article', 'user', 'ip_address', 'is_helpful',
            'comment', 'created_at'
        ]


class SearchQuerySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    clicked_article = ArticleSerializer(read_only=True)
    
    class Meta:
        model = SearchQuery
        fields = [
            'id', 'query', 'user', 'ip_address', 'results_count',
            'clicked_article', 'created_at'
        ]


class ArticleApprovalSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    
    class Meta:
        model = ArticleApproval
        fields = [
            'id', 'article', 'reviewer', 'status', 'comments',
            'reviewed_at', 'created_at'
        ]
        read_only_fields = ['reviewer']


class KnowledgeBaseSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBaseSetting
        fields = ['id', 'key', 'value', 'description', 'updated_at']


