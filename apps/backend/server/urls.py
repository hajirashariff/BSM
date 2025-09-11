from django.contrib import admin
from django.urls import path, re_path
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


@api_view(['GET'])
def health(_: any):
    return Response({"status": "ok"})


schema_view = get_schema_view(
    openapi.Info(title="Pro BSM API", default_version='v1', description="Pro BSM Backend API"),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('health', health, name='health'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]


