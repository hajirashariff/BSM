from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import json
import uuid

class UserProfile(models.Model):
    """Extended user profile with additional fields"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.URLField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    auth_method = models.CharField(max_length=20, choices=[
        ('google', 'Google OAuth'),
        ('email', 'Email/Password')
    ], default='email')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username}"

class Ticket(models.Model):
    """Support tickets model"""
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    CATEGORY_CHOICES = [
        ('technical', 'Technical Support'),
        ('billing', 'Billing & Invoices'),
        ('general', 'General Inquiry'),
        ('feature_request', 'Feature Request'),
        ('bug_report', 'Bug Report'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    subject = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tickets')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tickets')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    tags = models.JSONField(default=list, blank=True)
    attachments = models.JSONField(default=list, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.id}: {self.subject}"

class TicketComment(models.Model):
    """Comments on tickets"""
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_internal = models.BooleanField(default=False)  # Internal notes vs customer-visible comments
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Comment by {self.author.username} on {self.ticket.id}"

class Service(models.Model):
    """System services status"""
    STATUS_CHOICES = [
        ('operational', 'Operational'),
        ('minor_issues', 'Minor Issues'),
        ('major_issues', 'Major Issues'),
        ('maintenance', 'Under Maintenance'),
        ('outage', 'Outage'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='operational')
    health_score = models.IntegerField(default=100)  # 0-100
    category = models.CharField(max_length=50)
    features = models.JSONField(default=list)
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class ServiceIncident(models.Model):
    """Service incidents and maintenance"""
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='incidents')
    title = models.CharField(max_length=200)
    description = models.TextField()
    severity = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ])
    status = models.CharField(max_length=20, choices=[
        ('investigating', 'Investigating'),
        ('identified', 'Identified'),
        ('monitoring', 'Monitoring'),
        ('resolved', 'Resolved'),
    ])
    started_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.service.name}: {self.title}"

class Rating(models.Model):
    """Customer ratings and feedback"""
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]
    
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='ratings', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=[
        ('support', 'Support Quality'),
        ('response_time', 'Response Time'),
        ('resolution', 'Resolution Quality'),
        ('overall', 'Overall Experience'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username}: {self.rating} stars"

class Notification(models.Model):
    """User notifications"""
    NOTIFICATION_TYPES = [
        ('ticket_created', 'Ticket Created'),
        ('ticket_updated', 'Ticket Updated'),
        ('ticket_resolved', 'Ticket Resolved'),
        ('service_incident', 'Service Incident'),
        ('system_maintenance', 'System Maintenance'),
        ('rating_received', 'Rating Received'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    data = models.JSONField(default=dict, blank=True)  # Additional data for the notification
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username}: {self.title}"

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

