import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sampleProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    companies: ["Amazon", "Google"],
    difficulty: "Easy",
    pattern: "Arrays & Hashing",
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    companies: ["Meta"],
    difficulty: "Medium",
    pattern: "Arrays & Hashing",
  },
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    companies: ["Facebook", "Google"],
    difficulty: "Medium",
    pattern: "Arrays & Hashing",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    companies: ["Amazon"],
    difficulty: "Medium",
    pattern: "Two Pointers",
  },
  {
    id: "three-sum",
    title: "3Sum",
    companies: ["Amazon", "Microsoft"],
    difficulty: "Medium",
    pattern: "Two Pointers",
  },
];

const ProblemList = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const categoryTitle = category?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' & ') || "Problems";

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "medium": return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
      case "hard": return "bg-red-500/10 text-red-700 dark:text-red-400";
      default: return "";
    }
  };

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
          <h1 className="text-2xl font-bold text-white">{categoryTitle}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="space-y-4">
          {sampleProblems.map((problem) => (
            <Card
              key={problem.id}
              className="cursor-pointer hover:shadow-card transition-all"
              onClick={() => navigate(`/problem/${problem.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{problem.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4" />
                        {problem.companies.join(", ")}
                      </div>
                    </CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="default" size="sm" className="w-full">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
