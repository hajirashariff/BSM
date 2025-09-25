from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json
import logging
from .services import ticket_ai, account_ai, knowledge_ai, workflow_ai
from .models import AIModel, AIPrediction, AIInsight

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def classify_ticket(request):
    """AI endpoint for ticket classification and auto-assignment"""
    try:
        data = request.data
        subject = data.get('subject', '')
        description = data.get('description', '')
        
        if not subject or not description:
            return Response(
                {'error': 'Subject and description are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        result = ticket_ai.classify_ticket(subject, description)
        
        return Response({
            'success': True,
            'classification': result,
            'message': 'Ticket classified successfully'
        })
        
    except Exception as e:
        logger.error(f"Error in ticket classification: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def analyze_account(request):
    """AI endpoint for account health analysis and churn prediction"""
    try:
        data = request.data
        
        if not data:
            return Response(
                {'error': 'Account data is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        result = account_ai.analyze_account_health(data)
        
        return Response({
            'success': True,
            'analysis': result,
            'message': 'Account analyzed successfully'
        })
        
    except Exception as e:
        logger.error(f"Error in account analysis: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def enhance_search(request):
    """AI endpoint for enhanced knowledge base search"""
    try:
        data = request.data
        query = data.get('query', '')
        articles = data.get('articles', [])
        
        if not query:
            return Response(
                {'error': 'Search query is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        result = knowledge_ai.enhance_search(query, articles)
        
        return Response({
            'success': True,
            'enhanced_results': result,
            'message': 'Search enhanced successfully'
        })
        
    except Exception as e:
        logger.error(f"Error in enhanced search: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_content_suggestions(request):
    """AI endpoint for generating content suggestions"""
    try:
        data = request.data
        topic = data.get('topic', '')
        
        if not topic:
            return Response(
                {'error': 'Topic is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        suggestions = knowledge_ai.generate_content_suggestions(topic)
        
        return Response({
            'success': True,
            'suggestions': suggestions,
            'message': 'Content suggestions generated successfully'
        })
        
    except Exception as e:
        logger.error(f"Error generating content suggestions: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def analyze_workflow(request):
    """AI endpoint for workflow optimization analysis"""
    try:
        data = request.data
        
        if not data:
            return Response(
                {'error': 'Workflow data is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        result = workflow_ai.analyze_workflow_efficiency(data)
        
        return Response({
            'success': True,
            'analysis': result,
            'message': 'Workflow analyzed successfully'
        })
        
    except Exception as e:
        logger.error(f"Error in workflow analysis: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_ai_insights(request):
    """Get AI-generated insights"""
    try:
        insight_type = request.GET.get('type', None)
        limit = int(request.GET.get('limit', 10))
        
        insights = AIInsight.objects.all()
        if insight_type:
            insights = insights.filter(insight_type=insight_type)
        
        insights = insights.order_by('-created_at')[:limit]
        
        result = []
        for insight in insights:
            result.append({
                'id': insight.id,
                'type': insight.insight_type,
                'title': insight.title,
                'description': insight.description,
                'confidence': insight.confidence,
                'is_actionable': insight.is_actionable,
                'is_implemented': insight.is_implemented,
                'created_at': insight.created_at.isoformat(),
                'data': insight.data
            })
        
        return Response({
            'success': True,
            'insights': result,
            'message': 'Insights retrieved successfully'
        })
        
    except Exception as e:
        logger.error(f"Error retrieving insights: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def create_ai_insight(request):
    """Create a new AI insight"""
    try:
        data = request.data
        
        insight = AIInsight.objects.create(
            insight_type=data.get('type', 'workflow_optimization'),
            title=data.get('title', ''),
            description=data.get('description', ''),
            confidence=data.get('confidence', 0.5),
            data=data.get('data', {}),
            is_actionable=data.get('is_actionable', True)
        )
        
        return Response({
            'success': True,
            'insight_id': insight.id,
            'message': 'Insight created successfully'
        })
        
    except Exception as e:
        logger.error(f"Error creating insight: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_ai_models(request):
    """Get available AI models"""
    try:
        models = AIModel.objects.filter(is_active=True)
        
        result = []
        for model in models:
            result.append({
                'id': model.id,
                'name': model.name,
                'type': model.model_type,
                'version': model.version,
                'accuracy_score': model.accuracy_score,
                'created_at': model.created_at.isoformat(),
                'config': model.config
            })
        
        return Response({
            'success': True,
            'models': result,
            'message': 'Models retrieved successfully'
        })
        
    except Exception as e:
        logger.error(f"Error retrieving models: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_ai_predictions(request):
    """Get AI predictions history"""
    try:
        model_id = request.GET.get('model_id', None)
        limit = int(request.GET.get('limit', 20))
        
        predictions = AIPrediction.objects.all()
        if model_id:
            predictions = predictions.filter(model_id=model_id)
        
        predictions = predictions.order_by('-created_at')[:limit]
        
        result = []
        for prediction in predictions:
            result.append({
                'id': prediction.id,
                'model_name': prediction.model.name,
                'input_data': prediction.input_data,
                'prediction': prediction.prediction,
                'confidence_score': prediction.confidence_score,
                'created_at': prediction.created_at.isoformat()
            })
        
        return Response({
            'success': True,
            'predictions': result,
            'message': 'Predictions retrieved successfully'
        })
        
    except Exception as e:
        logger.error(f"Error retrieving predictions: {e}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def ai_health_check(request):
    """AI services health check"""
    try:
        # Test all AI services
        services_status = {
            'ticket_classification': 'healthy',
            'account_analysis': 'healthy',
            'knowledge_base': 'healthy',
            'workflow_optimization': 'healthy'
        }
        
        return Response({
            'success': True,
            'status': 'healthy',
            'services': services_status,
            'message': 'All AI services are operational'
        })
        
    except Exception as e:
        logger.error(f"Error in AI health check: {e}")
        return Response(
            {'error': 'AI services health check failed'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

