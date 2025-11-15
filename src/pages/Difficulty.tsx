import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "./BottomNav";

const difficulties = [
  { level: "Easy", count: 127, color: "bg-green-500" },
  { level: "Medium", count: 312, color: "bg-amber-500" },
  { level: "Hard", count: 144, color: "bg-red-500" },
];

const Difficulty = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 sticky top-0 z-10 shadow-elevated">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Difficulty</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="space-y-3">
          {difficulties.map((difficulty) => (
            <Card
              key={difficulty.level}
              className="cursor-pointer hover:shadow-card transition-all border-primary/10"
              onClick={() => navigate(`/problems/difficulty/${difficulty.level.toLowerCase()}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${difficulty.color}`} />
                  <div>
                    <p className="font-semibold text-foreground">{difficulty.level}</p>
                    <p className="text-sm text-muted-foreground">{difficulty.count} problems</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Difficulty;
