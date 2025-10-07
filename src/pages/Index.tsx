import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, BookOpen, Trophy } from "lucide-react";

const Index = () => {
  const [coins] = useState(250);
  const [gold] = useState(30);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleStartGame = () => {
    setShowTutorial(false);
  };

  const handleSkipTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={coins} gold={gold} />

      <main className="container mx-auto px-4 pt-28 pb-8">
        {/* Center Game Area */}
        <div className="mb-12 flex justify-center">
          <div className="bg-card rounded-3xl shadow-card p-8 max-w-2xl w-full">
            {showTutorial ? (
              <div className="text-center space-y-6 animate-slide-up">
                <div className="text-6xl animate-bounce-in">🎮</div>
                <h2 className="text-3xl font-bold text-foreground">Welcome to Healthy Plate</h2>
                <p className="text-lg text-muted-foreground">
                  Let me show you how to play! Touch the plate, drag the food, and have fun learning! 🍽️
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleStartGame}
                    className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-all"
                  >
                    Start Tutorial 🎯
                  </Button>
                  <Button
                    onClick={handleSkipTutorial}
                    variant="outline"
                    className="border-border hover:bg-muted"
                  >
                    Skip Tutorial ⏭️
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-6xl animate-float">🎯</div>
                <h2 className="text-3xl font-bold text-foreground">Ready to Play!</h2>
                <p className="text-lg text-muted-foreground">
                  Choose a game mode below to continue your adventure!
                </p>
                <Button
                  onClick={() => window.location.href = '/game'}
                  size="lg"
                  className="bg-gradient-success text-primary-foreground shadow-soft hover:shadow-glow transition-all text-xl px-8 py-6 mt-4"
                >
                  🎮 Start Game Now! 🎮
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="text-sm text-muted-foreground">Last saved: Level 12</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Four Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="World Map Mode"
            icon={<Globe className="w-8 h-8 text-secondary" />}
            gradient="bg-gradient-primary"
            description="Explore 10 countries with unique foods! 🌍"
            path="/world-map"
          />
          
          <FeatureCard
            title="Level Progression"
            icon={<TrendingUp className="w-8 h-8 text-success" />}
            gradient="bg-gradient-success"
            description="60 levels from Beginner to Advanced! 🎯"
            path="/levels"
          />
          
          <FeatureCard
            title="Recipe Book Store"
            icon={<BookOpen className="w-8 h-8 text-accent" />}
            gradient="bg-gradient-accent"
            description="30+ Fruits, Veggies & International Foods! 🍎"
            path="/recipe-book"
          />
          
          <FeatureCard
            title="Challenges & Extras"
            icon={<Trophy className="w-8 h-8 text-pink" />}
            gradient="bg-gradient-rainbow"
            description="Play with friends, mini-games & more! 🎁"
            path="/challenges"
          />
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-card">
            <span className="text-sm font-medium text-muted-foreground">Current Title:</span>
            <span className="text-lg font-bold text-primary">Food Explorer 🌟</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
