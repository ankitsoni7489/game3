import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LevelData = {
  level: number;
  stars: number; // 0-3 stars earned
  unlocked: boolean;
  difficulty: "easy" | "medium" | "hard";
};

// First 5 levels are implemented, rest are locked
const levels: LevelData[] = Array.from({ length: 20 }, (_, i) => ({
  level: i + 1,
  stars: i < 5 ? (i === 0 ? 3 : i === 1 ? 2 : i === 2 ? 1 : 0) : 0, // Sample star data
  unlocked: i < 5,
  difficulty: i < 7 ? "easy" : i < 14 ? "medium" : "hard",
}));

const LevelSelection = () => {
  const navigate = useNavigate();

  const handleLevelClick = (levelData: LevelData) => {
    if (!levelData.unlocked) {
      return;
    }
    // Navigate to game with level number
    navigate(`/game?level=${levelData.level}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={250} gold={30} />

      <main className="container mx-auto px-4 pt-28 pb-8">
        <Button
          onClick={() => navigate("/levels")}
          variant="outline"
          className="mb-6 border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Towers
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
            🏰 Beginner Tower 🏰
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your level and start your nutrition adventure!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 bg-card border-border shadow-card">
          {/* Candy Crush style level grid */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-6 relative">
            {levels.map((levelData, index) => (
              <div
                key={levelData.level}
                className="flex flex-col items-center animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Level Button */}
                <button
                  onClick={() => handleLevelClick(levelData)}
                  disabled={!levelData.unlocked}
                  className={`
                    relative w-16 h-16 rounded-full font-bold text-lg
                    transition-all duration-300 shadow-lg
                    ${
                      levelData.unlocked
                        ? levelData.difficulty === "easy"
                          ? "bg-gradient-success hover:scale-110 hover:shadow-glow cursor-pointer"
                          : levelData.difficulty === "medium"
                          ? "bg-gradient-accent hover:scale-110 hover:shadow-glow cursor-pointer"
                          : "bg-gradient-primary hover:scale-110 hover:shadow-glow cursor-pointer"
                        : "bg-muted cursor-not-allowed opacity-50"
                    }
                    ${levelData.unlocked ? "text-card-foreground" : "text-muted-foreground"}
                  `}
                >
                  {levelData.unlocked ? (
                    <span className="text-2xl font-extrabold">{levelData.level}</span>
                  ) : (
                    <Lock className="w-6 h-6 mx-auto" />
                  )}
                </button>

                {/* Stars Display */}
                {levelData.unlocked && (
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= levelData.stars
                            ? "fill-accent text-accent animate-sparkle"
                            : "text-muted"
                        }`}
                        style={{ animationDelay: `${star * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}

                {/* Connecting Path (visual only) */}
                {index < levels.length - 1 && (
                  <div
                    className={`absolute w-1 h-6 ${
                      levels[index + 1].unlocked ? "bg-primary/30" : "bg-muted/30"
                    }`}
                    style={{
                      top: "4rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 pt-6 border-t border-border">
            <h3 className="text-center font-semibold text-foreground mb-4">Difficulty Levels</h3>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-success"></div>
                <span className="text-sm text-muted-foreground">Easy (1-7)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-accent"></div>
                <span className="text-sm text-muted-foreground">Medium (8-14)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                <span className="text-sm text-muted-foreground">Hard (15-20)</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            💡 Complete levels to earn stars and unlock new challenges!
          </p>
        </div>
      </main>
    </div>
  );
};

export default LevelSelection;
