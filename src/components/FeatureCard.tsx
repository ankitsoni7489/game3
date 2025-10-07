import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  gradient: string;
  description: string;
  path: string;
}

export const FeatureCard = ({ title, icon, gradient, description, path }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      className={`${gradient} border-0 shadow-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow group overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-card/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-soft group-hover:animate-bounce-in">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
          <p className="text-sm text-card-foreground/80">{description}</p>
        </div>
      </div>
    </Card>
  );
};
