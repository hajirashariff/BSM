from django.db import models
from django.contrib.auth.models import User
import json

class AIModel(models.Model):
    """Store AI model configurations and metadata"""
    name = models.CharField(max_length=100)
    model_type = models.CharField(max_length=50)  # 'classification', 'regression', 'nlp', 'recommendation'
    version = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    accuracy_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    config = models.JSONField(default=dict)
    
    def __str__(self):
        return f"{self.name} v{self.version}"

class AIPrediction(models.Model):
    """Store AI predictions and their results"""
    model = models.ForeignKey(AIModel, on_delete=models.CASCADE)
    input_data = models.JSONField()
    prediction = models.JSONField()
    confidence_score = models.FloatField()
    actual_result = models.JSONField(null=True, blank=True)  # For model evaluation
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

class AIInsight(models.Model):
    """Store AI-generated insights and recommendations"""
    INSIGHT_TYPES = [
        ('ticket_assignment', 'Ticket Assignment'),
        ('churn_prediction', 'Churn Prediction'),
        ('upsell_opportunity', 'Upsell Opportunity'),
        ('workflow_optimization', 'Workflow Optimization'),
        ('content_recommendation', 'Content Recommendation'),
    ]
    
    insight_type = models.CharField(max_length=50, choices=INSIGHT_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    confidence = models.FloatField()
    data = models.JSONField(default=dict)
    is_actionable = models.BooleanField(default=True)
    is_implemented = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.get_insight_type_display()}: {self.title}"

class AITrainingData(models.Model):
    """Store training data for AI models"""
    data_type = models.CharField(max_length=50)
    content = models.TextField()
    labels = models.JSONField(default=dict)
    metadata = models.JSONField(default=dict)
    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

