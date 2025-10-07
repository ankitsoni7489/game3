import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Coins, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fruits = [
  { name: "Apple", emoji: "🍎", price: 10, type: "coins" },
  { name: "Banana", emoji: "🍌", price: 8, type: "coins" },
  { name: "Orange", emoji: "🍊", price: 12, type: "coins" },
  { name: "Grapes", emoji: "🍇", price: 15, type: "coins" },
  { name: "Watermelon", emoji: "🍉", price: 20, type: "coins" },
  { name: "Dragon Fruit", emoji: "🐉🍎", price: 5, type: "gold" },
];

const vegetables = [
  { name: "Carrot", emoji: "🥕", price: 10, type: "coins" },
  { name: "Broccoli", emoji: "🥦", price: 12, type: "coins" },
  { name: "Tomato", emoji: "🍅", price: 8, type: "coins" },
  { name: "Corn", emoji: "🌽", price: 15, type: "coins" },
  { name: "Eggplant", emoji: "🍆", price: 14, type: "coins" },
  { name: "Truffle", emoji: "🍄‍🟫", price: 8, type: "gold" },
];

const international = [
  { name: "Sushi", emoji: "🍣", price: 25, type: "coins" },
  { name: "Pizza", emoji: "🍕", price: 20, type: "coins" },
  { name: "Taco", emoji: "🌮", price: 18, type: "coins" },
  { name: "Ramen", emoji: "🍜", price: 22, type: "coins" },
  { name: "Caviar", emoji: "🥚💎", price: 10, type: "gold" },
  { name: "Wagyu Beef", emoji: "🥩✨", price: 15, type: "gold" },
];

const RecipeBook = () => {
  const navigate = useNavigate();
  const [userCoins, setUserCoins] = useState(250);
  const [userGold, setUserGold] = useState(30);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  const handleUnlock = (item: any) => {
    const isUnlocked = unlockedItems.includes(item.name);
    if (isUnlocked) return;

    if (item.type === "coins" && userCoins >= item.price) {
      setUserCoins(userCoins - item.price);
      setUnlockedItems([...unlockedItems, item.name]);
    } else if (item.type === "gold" && userGold >= item.price) {
      setUserGold(userGold - item.price);
      setUnlockedItems([...unlockedItems, item.name]);
    }
  };

  const ItemCard = ({ item }: { item: any }) => {
    const isUnlocked = unlockedItems.includes(item.name);
    const canAfford = item.type === "coins" ? userCoins >= item.price : userGold >= item.price;

    return (
      <Card className={`border-0 shadow-card p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-glow animate-slide-up ${
        isUnlocked ? "bg-gradient-success" : "bg-gradient-primary"
      }`}>
        <div className="text-5xl mb-3 animate-float">{item.emoji}</div>
        <h3 className="text-lg font-bold text-card-foreground mb-2">{item.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-3">
          {item.type === "coins" ? (
            <>
              <Coins className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-card-foreground">{item.price}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-card-foreground">{item.price}</span>
            </>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => handleUnlock(item)}
          disabled={isUnlocked || !canAfford}
          className="w-full bg-card text-card-foreground hover:bg-card/90 shadow-soft disabled:opacity-50"
        >
          {isUnlocked ? "Unlocked ✓" : canAfford ? "Unlock" : "Not enough"}
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHeader coins={userCoins} gold={userGold} />

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
            📖 Recipe Book Store 📖
          </h1>
          <p className="text-lg text-muted-foreground">
            Unlock delicious foods from around the world!
          </p>
        </div>

        <Tabs defaultValue="fruits" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="fruits">Fruits 🍎</TabsTrigger>
            <TabsTrigger value="vegetables">Veggies 🥦</TabsTrigger>
            <TabsTrigger value="international">International 🌍</TabsTrigger>
          </TabsList>

          <TabsContent value="fruits">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {fruits.map((fruit) => (
                <ItemCard key={fruit.name} item={fruit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vegetables">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {vegetables.map((veg) => (
                <ItemCard key={veg.name} item={veg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="international">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {international.map((food) => (
                <ItemCard key={food.name} item={food} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-accent border-0 shadow-card p-6 animate-bounce-in">
            <p className="text-lg font-semibold text-card-foreground">
              💎 Use gold to unlock unlimited lives and rare exotic foods! 💎
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RecipeBook;
