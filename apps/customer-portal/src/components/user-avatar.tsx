import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  email?: string;
  image?: string;
  size?: "sm" | "md" | "lg";
}

export default function UserAvatar({ name, email, image, size = "md" }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {size !== "sm" && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          {email && <span className="text-xs text-muted-foreground">{email}</span>}
        </div>
      )}
    </div>
  );
}
