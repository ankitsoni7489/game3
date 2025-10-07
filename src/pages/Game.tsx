import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/components/game/FoodItem";
import { PlateSection } from "@/components/game/PlateSection";
import { toast } from "sonner";
import { ArrowLeft, Trophy } from "lucide-react";

type FoodCategory = "fruits" | "vegetables" | "grains" | "proteins" | "dairy" | "junk";

type Food = {
  id: string;
  name: string;
  emoji: string;
  category: FoodCategory;
};

const foodDatabase: Food[] = [
  // Fruits
  { id: "apple", name: "Apple", emoji: "🍎", category: "fruits" },
  { id: "banana", name: "Banana", emoji: "🍌", category: "fruits" },
  { id: "orange", name: "Orange", emoji: "🍊", category: "fruits" },
  { id: "strawberry", name: "Strawberry", emoji: "🍓", category: "fruits" },
  { id: "watermelon", name: "Watermelon", emoji: "🍉", category: "fruits" },
  // Vegetables
  { id: "carrot", name: "Carrot", emoji: "🥕", category: "vegetables" },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "vegetables" },
  { id: "tomato", name: "Tomato", emoji: "🍅", category: "vegetables" },
  { id: "corn", name: "Corn", emoji: "🌽", category: "vegetables" },
  { id: "pepper", name: "Pepper", emoji: "🫑", category: "vegetables" },
  // Grains
  { id: "bread", name: "Bread", emoji: "🍞", category: "grains" },
  { id: "rice", name: "Rice", emoji: "🍚", category: "grains" },
  { id: "pasta", name: "Pasta", emoji: "🍝", category: "grains" },
  { id: "cereal", name: "Cereal", emoji: "🥣", category: "grains" },
  // Proteins
  { id: "egg", name: "Egg", emoji: "🥚", category: "proteins" },
  { id: "chicken", name: "Chicken", emoji: "🍗", category: "proteins" },
  { id: "fish", name: "Fish", emoji: "🐟", category: "proteins" },
  { id: "beans", name: "Beans", emoji: "🫘", category: "proteins" },
  // Dairy
  { id: "milk", name: "Milk", emoji: "🥛", category: "dairy" },
  { id: "cheese", name: "Cheese", emoji: "🧀", category: "dairy" },
  { id: "yogurt", name: "Yogurt", emoji: "🥛", category: "dairy" },
  // Junk Food
  { id: "candy", name: "Candy", emoji: "🍬", category: "junk" },
  { id: "chips", name: "Chips", emoji: "🍟", category: "junk" },
  { id: "soda", name: "Soda", emoji: "🥤", category: "junk" },
  { id: "cake", name: "Cake", emoji: "🍰", category: "junk" },
  { id: "donut", name: "Donut", emoji: "🍩", category: "junk" },
];

const nutritionTips = [
  "Vegetables make you strong and full of energy! 💪",
  "Fruits have vitamins that help you grow! 🌟",
  "Proteins help build strong muscles! 💪",
  "Grains give you energy to play all day! ⚡",
  "Dairy makes your bones super strong! 🦴",
  "Limit junk food to stay healthy and happy! 😊",
];

type Level = "beginner" | "intermediate" | "advanced";

const Game = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const levelNumber = searchParams.get("level");
  
  const [coins, setCoins] = useState(250);
  const [gold, setGold] = useState(30);
  const [level, setLevel] = useState<Level>("beginner");
  const [score, setScore] = useState(0);
  const [currentFoods, setCurrentFoods] = useState<Food[]>([]);
  const [placedFoods, setPlacedFoods] = useState<Record<string, Food[]>>({
    fruits: [],
    vegetables: [],
    grains: [],
    proteins: [],
    dairy: [],
    junk: [],
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");

  const getFoodCount = () => {
    switch (level) {
      case "beginner":
        return 6;
      case "intermediate":
        return 10;
      case "advanced":
        return 15;
      default:
        return 6;
    }
  };

  const getTimeLimit = () => {
    switch (level) {
      case "beginner":
        return null;
      case "intermediate":
        return 60;
      case "advanced":
        return 45;
      default:
        return null;
    }
  };

  useEffect(() => {
    startNewRound();
  }, [level]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      toast.error("Time's up! Try again! ⏰");
      startNewRound();
    }
  }, [timeLeft]);

  const startNewRound = () => {
    const count = getFoodCount();
    const shuffled = [...foodDatabase].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    setCurrentFoods(selected);
    setPlacedFoods({
      fruits: [],
      vegetables: [],
      grains: [],
      proteins: [],
      dairy: [],
      junk: [],
    });
    setTimeLeft(getTimeLimit());
    setShowTip(false);
  };

  const handleDrop = (food: Food, category: FoodCategory) => {
    const isCorrect = food.category === category;
    
    if (isCorrect) {
      setPlacedFoods((prev) => ({
        ...prev,
        [category]: [...prev[category], food],
      }));
      setCurrentFoods((prev) => prev.filter((f) => f.id !== food.id));
      setScore((prev) => prev + 10);
      setCoins((prev) => prev + 5);
      toast.success(`Great job! ${food.name} is correct! 🎉`);
    } else {
      toast.error(`Oops! ${food.name} doesn't go there. Try again! 🤔`);
    }

    // Check if round is complete
    if (currentFoods.length === 1 && isCorrect) {
      setTimeout(() => {
        completeRound();
      }, 500);
    }
  };

  const completeRound = () => {
    setGold((prev) => prev + 1);
    setScore((prev) => prev + 50);
    const randomTip = nutritionTips[Math.floor(Math.random() * nutritionTips.length)];
    setCurrentTip(randomTip);
    setShowTip(true);
    toast.success("Yay, healthy hero! 🌟", {
      description: "You completed a balanced plate!",
    });
  };

  const handleNextRound = () => {
    startNewRound();
  };

  const handleLevelChange = (newLevel: Level) => {
    setLevel(newLevel);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={coins} gold={gold} />

      <main className="container mx-auto px-4 pt-28 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate(levelNumber ? "/level-selection" : "/")}
            variant="outline"
            className="border-border hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {levelNumber ? "Back to Levels" : "Back to Home"}
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={() => handleLevelChange("beginner")}
              variant={level === "beginner" ? "default" : "outline"}
              className={level === "beginner" ? "bg-gradient-success" : ""}
            >
              Beginner
            </Button>
            <Button
              onClick={() => handleLevelChange("intermediate")}
              variant={level === "intermediate" ? "default" : "outline"}
              className={level === "intermediate" ? "bg-gradient-primary" : ""}
            >
              Intermediate
            </Button>
            <Button
              onClick={() => handleLevelChange("advanced")}
              variant={level === "advanced" ? "default" : "outline"}
              className={level === "advanced" ? "bg-gradient-accent" : ""}
            >
              Advanced
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-card rounded-2xl shadow-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground">Score: {score}</div>
          </div>
          <div className="bg-card rounded-2xl shadow-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              Level: {level.charAt(0).toUpperCase() + level.slice(1)}
            </div>
          </div>
          {timeLeft !== null && (
            <div className="bg-card rounded-2xl shadow-card p-4 text-center">
              <div className="text-2xl font-bold text-accent">Time: {timeLeft}s ⏰</div>
            </div>
          )}
        </div>

        {showTip ? (
          <div className="bg-gradient-success rounded-3xl shadow-glow p-8 text-center space-y-6 animate-scale-in mb-6">
            <div className="text-6xl animate-bounce-in">
              <Trophy className="w-24 h-24 mx-auto text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground">Round Complete! 🎉</h2>
            <p className="text-xl text-primary-foreground">{currentTip}</p>
            <Button
              onClick={handleNextRound}
              size="lg"
              className="bg-card text-foreground hover:bg-card/90"
            >
              Next Round 🎯
            </Button>
          </div>
        ) : (
          <>
            {/* Available Food Items */}
            <div className="bg-card rounded-3xl shadow-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                Drag the food to the correct section! 🍽️
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {currentFoods.map((food) => (
                  <FoodItem key={food.id} food={food} />
                ))}
              </div>
            </div>

            {/* Plate Sections */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <PlateSection
                title="Fruits 🍎"
                category="fruits"
                foods={placedFoods.fruits}
                onDrop={handleDrop}
                gradient="bg-gradient-accent"
              />
              <PlateSection
                title="Vegetables 🥦"
                category="vegetables"
                foods={placedFoods.vegetables}
                onDrop={handleDrop}
                gradient="bg-gradient-success"
              />
              <PlateSection
                title="Grains 🍞"
                category="grains"
                foods={placedFoods.grains}
                onDrop={handleDrop}
                gradient="bg-gradient-primary"
              />
              <PlateSection
                title="Proteins 🍗"
                category="proteins"
                foods={placedFoods.proteins}
                onDrop={handleDrop}
                gradient="bg-gradient-accent"
              />
              <PlateSection
                title="Dairy 🥛"
                category="dairy"
                foods={placedFoods.dairy}
                onDrop={handleDrop}
                gradient="bg-gradient-primary"
              />
              <PlateSection
                title="Limit! 🚫"
                category="junk"
                foods={placedFoods.junk}
                onDrop={handleDrop}
                gradient="bg-gradient-rainbow"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Game;
