import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const tiers = [
  {
    name: "Beginner Tower",
    levels: 20,
    gradient: "bg-gradient-success",
    unlocked: true,
    currentLevel: 12,
  },
  {
    name: "Intermediate Tower",
    levels: 20,
    gradient: "bg-gradient-accent",
    unlocked: false,
    currentLevel: 0,
  },
  {
    name: "Advanced Tower",
    levels: 20,
    gradient: "bg-gradient-primary",
    unlocked: false,
    currentLevel: 0,
  },
];

const LevelProgression = () => {
  const navigate = useNavigate();

  const chartData = tiers.map((tier) => ({
    name: tier.name.replace(" Tower", ""),
    completed: tier.currentLevel,
    remaining: tier.levels - tier.currentLevel,
    total: tier.levels,
  }));

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--primary))",
    },
    remaining: {
      label: "Remaining",
      color: "hsl(var(--muted))",
    },
  };

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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
            🎯 Level Progression 🎯
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete 60 levels across 3 towers and become a Nutrition Master!
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 mb-8 bg-card border-border shadow-card animate-slide-up">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Your Progress Overview</h2>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-muted-foreground"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
                <Bar dataKey="remaining" stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary"></div>
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted"></div>
              <span className="text-sm text-muted-foreground">Remaining</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`${tier.gradient} border-0 shadow-card p-8 text-center transition-all duration-300 ${
                tier.unlocked ? "hover:scale-105 hover:shadow-glow animate-slide-up" : "opacity-60"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-6">
                <div className="text-6xl animate-float">{tier.unlocked ? "🏰" : "🔒"}</div>
                
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-card-foreground/80">{tier.levels} exciting levels</p>
                </div>

                {tier.unlocked ? (
                  <div className="space-y-4">
                    <div className="flex justify-center items-center gap-2">
                      <Star className="w-5 h-5 text-accent animate-sparkle" />
                      <span className="text-lg font-semibold text-card-foreground">
                        Level {tier.currentLevel}/{tier.levels}
                      </span>
                    </div>
                    
                    <div className="w-full bg-card rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-rainbow transition-all duration-500"
                        style={{ width: `${(tier.currentLevel / tier.levels) * 100}%` }}
                      />
                    </div>

                    <Button 
                      onClick={() => navigate("/level-selection")}
                      className="w-full bg-card text-card-foreground hover:bg-card/90 shadow-soft"
                    >
                      Continue Playing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center items-center gap-2 text-card-foreground/60">
                      <Lock className="w-5 h-5" />
                      <span className="text-sm">Complete previous tower to unlock</span>
                    </div>
                    <Button disabled className="w-full bg-card/50 text-card-foreground/50">
                      Locked
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-rainbow border-0 shadow-card p-6 animate-bounce-in">
            <p className="text-lg font-semibold text-card-foreground">
              🏆 Complete all 60 levels to become a <span className="text-accent">Global Chef</span>! 🏆
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LevelProgression;
