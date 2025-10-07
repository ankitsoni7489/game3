import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const quizQuestions = [
  {
    question: "Which fruit is highest in Vitamin C?",
    options: ["Apple", "Orange", "Banana", "Grape"],
    correct: 1,
    reward: 20,
  },
  {
    question: "What is the main ingredient in hummus?",
    options: ["Chickpeas", "Lentils", "Beans", "Peas"],
    correct: 0,
    reward: 15,
  },
  {
    question: "Which vegetable is known for having the most protein?",
    options: ["Broccoli", "Spinach", "Peas", "Carrots"],
    correct: 2,
    reward: 25,
  },
  {
    question: "What type of food is sushi traditionally wrapped in?",
    options: ["Rice paper", "Seaweed", "Lettuce", "Banana leaf"],
    correct: 1,
    reward: 15,
  },
  {
    question: "Which spice is the most expensive by weight?",
    options: ["Vanilla", "Cardamom", "Saffron", "Cinnamon"],
    correct: 2,
    reward: 30,
  },
];

const FoodQuiz = () => {
  const navigate = useNavigate();
  const [userCoins, setUserCoins] = useState(250);
  const [userGold, setUserGold] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    const question = quizQuestions[currentQuestion];
    
    setTimeout(() => {
      if (selectedIndex === question.correct) {
        setScore(score + 1);
        setUserCoins(userCoins + question.reward);
        toast({
          title: "✓ Correct!",
          description: `You earned ${question.reward} coins!`,
        });
      } else {
        toast({
          title: "✗ Wrong!",
          description: "Better luck next time!",
          variant: "destructive",
        });
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        // Bonus gold for perfect score
        if (score === quizQuestions.length - 1 && selectedIndex === question.correct) {
          setUserGold(userGold + 5);
        }
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
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

          <Card className="max-w-2xl mx-auto bg-gradient-primary border-0 shadow-card p-12 text-center">
            <h1 className="text-5xl font-bold text-card-foreground mb-6 animate-bounce-in">
              🎉 Quiz Complete! 🎉
            </h1>
            <p className="text-3xl text-card-foreground mb-8">
              Your Score: {score}/{quizQuestions.length}
            </p>
            {score === quizQuestions.length && (
              <p className="text-xl text-card-foreground mb-6">
                Perfect score! You earned a bonus 5 gold! 💎
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                className="bg-card text-card-foreground hover:bg-card/90 shadow-soft"
              >
                Play Again
              </Button>
              <Button
                onClick={() => navigate("/challenges")}
                variant="outline"
                className="border-card text-card-foreground"
              >
                Back to Challenges
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

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
            🍽️ Food Quiz Master 🍽️
          </h1>
          <p className="text-lg text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-primary border-0 shadow-card p-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-8 text-center">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-6 text-lg bg-card text-card-foreground hover:bg-card/90 shadow-soft ${
                  selectedAnswer === index
                    ? selectedAnswer === question.correct
                      ? "ring-4 ring-success"
                      : "ring-4 ring-destructive"
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          <div className="mt-6 text-center text-card-foreground/80">
            <p>Reward: {question.reward} coins 🪙</p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default FoodQuiz;
