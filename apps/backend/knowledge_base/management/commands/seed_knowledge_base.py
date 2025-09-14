from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from knowledge_base.models import Category, Tag, Article, KnowledgeBaseSetting
import uuid


class Command(BaseCommand):
    help = 'Seed the Knowledge Base with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding Knowledge Base...')

        # Create superuser if doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='admin123'
            )
            self.stdout.write('Created admin user (admin/admin123)')

        # Create categories
        categories_data = [
            {
                'name': 'Getting Started',
                'slug': 'getting-started',
                'description': 'Essential guides for new users',
                'sort_order': 1
            },
            {
                'name': 'Account Management',
                'slug': 'account-management',
                'description': 'Managing your account and profile',
                'sort_order': 2
            },
            {
                'name': 'Billing & Payments',
                'slug': 'billing-payments',
                'description': 'Payment methods, invoices, and billing questions',
                'sort_order': 3
            },
            {
                'name': 'Technical Support',
                'slug': 'technical-support',
                'description': 'Technical issues and troubleshooting',
                'sort_order': 4
            },
            {
                'name': 'API Documentation',
                'slug': 'api-documentation',
                'description': 'API guides and reference materials',
                'sort_order': 5
            }
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories[cat_data['slug']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create tags
        tags_data = [
            {'name': 'Beginner', 'slug': 'beginner', 'color': '#3B82F6'},
            {'name': 'Advanced', 'slug': 'advanced', 'color': '#EF4444'},
            {'name': 'Tutorial', 'slug': 'tutorial', 'color': '#10B981'},
            {'name': 'FAQ', 'slug': 'faq', 'color': '#F59E0B'},
            {'name': 'Troubleshooting', 'slug': 'troubleshooting', 'color': '#8B5CF6'},
            {'name': 'Security', 'slug': 'security', 'color': '#DC2626'},
            {'name': 'Integration', 'slug': 'integration', 'color': '#059669'},
            {'name': 'Mobile', 'slug': 'mobile', 'color': '#7C3AED'}
        ]

        tags = {}
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(
                slug=tag_data['slug'],
                defaults=tag_data
            )
            tags[tag_data['slug']] = tag
            if created:
                self.stdout.write(f'Created tag: {tag.name}')

        # Create articles
        articles_data = [
            {
                'title': 'Welcome to Our Platform',
                'slug': 'welcome-to-our-platform',
                'summary': 'Get started with our platform and learn the basics of navigation and key features.',
                'content_markdown': '''# Welcome to Our Platform

Welcome to our comprehensive business management platform! This guide will help you get started and make the most of our features.

## Getting Started

1. **Create Your Account**: Sign up with your email address
2. **Complete Your Profile**: Add your business information
3. **Explore the Dashboard**: Familiarize yourself with the interface
4. **Set Up Your First Project**: Create your first project to get started

## Key Features

- **Project Management**: Organize and track your projects
- **Team Collaboration**: Work together with your team members
- **Analytics**: Monitor your progress with detailed reports
- **Integrations**: Connect with your favorite tools

## Need Help?

If you have any questions, don't hesitate to contact our support team. We're here to help you succeed!

## Next Steps

- [Account Setup Guide](/knowledge/articles/account-setup-guide)
- [Project Management Basics](/knowledge/articles/project-management-basics)
- [Team Collaboration](/knowledge/articles/team-collaboration)
''',
                'category': 'getting-started',
                'tags': ['beginner', 'tutorial'],
                'status': 'published',
                'is_featured': True,
                'product': 'Platform',
                'version': '1.0'
            },
            {
                'title': 'Account Setup Guide',
                'slug': 'account-setup-guide',
                'summary': 'Complete guide to setting up your account and configuring your profile.',
                'content_markdown': '''# Account Setup Guide

This comprehensive guide will walk you through setting up your account and configuring your profile for optimal use.

## Initial Setup

### 1. Email Verification
After signing up, check your email for a verification link. Click the link to activate your account.

### 2. Profile Configuration
- Upload a profile picture
- Add your business information
- Set your timezone and preferences
- Configure notification settings

### 3. Security Settings
- Enable two-factor authentication
- Set up strong passwords
- Configure login notifications

## Business Information

### Company Details
- Company name and description
- Industry and business type
- Contact information
- Address and location

### Team Setup
- Invite team members
- Assign roles and permissions
- Set up departments or teams

## Preferences

### Notification Settings
- Email notifications
- In-app notifications
- SMS alerts (if available)

### Privacy Settings
- Profile visibility
- Data sharing preferences
- Cookie settings

## Troubleshooting

**Can't verify email?**
- Check your spam folder
- Request a new verification email
- Contact support if issues persist

**Profile not saving?**
- Ensure all required fields are filled
- Check your internet connection
- Try refreshing the page
''',
                'category': 'account-management',
                'tags': ['beginner', 'tutorial'],
                'status': 'published',
                'is_featured': True,
                'product': 'Platform',
                'version': '1.0'
            },
            {
                'title': 'Billing and Payment Methods',
                'slug': 'billing-payment-methods',
                'summary': 'Learn how to manage your billing, payment methods, and subscription plans.',
                'content_markdown': '''# Billing and Payment Methods

Manage your subscription, payment methods, and billing information with ease.

## Subscription Plans

### Free Plan
- Basic features included
- Limited storage and users
- Community support

### Pro Plan
- Advanced features
- Increased storage and users
- Priority support
- Custom integrations

### Enterprise Plan
- All features included
- Unlimited storage and users
- Dedicated support
- Custom development

## Payment Methods

### Adding a Payment Method
1. Go to Billing Settings
2. Click "Add Payment Method"
3. Enter your card details
4. Verify the information
5. Save the payment method

### Supported Payment Methods
- Credit/Debit Cards (Visa, MasterCard, American Express)
- PayPal
- Bank transfers (Enterprise only)
- Cryptocurrency (coming soon)

## Billing Information

### Invoice Management
- Download invoices
- View billing history
- Set up automatic payments
- Configure billing notifications

### Tax Information
- Add tax ID numbers
- Configure tax settings
- Download tax reports

## Troubleshooting

**Payment Failed?**
- Check your card details
- Ensure sufficient funds
- Contact your bank
- Try a different payment method

**Invoice Questions?**
- Check your email for invoices
- Contact billing support
- Review your billing history
''',
                'category': 'billing-payments',
                'tags': ['faq', 'tutorial'],
                'status': 'published',
                'is_featured': False,
                'product': 'Platform',
                'version': '1.0'
            },
            {
                'title': 'API Authentication Guide',
                'slug': 'api-authentication-guide',
                'summary': 'Learn how to authenticate with our API and generate API keys.',
                'content_markdown': '''# API Authentication Guide

Secure authentication is essential for using our API. This guide covers all authentication methods.

## API Keys

### Generating API Keys
1. Go to Settings > API Keys
2. Click "Generate New Key"
3. Choose permissions and expiration
4. Copy and store your key securely

### Key Permissions
- **Read**: View data and resources
- **Write**: Create and update resources
- **Admin**: Full access including user management

### Key Security
- Never share your API keys
- Use environment variables
- Rotate keys regularly
- Monitor key usage

## Authentication Methods

### Bearer Token
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.example.com/v1/users
```

### Basic Authentication
```bash
curl -u username:password \\
     https://api.example.com/v1/users
```

### OAuth 2.0
```javascript
const response = await fetch('https://api.example.com/v1/users', {
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
});
```

## Rate Limiting

### Limits
- Free tier: 100 requests/hour
- Pro tier: 1,000 requests/hour
- Enterprise: Custom limits

### Headers
- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

## Error Handling

### Common Errors
- `401 Unauthorized`: Invalid or missing API key
- `403 Forbidden`: Insufficient permissions
- `429 Too Many Requests`: Rate limit exceeded

### Error Response Format
```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid",
    "details": {}
  }
}
```
''',
                'category': 'api-documentation',
                'tags': ['advanced', 'integration'],
                'status': 'published',
                'is_featured': False,
                'product': 'API',
                'version': '2.0'
            },
            {
                'title': 'Troubleshooting Common Issues',
                'slug': 'troubleshooting-common-issues',
                'summary': 'Solutions to the most common problems users encounter.',
                'content_markdown': '''# Troubleshooting Common Issues

Quick solutions to the most frequently encountered problems.

## Login Issues

### Can't Log In
1. **Check Credentials**: Ensure username/email and password are correct
2. **Reset Password**: Use the "Forgot Password" link
3. **Clear Cache**: Clear browser cache and cookies
4. **Try Different Browser**: Test in incognito/private mode

### Two-Factor Authentication Problems
- Use backup codes if available
- Contact support to disable 2FA temporarily
- Ensure your authenticator app is synced

## Performance Issues

### Slow Loading
- Check your internet connection
- Clear browser cache
- Disable browser extensions
- Try a different browser

### App Crashes
- Refresh the page
- Clear browser data
- Update your browser
- Check for JavaScript errors in console

## Data Issues

### Missing Data
- Check if you're in the correct workspace
- Verify your permissions
- Look for archived or deleted items
- Contact support if data loss is suspected

### Sync Problems
- Wait a few minutes for sync to complete
- Refresh the page
- Check your internet connection
- Log out and log back in

## Mobile App Issues

### App Won't Load
- Check your internet connection
- Update the app
- Restart your device
- Reinstall the app if necessary

### Push Notifications Not Working
- Check notification permissions
- Verify notification settings in app
- Check device notification settings
- Restart the app

## Still Need Help?

If none of these solutions work:
1. Contact our support team
2. Provide detailed error messages
3. Include screenshots if possible
4. Specify your browser and device information
''',
                'category': 'technical-support',
                'tags': ['troubleshooting', 'faq'],
                'status': 'published',
                'is_featured': False,
                'product': 'Platform',
                'version': '1.0'
            }
        ]

        admin_user = User.objects.get(username='admin')
        
        for article_data in articles_data:
            # Get category and tags
            category = categories[article_data['category']]
            article_tags = [tags[tag_slug] for tag_slug in article_data['tags']]
            
            # Remove category and tags from article_data
            article_data_copy = article_data.copy()
            del article_data_copy['category']
            del article_data_copy['tags']
            
            article, created = Article.objects.get_or_create(
                slug=article_data['slug'],
                defaults={
                    **article_data_copy,
                    'author': admin_user,
                    'category': category,
                    'status': 'published',
                    'published_at': '2024-01-01T00:00:00Z'
                }
            )
            
            if created:
                article.tags.set(article_tags)
                self.stdout.write(f'Created article: {article.title}')

        # Create settings
        settings_data = [
            {'key': 'kb_name', 'value': 'Knowledge Base', 'description': 'Name of the knowledge base'},
            {'key': 'kb_description', 'value': 'Your comprehensive help center', 'description': 'Description of the knowledge base'},
            {'key': 'enable_comments', 'value': 'true', 'description': 'Enable article comments'},
            {'key': 'enable_ratings', 'value': 'true', 'description': 'Enable article ratings'},
            {'key': 'max_file_size', 'value': '10', 'description': 'Maximum file size in MB'},
            {'key': 'allowed_file_types', 'value': 'pdf,doc,docx,txt,jpg,png,gif', 'description': 'Allowed file types for attachments'},
        ]

        for setting_data in settings_data:
            setting, created = KnowledgeBaseSetting.objects.get_or_create(
                key=setting_data['key'],
                defaults=setting_data
            )
            if created:
                self.stdout.write(f'Created setting: {setting.key}')

        self.stdout.write(
            self.style.SUCCESS('Successfully seeded Knowledge Base with sample data!')
        )


