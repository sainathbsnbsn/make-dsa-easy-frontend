import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "./BottomNav";

const Hints = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();

  const hints = [
    {
      level: "Hint 1",
      text: "Think about how you can avoid checking the same pair of numbers twice.",
    },
    {
      level: "Hint 2",
      text: "Consider using a data structure that allows you to check if a number exists in constant time.",
    },
    {
      level: "Hint 3",
      text: "For each number, calculate what its complement would be (target - current number). Have you seen this complement before?",
    },
    {
      level: "Hint 4",
      text: "A HashMap can store numbers you've already seen. As you iterate through the array, check if the complement exists in the HashMap.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 sticky top-0 z-10 shadow-elevated">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Hints: Two Sum</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6 space-y-6">
        <div className="text-sm text-muted-foreground mb-6">
          Try to solve the problem using these hints before looking at the solution.
        </div>

        {hints.map((hint, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                {hint.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{hint.text}</p>
            </CardContent>
          </Card>
        ))}

        <div className="sticky bottom-6 grid grid-cols-3 gap-2">
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => navigate(`/editor/${problemId}`)}
          >
            Solve Now
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/solution/${problemId}`)}
          >
            Show Solution
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Hints;
