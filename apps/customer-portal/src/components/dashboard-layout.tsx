import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import DashboardMetricCard from "@/components/dashboard-metric-card";
// import TicketCard, { Ticket } from "@/components/ticket-card";
import { 
  Ticket as TicketIcon, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

interface DashboardLayoutProps {
  onCreateTicket: () => void;
  onViewTicket: (ticket: any) => void;
  onSearch: (query: string) => void;
}

const mockTickets: any[] = [
  {
    id: "TKT-001",
    title: "Email Service Outage",
    description: "Users are reporting inability to send or receive emails. Issue started around 2 PM today.",
    status: "in_progress",
    priority: "high",
    category: "Technical",
    assignee: "John Smith",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "TKT-002",
    title: "Password Reset Not Working",
    description: "Password reset emails are not being delivered to users.",
    status: "open",
    priority: "medium",
    category: "Account",
    assignee: "Sarah Johnson",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "TKT-003",
    title: "Database Performance Issues",
    description: "Slow query performance affecting user experience.",
    status: "resolved",
    priority: "high",
    category: "Technical",
    assignee: "Mike Chen",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];

export default function DashboardLayout({ onCreateTicket, onViewTicket, onSearch }: DashboardLayoutProps) {
  const metrics = [
    {
      title: "Open Tickets",
      value: 12,
      description: "Tickets requiring attention",
      icon: TicketIcon,
      trend: { value: 15, label: "vs last week", positive: false }
    },
    {
      title: "In Progress",
      value: 8,
      description: "Currently being worked on",
      icon: Clock,
      trend: { value: 5, label: "vs last week", positive: true }
    },
    {
      title: "Resolved Today",
      value: 15,
      description: "Successfully closed",
      icon: CheckCircle,
      trend: { value: 20, label: "vs last week", positive: true }
    },
    {
      title: "Critical Issues",
      value: 2,
      description: "Requiring immediate attention",
      icon: AlertTriangle,
      trend: { value: 0, label: "vs last week", positive: true }
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your BSM service portal</p>
        </div>
        <Button onClick={onCreateTicket}>
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.description && <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>}
                {metric.trend && (
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${metric.trend.positive ? "text-green-600" : "text-red-600"}`}>
                      {metric.trend.positive ? "+" : ""}{metric.trend.value}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">{metric.trend.label}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5" />
              Recent Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTickets.slice(0, 3).map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onViewTicket(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ticket.description.substring(0, 80)}...
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">
                        {ticket.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onCreateTicket}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Ticket
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onSearch("my tickets")}
              >
                <TicketIcon className="h-4 w-4 mr-2" />
                View All Tickets
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onSearch("knowledge base")}
              >
                <Users className="h-4 w-4 mr-2" />
                Browse Knowledge Base
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
