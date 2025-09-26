"""
URL configuration for bsm_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ai_services/', include('ai_services.urls')),
]
