import { Badge } from "../components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export type Priority = "low" | "medium" | "high" | "critical";

interface PriorityIndicatorProps {
  priority: Priority;
}

const priorityConfig = {
  low: {
    label: "Low",
    icon: ArrowDown,
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  },
  medium: {
    label: "Medium",
    icon: Minus,
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  },
  high: {
    label: "High", 
    icon: ArrowUp,
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
  },
  critical: {
    label: "Critical",
    icon: ArrowUp,
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  }
};

export default function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  const config = priorityConfig[priority];
  const IconComponent = config.icon;

  return (
    <Badge variant="secondary" className={`flex items-center gap-1 ${config.className}`}>
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
