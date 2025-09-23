import openai
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import json
import logging
from typing import Dict, List, Any, Optional, Tuple
from .models import AIModel, AIPrediction, AIInsight, AITrainingData

logger = logging.getLogger(__name__)

class AIServiceBase:
    """Base class for AI services"""
    
    def __init__(self, model_name: str = None):
        self.model_name = model_name
        self.model = None
        self.vectorizer = None
        
    def load_model(self):
        """Load the AI model"""
        try:
            ai_model = AIModel.objects.get(name=self.model_name, is_active=True)
            # In a real implementation, you would load the actual model
            # For now, we'll use mock implementations
            return ai_model
        except AIModel.DoesNotExist:
            logger.error(f"Model {self.model_name} not found")
            return None
    
    def save_prediction(self, input_data: Dict, prediction: Any, confidence: float):
        """Save prediction to database"""
        model = self.load_model()
        if model:
            AIPrediction.objects.create(
                model=model,
                input_data=input_data,
                prediction=prediction,
                confidence_score=confidence
            )

class TicketClassificationService(AIServiceBase):
    """AI service for ticket classification and auto-assignment"""
    
    def __init__(self):
        super().__init__("ticket_classifier")
        self.categories = [
            'IT Support', 'System Maintenance', 'HR', 'Procurement', 
            'Security', 'Network', 'Software', 'Hardware', 'Access'
        ]
        self.priorities = ['Low', 'Medium', 'High', 'Urgent']
    
    def classify_ticket(self, subject: str, description: str) -> Dict[str, Any]:
        """Classify ticket and suggest assignment"""
        try:
            # Mock AI classification (replace with real ML model)
            text = f"{subject} {description}".lower()
            
            # Simple keyword-based classification (replace with ML)
            category = self._classify_by_keywords(text, self.categories)
            priority = self._classify_priority(text, description)
            assignee = self._suggest_assignee(category, priority)
            confidence = np.random.uniform(0.7, 0.95)  # Mock confidence
            
            prediction = {
                'category': category,
                'priority': priority,
                'suggested_assignee': assignee,
                'confidence': confidence,
                'tags': self._extract_tags(text)
            }
            
            self.save_prediction(
                {'subject': subject, 'description': description},
                prediction,
                confidence
            )
            
            return prediction
            
        except Exception as e:
            logger.error(f"Error in ticket classification: {e}")
            return {'error': str(e)}
    
    def _classify_by_keywords(self, text: str, categories: List[str]) -> str:
        """Simple keyword-based classification"""
        keyword_map = {
            'IT Support': ['email', 'login', 'password', 'access', 'account'],
            'System Maintenance': ['maintenance', 'update', 'upgrade', 'patch'],
            'HR': ['employee', 'onboarding', 'payroll', 'benefits'],
            'Procurement': ['purchase', 'license', 'software', 'hardware'],
            'Security': ['security', 'breach', 'virus', 'malware', 'firewall'],
            'Network': ['network', 'vpn', 'connection', 'wifi', 'internet'],
            'Software': ['software', 'application', 'program', 'bug'],
            'Hardware': ['computer', 'printer', 'server', 'device'],
            'Access': ['permission', 'role', 'access', 'privilege']
        }
        
        scores = {}
        for category, keywords in keyword_map.items():
            score = sum(1 for keyword in keywords if keyword in text)
            scores[category] = score
        
        return max(scores, key=scores.get) if max(scores.values()) > 0 else 'IT Support'
    
    def _classify_priority(self, text: str, description: str) -> str:
        """Classify ticket priority"""
        urgent_keywords = ['urgent', 'critical', 'down', 'broken', 'emergency']
        high_keywords = ['important', 'asap', 'soon', 'priority']
        medium_keywords = ['normal', 'standard', 'routine']
        
        full_text = f"{text} {description}".lower()
        
        if any(keyword in full_text for keyword in urgent_keywords):
            return 'Urgent'
        elif any(keyword in full_text for keyword in high_keywords):
            return 'High'
        elif any(keyword in full_text for keyword in medium_keywords):
            return 'Medium'
        else:
            return 'Low'
    
    def _suggest_assignee(self, category: str, priority: str) -> str:
        """Suggest ticket assignee based on category and priority"""
        assignee_map = {
            'IT Support': 'John Doe',
            'System Maintenance': 'Jane Smith',
            'HR': 'Mike Johnson',
            'Procurement': 'Sarah Wilson',
            'Security': 'Alex Rodriguez',
            'Network': 'David Brown',
            'Software': 'Lisa Wang',
            'Hardware': 'Robert Taylor',
            'Access': 'Emily Davis'
        }
        return assignee_map.get(category, 'John Doe')
    
    def _extract_tags(self, text: str) -> List[str]:
        """Extract relevant tags from ticket text"""
        common_tags = ['vpn', 'email', 'login', 'password', 'network', 'software', 'hardware']
        return [tag for tag in common_tags if tag in text.lower()]

class AccountInsightService(AIServiceBase):
    """AI service for account insights and predictions"""
    
    def __init__(self):
        super().__init__("account_insights")
    
    def analyze_account_health(self, account_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze account health and predict churn risk"""
        try:
            # Extract key metrics
            health_score = account_data.get('health', 0)
            satisfaction = account_data.get('satisfaction', 0)
            ticket_count = account_data.get('tickets', 0)
            open_tickets = account_data.get('openTickets', 0)
            avg_resolution_time = account_data.get('avgResolutionTime', '0h')
            last_activity = account_data.get('lastActivity', '')
            
            # Calculate churn risk
            churn_risk = self._calculate_churn_risk(
                health_score, satisfaction, ticket_count, 
                open_tickets, avg_resolution_time
            )
            
            # Generate insights
            insights = self._generate_account_insights(account_data, churn_risk)
            
            # Suggest actions
            actions = self._suggest_actions(account_data, churn_risk, insights)
            
            prediction = {
                'churn_risk': churn_risk,
                'health_trend': self._predict_health_trend(account_data),
                'upsell_opportunity': self._identify_upsell_opportunity(account_data),
                'insights': insights,
                'recommended_actions': actions,
                'confidence': np.random.uniform(0.8, 0.95)
            }
            
            self.save_prediction(account_data, prediction, prediction['confidence'])
            
            return prediction
            
        except Exception as e:
            logger.error(f"Error in account analysis: {e}")
            return {'error': str(e)}
    
    def _calculate_churn_risk(self, health: float, satisfaction: float, 
                            tickets: int, open_tickets: int, resolution_time: str) -> str:
        """Calculate churn risk based on multiple factors"""
        risk_score = 0
        
        # Health score factor
        if health < 70:
            risk_score += 3
        elif health < 85:
            risk_score += 1
        
        # Satisfaction factor
        if satisfaction < 3:
            risk_score += 3
        elif satisfaction < 4:
            risk_score += 1
        
        # Ticket volume factor
        if tickets > 10:
            risk_score += 2
        elif tickets > 5:
            risk_score += 1
        
        # Open tickets factor
        if open_tickets > 5:
            risk_score += 2
        elif open_tickets > 2:
            risk_score += 1
        
        # Resolution time factor
        if 'h' in resolution_time:
            hours = float(resolution_time.replace('h', ''))
            if hours > 8:
                risk_score += 2
            elif hours > 4:
                risk_score += 1
        
        if risk_score >= 6:
            return 'High'
        elif risk_score >= 3:
            return 'Medium'
        else:
            return 'Low'
    
    def _generate_account_insights(self, account_data: Dict, churn_risk: str) -> List[str]:
        """Generate actionable insights for the account"""
        insights = []
        
        if churn_risk == 'High':
            insights.append("High churn risk detected - immediate intervention recommended")
        
        if account_data.get('satisfaction', 0) < 4:
            insights.append("Customer satisfaction below threshold - review support quality")
        
        if account_data.get('openTickets', 0) > 3:
            insights.append("High number of open tickets - consider additional support resources")
        
        if account_data.get('health', 0) > 90:
            insights.append("Excellent account health - potential for expansion")
        
        return insights
    
    def _suggest_actions(self, account_data: Dict, churn_risk: str, insights: List[str]) -> List[str]:
        """Suggest specific actions based on analysis"""
        actions = []
        
        if churn_risk == 'High':
            actions.extend([
                "Schedule executive review meeting",
                "Assign dedicated success manager",
                "Implement immediate support escalation"
            ])
        
        if account_data.get('satisfaction', 0) < 4:
            actions.append("Conduct customer satisfaction survey")
        
        if account_data.get('health', 0) > 90:
            actions.append("Present expansion opportunities")
        
        return actions
    
    def _predict_health_trend(self, account_data: Dict) -> str:
        """Predict health trend direction"""
        # Mock implementation - in real scenario, use time series analysis
        health = account_data.get('health', 0)
        if health > 85:
            return 'up'
        elif health < 70:
            return 'down'
        else:
            return 'stable'
    
    def _identify_upsell_opportunity(self, account_data: Dict) -> Dict[str, Any]:
        """Identify upsell opportunities"""
        health = account_data.get('health', 0)
        satisfaction = account_data.get('satisfaction', 0)
        
        if health > 85 and satisfaction > 4:
            return {
                'has_opportunity': True,
                'confidence': 0.8,
                'suggested_products': ['Premium Support', 'Additional Licenses', 'Advanced Features'],
                'estimated_value': '$50,000'
            }
        else:
            return {'has_opportunity': False, 'confidence': 0.3}

class KnowledgeBaseAIService(AIServiceBase):
    """AI service for knowledge base enhancement"""
    
    def __init__(self):
        super().__init__("knowledge_base_ai")
    
    def enhance_search(self, query: str, articles: List[Dict]) -> List[Dict]:
        """Enhance search with AI-powered semantic matching"""
        try:
            # Mock semantic search implementation
            # In real implementation, use embeddings and vector similarity
            enhanced_results = []
            
            for article in articles:
                relevance_score = self._calculate_relevance(query, article)
                if relevance_score > 0.3:  # Threshold for relevance
                    enhanced_results.append({
                        **article,
                        'relevance_score': relevance_score,
                        'ai_highlighted': self._highlight_relevant_content(query, article)
                    })
            
            # Sort by relevance score
            enhanced_results.sort(key=lambda x: x['relevance_score'], reverse=True)
            
            return enhanced_results
            
        except Exception as e:
            logger.error(f"Error in enhanced search: {e}")
            return articles
    
    def generate_content_suggestions(self, topic: str) -> List[str]:
        """Generate content suggestions for knowledge base"""
        try:
            # Mock content generation
            suggestions = [
                f"How to troubleshoot {topic}",
                f"Best practices for {topic}",
                f"Common issues with {topic}",
                f"Step-by-step guide for {topic}",
                f"FAQ about {topic}"
            ]
            
            return suggestions
            
        except Exception as e:
            logger.error(f"Error generating content suggestions: {e}")
            return []
    
    def _calculate_relevance(self, query: str, article: Dict) -> float:
        """Calculate relevance score between query and article"""
        # Simple keyword matching (replace with semantic similarity)
        query_words = set(query.lower().split())
        article_text = f"{article.get('title', '')} {article.get('content', '')}".lower()
        article_words = set(article_text.split())
        
        intersection = query_words.intersection(article_words)
        union = query_words.union(article_words)
        
        return len(intersection) / len(union) if union else 0
    
    def _highlight_relevant_content(self, query: str, article: Dict) -> str:
        """Highlight relevant content in article"""
        # Mock highlighting implementation
        content = article.get('content', '')
        query_words = query.lower().split()
        
        highlighted = content
        for word in query_words:
            if word in content.lower():
                highlighted = highlighted.replace(word, f"<mark>{word}</mark>")
        
        return highlighted

class WorkflowOptimizationService(AIServiceBase):
    """AI service for workflow optimization"""
    
    def __init__(self):
        super().__init__("workflow_optimizer")
    
    def analyze_workflow_efficiency(self, workflow_data: Dict) -> Dict[str, Any]:
        """Analyze workflow efficiency and suggest optimizations"""
        try:
            # Mock workflow analysis
            efficiency_score = self._calculate_efficiency_score(workflow_data)
            bottlenecks = self._identify_bottlenecks(workflow_data)
            optimizations = self._suggest_optimizations(workflow_data, bottlenecks)
            
            prediction = {
                'efficiency_score': efficiency_score,
                'bottlenecks': bottlenecks,
                'optimizations': optimizations,
                'estimated_improvement': self._estimate_improvement(optimizations),
                'confidence': np.random.uniform(0.7, 0.9)
            }
            
            self.save_prediction(workflow_data, prediction, prediction['confidence'])
            
            return prediction
            
        except Exception as e:
            logger.error(f"Error in workflow analysis: {e}")
            return {'error': str(e)}
    
    def _calculate_efficiency_score(self, workflow_data: Dict) -> float:
        """Calculate workflow efficiency score"""
        # Mock calculation based on workflow metrics
        success_rate = workflow_data.get('successRate', 0)
        avg_duration = workflow_data.get('avgDuration', 0)
        error_rate = workflow_data.get('errorRate', 0)
        
        # Simple efficiency calculation
        efficiency = (success_rate / 100) * (1 - error_rate / 100)
        if avg_duration > 0:
            efficiency *= (1 / (1 + avg_duration / 100))  # Penalty for long duration
        
        return min(efficiency, 1.0)
    
    def _identify_bottlenecks(self, workflow_data: Dict) -> List[str]:
        """Identify workflow bottlenecks"""
        bottlenecks = []
        
        if workflow_data.get('avgDuration', 0) > 24:
            bottlenecks.append("Long processing time")
        
        if workflow_data.get('errorRate', 0) > 10:
            bottlenecks.append("High error rate")
        
        if workflow_data.get('manualSteps', 0) > 5:
            bottlenecks.append("Too many manual steps")
        
        return bottlenecks
    
    def _suggest_optimizations(self, workflow_data: Dict, bottlenecks: List[str]) -> List[str]:
        """Suggest workflow optimizations"""
        optimizations = []
        
        if "Long processing time" in bottlenecks:
            optimizations.append("Implement parallel processing")
        
        if "High error rate" in bottlenecks:
            optimizations.append("Add validation steps")
        
        if "Too many manual steps" in bottlenecks:
            optimizations.append("Automate manual processes")
        
        return optimizations
    
    def _estimate_improvement(self, optimizations: List[str]) -> Dict[str, Any]:
        """Estimate improvement from optimizations"""
        return {
            'time_reduction': f"{len(optimizations) * 15}%",
            'error_reduction': f"{len(optimizations) * 10}%",
            'cost_savings': f"${len(optimizations) * 5000}"
        }

# Initialize AI services
ticket_ai = TicketClassificationService()
account_ai = AccountInsightService()
knowledge_ai = KnowledgeBaseAIService()
workflow_ai = WorkflowOptimizationService()

