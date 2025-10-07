import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const prizes = [
  { name: "10 Coins", value: 10, type: "coins", color: "bg-accent" },
  { name: "5 Gold", value: 5, type: "gold", color: "bg-orange" },
  { name: "20 Coins", value: 20, type: "coins", color: "bg-secondary" },
  { name: "3 Gold", value: 3, type: "gold", color: "bg-pink" },
  { name: "50 Coins", value: 50, type: "coins", color: "bg-success" },
  { name: "10 Gold", value: 10, type: "gold", color: "bg-primary" },
  { name: "15 Coins", value: 15, type: "coins", color: "bg-accent" },
  { name: "1 Gold", value: 1, type: "gold", color: "bg-orange" },
];

const SpinWheel = () => {
  const navigate = useNavigate();
  const [userCoins, setUserCoins] = useState(250);
  const [userGold, setUserGold] = useState(30);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerSlice = 360 / prizes.length;
    const newRotation = rotation + 360 * 5 + randomIndex * degreesPerSlice;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      const prize = prizes[randomIndex];
      if (prize.type === "coins") {
        setUserCoins(userCoins + prize.value);
      } else {
        setUserGold(userGold + prize.value);
      }
      
      toast({
        title: "🎉 You Won!",
        description: `You got ${prize.name}!`,
      });
      
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={userCoins} gold={userGold} />

      <main className="container mx-auto px-4 pt-28 pb-8">
        <Button
          onClick={() => navigate("/challenges")}
          variant="outline"
          className="mb-6 border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Challenges
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
            🎡 Spin the Wheel 🎡
          </h1>
          <p className="text-lg text-muted-foreground">
            Spin for a chance to win coins and gold!
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative w-80 h-80">
            <div 
              className="w-full h-full rounded-full border-8 border-primary shadow-glow transition-transform duration-[4000ms] ease-out"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(${prizes.map((prize, i) => {
                  const percent = (i / prizes.length) * 100;
                  const nextPercent = ((i + 1) / prizes.length) * 100;
                  return `var(--${prize.color.replace('bg-', '')}) ${percent}%, var(--${prize.color.replace('bg-', '')}) ${nextPercent}%`;
                }).join(', ')})`
              }}
            >
              {prizes.map((prize, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `rotate(${(index * 360) / prizes.length}deg) translateX(80px)`,
                  }}
                >
                  <span className="text-sm font-bold text-card rotate-90 block w-20 text-center">
                    {prize.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-primary z-10" />
          </div>

          <Button
            onClick={spinWheel}
            disabled={spinning}
            className="text-xl px-12 py-6 bg-gradient-primary border-0 shadow-card hover:shadow-glow"
          >
            {spinning ? "Spinning..." : "SPIN!"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SpinWheel;
