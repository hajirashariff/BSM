import { Badge } from "../components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle, Pause } from "lucide-react";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed" | "on_hold";

interface StatusBadgeProps {
  status: TicketStatus;
}

const statusConfig = {
  open: {
    label: "Open",
    variant: "secondary" as const,
    icon: AlertCircle,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  },
  in_progress: {
    label: "In Progress", 
    variant: "default" as const,
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  },
  resolved: {
    label: "Resolved",
    variant: "secondary" as const,
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  },
  closed: {
    label: "Closed",
    variant: "outline" as const,
    icon: XCircle,
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  },
  on_hold: {
    label: "On Hold",
    variant: "destructive" as const,
    icon: Pause,
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className}`}>
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
