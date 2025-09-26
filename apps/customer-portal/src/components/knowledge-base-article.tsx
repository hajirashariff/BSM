import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Eye, ThumbsUp, Clock, BookOpen } from "lucide-react";

export interface KnowledgeArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  views: number;
  helpfulVotes: number;
  lastUpdated: Date;
  readTime: number;
}

interface KnowledgeBaseArticleProps {
  article: KnowledgeArticle;
  onRead: (article: KnowledgeArticle) => void;
}

export default function KnowledgeBaseArticle({ article, onRead }: KnowledgeBaseArticleProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {article.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {article.summary}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{article.helpfulVotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Updated {formatDate(article.lastUpdated)}</span>
          </div>
        </div>
        
        <Button 
          onClick={() => onRead(article)}
          variant="outline"
          className="w-full"
        >
          Read Article
        </Button>
      </CardContent>
    </Card>
  );
}
