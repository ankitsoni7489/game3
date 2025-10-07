import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "Italy", emoji: "🇮🇹", food: "Pizza & Pasta 🍕", unlocked: true },
  { name: "Japan", emoji: "🇯🇵", food: "Sushi & Ramen 🍣", unlocked: true },
  { name: "India", emoji: "🇮🇳", food: "Curry & Thali 🍛", unlocked: true },
  { name: "Mexico", emoji: "🇲🇽", food: "Tacos & Burritos 🌮", unlocked: false },
  { name: "France", emoji: "🇫🇷", food: "Croissant & Cheese 🥐", unlocked: false },
  { name: "China", emoji: "🇨🇳", food: "Dumplings & Noodles 🥟", unlocked: false },
  { name: "USA", emoji: "🇺🇸", food: "Burgers & Hot Dogs 🍔", unlocked: false },
  { name: "Thailand", emoji: "🇹🇭", food: "Pad Thai & Curry 🍜", unlocked: false },
  { name: "Greece", emoji: "🇬🇷", food: "Gyros & Salad 🥙", unlocked: false },
  { name: "Brazil", emoji: "🇧🇷", food: "Feijoada & Açaí 🍲", unlocked: false },
];

const WorldMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={250} gold={30} />

      <main className="container mx-auto px-4 pt-28 pb-8">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
            🌍 World Map Explorer 🌍
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover foods from around the world! Unlock countries by completing levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {countries.map((country, index) => (
            <Card
              key={country.name}
              onClick={() => country.unlocked && navigate(`/game?country=${country.name.toLowerCase()}`)}
              className={`p-6 text-center transition-all duration-300 ${
                country.unlocked
                  ? "bg-gradient-primary border-0 shadow-card hover:scale-105 hover:shadow-glow cursor-pointer"
                  : "bg-muted border-border opacity-60 cursor-not-allowed"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={country.unlocked ? "animate-float" : ""}>
                <div className="text-5xl mb-3">{country.emoji}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{country.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{country.food}</p>
                {!country.unlocked && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">Locked</span>
                  </div>
                )}
                {country.unlocked && (
                  <Button className="mt-2 w-full bg-card text-card-foreground hover:bg-card/90">
                    Play
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
