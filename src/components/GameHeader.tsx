import { useState } from "react";
import { Coins, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GameHeaderProps {
  coins: number;
  gold: number;
}

export const GameHeader = ({ coins, gold }: GameHeaderProps) => {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCounterClick = () => {
    setShowCelebration(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-primary shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            onClick={handleCounterClick}
            className="flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <Coins className="w-6 h-6 text-accent animate-wiggle" />
            <span className="text-xl font-bold text-foreground">{coins}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center animate-float">
            🎮 Healthy Plate 🍎
          </h1>

          <div
            onClick={handleCounterClick}
            className="flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
            <span className="text-xl font-bold text-foreground">{gold}</span>
          </div>
        </div>
      </header>

      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="bg-gradient-rainbow border-0 shadow-glow animate-bounce-in">
          <DialogTitle className="text-center text-3xl font-bold text-primary-foreground mb-4">
            🎉 Hurray! 🎉
          </DialogTitle>
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 bg-card/90 rounded-full px-6 py-3">
                <Coins className="w-8 h-8 text-accent" />
                <span className="text-2xl font-bold text-foreground">{coins}</span>
              </div>
              <div className="flex items-center gap-2 bg-card/90 rounded-full px-6 py-3">
                <Sparkles className="w-8 h-8 text-accent" />
                <span className="text-2xl font-bold text-foreground">{gold}</span>
              </div>
            </div>
            <p className="text-xl text-primary-foreground animate-pulse">
              You're doing amazing! ✨
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
