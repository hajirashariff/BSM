# Knowledge Base Module

A comprehensive Knowledge Base system with admin console, customer portal, and full CRUD operations.

## Features

### Admin Console
- **Article Management**: Create, edit, publish, and manage articles
- **Category Management**: Organize articles into categories
- **Tag System**: Tag articles for better organization
- **Analytics Dashboard**: View usage statistics and performance metrics
- **User Management**: Role-based access control
- **Settings**: Configure knowledge base settings

### Customer Portal
- **Search**: Full-text search across articles
- **Categories**: Browse articles by category
- **Featured Articles**: Highlight important content
- **Feedback System**: Rate article helpfulness
- **Responsive Design**: Works on all devices

### Technical Features
- **Markdown Editor**: WYSIWYG editor with Markdown support
- **Version Control**: Track article revisions
- **File Attachments**: Upload and manage files
- **SEO Optimization**: Meta tags and descriptions
- **API Endpoints**: RESTful API for all operations
- **Security**: HTML sanitization and XSS protection

## Setup Instructions

### 1. Install Dependencies

```bash
cd apps/backend
pip install -r requirements.txt
```

### 2. Run Migrations

```bash
python manage.py makemigrations knowledge_base
python manage.py migrate
```

### 3. Seed Sample Data

```bash
python manage.py seed_knowledge_base
```

This will create:
- Admin user (admin/admin123)
- Sample categories and tags
- 5 sample articles
- Basic settings

### 4. Start the Server

```bash
python manage.py runserver 8000
```

### 5. Access the Knowledge Base

- **Admin Console**: http://localhost:3001/knowledge
- **Customer Portal**: http://localhost:3000/knowledge
- **API Documentation**: http://localhost:8000/swagger/

## API Endpoints

### Articles
- `GET /api/kb/articles/` - List articles
- `POST /api/kb/articles/` - Create article
- `GET /api/kb/articles/{id}/` - Get article
- `PUT /api/kb/articles/{id}/` - Update article
- `DELETE /api/kb/articles/{id}/` - Delete article
- `POST /api/kb/articles/{id}/publish/` - Publish article
- `POST /api/kb/articles/{id}/unpublish/` - Unpublish article
- `POST /api/kb/articles/{id}/duplicate/` - Duplicate article
- `POST /api/kb/articles/{id}/archive/` - Archive article
- `GET /api/kb/articles/{id}/revisions/` - Get article revisions
- `POST /api/kb/articles/{id}/create_revision/` - Create revision
- `POST /api/kb/articles/{id}/restore_revision/` - Restore revision
- `POST /api/kb/articles/{id}/track_view/` - Track article view
- `POST /api/kb/articles/{id}/feedback/` - Submit feedback
- `GET /api/kb/articles/featured/` - Get featured articles
- `GET /api/kb/articles/popular/` - Get popular articles
- `GET /api/kb/articles/recent/` - Get recent articles

### Categories
- `GET /api/kb/categories/` - List categories
- `POST /api/kb/categories/` - Create category
- `GET /api/kb/categories/{id}/` - Get category
- `PUT /api/kb/categories/{id}/` - Update category
- `DELETE /api/kb/categories/{id}/` - Delete category

### Tags
- `GET /api/kb/tags/` - List tags
- `POST /api/kb/tags/` - Create tag
- `GET /api/kb/tags/{id}/` - Get tag
- `PUT /api/kb/tags/{id}/` - Update tag
- `DELETE /api/kb/tags/{id}/` - Delete tag

### Search
- `GET /api/kb/search/?q={query}` - Search articles

### Analytics
- `GET /api/kb/analytics/` - Get analytics data

### Settings
- `GET /api/kb/settings/` - Get settings
- `PUT /api/kb/settings/{key}/` - Update setting

## Database Schema

### Tables
- `kb_categories` - Article categories
- `kb_tags` - Article tags
- `kb_articles` - Main articles table
- `kb_article_revisions` - Article version history
- `kb_attachments` - File attachments
- `kb_article_views` - View tracking
- `kb_article_feedback` - User feedback
- `kb_search_queries` - Search analytics
- `kb_article_approvals` - Review workflow
- `kb_settings` - System settings

## User Roles

### Admin
- Full access to all features
- Can manage all articles and categories
- Access to analytics and settings
- Can approve/reject articles

### Editor
- Can create and edit articles
- Can manage categories and tags
- Cannot publish articles (requires approval)
- Limited analytics access

### Reviewer
- Can review and approve articles
- Can view analytics
- Cannot create new content

### Viewer
- Can view published articles
- Can provide feedback
- Read-only access

### Customer
- Public access to published articles
- Can search and browse
- Can provide feedback
- No admin access

## Security Features

- **HTML Sanitization**: All HTML content is sanitized to prevent XSS
- **Role-based Access**: Different permission levels for different users
- **API Authentication**: Secure API endpoints with authentication
- **Input Validation**: All inputs are validated and sanitized
- **File Upload Security**: File type and size restrictions

## Customization

### Themes
The Knowledge Base uses Tailwind CSS and can be customized by modifying the CSS classes in the React components.

### Integrations
- **Jira Integration**: Suggest articles in ticket UI
- **Slack Notifications**: Notify teams of new articles
- **Chatbot Integration**: AI-powered article suggestions

### Search
- **PostgreSQL FTS**: Full-text search using PostgreSQL
- **Elasticsearch**: Advanced search capabilities (optional)
- **Algolia**: Third-party search service (optional)

## Deployment

### Production Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Set up static file serving
5. Configure reverse proxy (nginx)
6. Set up SSL certificates

### Environment Variables
```bash
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@host:port/database
ALLOWED_HOSTS=your-domain.com
DEBUG=False
```

### Docker Deployment
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## Monitoring

### Analytics
- Article views and engagement
- Search queries and results
- User feedback and ratings
- Popular content tracking

### Logging
- API request logging
- Error tracking
- Performance monitoring
- User activity logs

## Backup and Recovery

### Database Backup
```bash
pg_dump knowledge_base > backup.sql
```

### File Backup
- Backup uploaded attachments
- Backup static files
- Backup configuration files

### Recovery
```bash
psql knowledge_base < backup.sql
```

## Scaling

### Performance Optimization
- Database indexing
- Caching strategies
- CDN for static files
- Load balancing

### Horizontal Scaling
- Multiple application servers
- Database replication
- Redis for caching
- Elasticsearch for search

## Support

For technical support or questions:
- Email: support@example.com
- Documentation: https://docs.example.com
- GitHub Issues: https://github.com/example/knowledge-base

## License

This project is licensed under the MIT License - see the LICENSE file for details.


