import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Wifi, Gift, HelpCircle, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const challenges = [
  {
    title: "Play with Friends",
    icon: <Users className="w-12 h-12 text-secondary" />,
    description: "Challenge your friends to a multiplayer food quiz!",
    gradient: "bg-gradient-primary",
  },
  {
    title: "Play Offline",
    icon: <Wifi className="w-12 h-12 text-success" />,
    description: "Limited solo mode - play without internet!",
    gradient: "bg-gradient-success",
  },
  {
    title: "Daily Challenges",
    icon: <Target className="w-12 h-12 text-accent" />,
    description: "Complete daily tasks for bonus rewards!",
    gradient: "bg-gradient-accent",
  },
  {
    title: "Food Quiz Master",
    icon: <HelpCircle className="w-12 h-12 text-pink" />,
    description: "Test your nutrition knowledge with quick quizzes!",
    gradient: "bg-gradient-rainbow",
  },
  {
    title: "Spin the Wheel",
    icon: <Gift className="w-12 h-12 text-orange" />,
    description: "Spin for a chance to win coins, gold, or special items!",
    gradient: "bg-gradient-accent",
  },
];

const Challenges = () => {
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
            🎁 Challenges & Extras 🎁
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore exciting mini-games and challenges!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => {
            const getRoute = () => {
              if (challenge.title === "Spin the Wheel") return "/spin-wheel";
              if (challenge.title === "Food Quiz Master") return "/food-quiz";
              return "#";
            };

            return (
              <Card
                key={challenge.title}
                onClick={() => {
                  const route = getRoute();
                  if (route !== "#") navigate(route);
                }}
                className={`${challenge.gradient} border-0 shadow-card p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-soft animate-float">
                      {challenge.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">{challenge.title}</h3>
                  <p className="text-sm text-card-foreground/80">{challenge.description}</p>
                  <Button className="w-full bg-card text-card-foreground hover:bg-card/90 shadow-soft">
                    Start Challenge
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-6">
          <Card className="inline-block bg-gradient-success border-0 shadow-card p-6 animate-bounce-in">
            <p className="text-lg font-semibold text-card-foreground mb-4">
              🎮 Your Progress is Always Saved! 🎮
            </p>
            <p className="text-sm text-card-foreground/80">
              Exit anytime and restart where you left off. Your coins, gold, and levels are safe!
            </p>
          </Card>

          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-card">
              <span className="text-2xl">🐼</span>
              <span className="text-sm font-medium text-foreground">Panda Guide</span>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-card">
              <span className="text-2xl">🦜</span>
              <span className="text-sm font-medium text-foreground">Parrot Buddy</span>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-card">
              <span className="text-2xl">🤖</span>
              <span className="text-sm font-medium text-foreground">Robot Helper</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Challenges;
