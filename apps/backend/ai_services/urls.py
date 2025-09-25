from django.urls import path
from . import views

urlpatterns = [
    # AI Service Endpoints
    path('classify-ticket/', views.classify_ticket, name='classify_ticket'),
    path('analyze-account/', views.analyze_account, name='analyze_account'),
    path('enhance-search/', views.enhance_search, name='enhance_search'),
    path('generate-content-suggestions/', views.generate_content_suggestions, name='generate_content_suggestions'),
    path('analyze-workflow/', views.analyze_workflow, name='analyze_workflow'),
    
    # AI Data Endpoints
    path('insights/', views.get_ai_insights, name='get_ai_insights'),
    path('insights/create/', views.create_ai_insight, name='create_ai_insight'),
    path('models/', views.get_ai_models, name='get_ai_models'),
    path('predictions/', views.get_ai_predictions, name='get_ai_predictions'),
    
    # Health Check
    path('health/', views.ai_health_check, name='ai_health_check'),
]

