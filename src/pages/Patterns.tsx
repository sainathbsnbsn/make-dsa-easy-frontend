import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNav from "./BottomNav";

const patterns = [
  { name: "Arrays & Hashing", count: 45 },
  { name: "Two Pointers", count: 32 },
  { name: "Sliding Window", count: 28 },
  { name: "Binary Search", count: 25 },
  { name: "Divide & Conquer", count: 18 },
  { name: "Prefix Sums", count: 22 },
  { name: "Greedy", count: 30 },
  { name: "Backtracking", count: 26 },
  { name: "Recursion", count: 24 },
  { name: "Trees", count: 38 },
  { name: "Graphs", count: 42 },
  { name: "Dynamic Programming", count: 48 },
];

const Patterns = () => {
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
          <h1 className="text-2xl font-bold text-white">Patterns</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="space-y-3">
          {patterns.map((pattern) => (
            <Card
              key={pattern.name}
              className="cursor-pointer hover:shadow-card transition-all border-primary/10"
              onClick={() => navigate(`/problems/${pattern.name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{pattern.name}</p>
                  <p className="text-sm text-muted-foreground">{pattern.count} problems</p>
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

export default Patterns;
