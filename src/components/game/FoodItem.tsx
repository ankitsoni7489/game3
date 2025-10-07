import { useState } from "react";

type Food = {
  id: string;
  name: string;
  emoji: string;
  category: string;
};

interface FoodItemProps {
  food: Food;
}

export const FoodItem = ({ food }: FoodItemProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("food", JSON.stringify(food));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        bg-card rounded-2xl shadow-card p-4 cursor-move
        transition-all duration-300 hover:scale-110 hover:shadow-glow
        ${isDragging ? "opacity-50 scale-95" : ""}
        animate-bounce-in
      `}
    >
      <div className="text-5xl mb-2">{food.emoji}</div>
      <div className="text-sm font-semibold text-foreground">{food.name}</div>
    </div>
  );
};
