from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArticleViewSet, CategoryViewSet, TagViewSet, AttachmentViewSet,
    SearchViewSet, AnalyticsViewSet, KnowledgeBaseSettingViewSet
)

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tags', TagViewSet)
router.register(r'attachments', AttachmentViewSet)
router.register(r'search', SearchViewSet, basename='search')
router.register(r'analytics', AnalyticsViewSet, basename='analytics')
router.register(r'settings', KnowledgeBaseSettingViewSet)

urlpatterns = [
    path('api/kb/', include(router.urls)),
]


