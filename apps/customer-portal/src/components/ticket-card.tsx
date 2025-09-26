import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import PriorityIndicator, { Priority } from "../components/priority-indicator";
import StatusBadge, { TicketStatus } from "../components/status-badge";
import { Calendar, User, MessageSquare } from "lucide-react";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  category: string;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TicketCardProps {
  ticket: Ticket;
  onView?: (ticket: Ticket) => void;
}

export default function TicketCard({ ticket, onView }: TicketCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onView?.(ticket)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{ticket.title}</CardTitle>
          <div className="flex gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityIndicator priority={ticket.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {ticket.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            {ticket.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{ticket.assignee}</span>
              </div>
            )}
          </div>
          
          <Badge variant="outline" className="text-xs">
            {ticket.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
