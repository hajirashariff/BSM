import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, Star, Users } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  popularity: number;
  icon: string;
  requestCount: number;
}

interface ServiceCatalogItemProps {
  service: ServiceItem;
  onRequest: (service: ServiceItem) => void;
}

export default function ServiceCatalogItem({ service, onRequest }: ServiceCatalogItemProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{service.icon}</div>
            <div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {service.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(service.popularity)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{service.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{service.requestCount} requests</span>
          </div>
        </div>
        
        <Button 
          onClick={() => onRequest(service)}
          className="w-full"
        >
          Request Service
        </Button>
      </CardContent>
    </Card>
  );
}
