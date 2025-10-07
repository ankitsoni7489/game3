import { useState } from "react";

type Food = {
  id: string;
  name: string;
  emoji: string;
  category: string;
};

interface PlateSectionProps {
  title: string;
  category: string;
  foods: Food[];
  onDrop: (food: Food, category: string) => void;
  gradient: string;
}

export const PlateSection = ({ title, category, foods, onDrop, gradient }: PlateSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const foodData = e.dataTransfer.getData("food");
    if (foodData) {
      const food = JSON.parse(foodData);
      onDrop(food, category);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        ${gradient} rounded-3xl shadow-card p-6 min-h-[200px]
        transition-all duration-300
        ${isDragOver ? "scale-105 shadow-glow ring-4 ring-accent" : ""}
      `}
    >
      <h3 className="text-xl font-bold text-primary-foreground mb-4 text-center">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-card/80 rounded-xl p-2 text-3xl animate-scale-in"
          >
            {food.emoji}
          </div>
        ))}
      </div>
      {foods.length === 0 && (
        <div className="text-center text-primary-foreground/60 mt-8">
          Drop foods here!
        </div>
      )}
    </div>
  );
};
