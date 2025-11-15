import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "./BottomNav";

const ProblemDetail = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();

  const problem = {
    title: "Two Sum",
    difficulty: "Easy",
    companies: ["Amazon", "Google"],
    tags: ["Arrays", "Hashing"],
    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists.",
    ],
  };

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
          <h1 className="text-2xl font-bold text-white flex-1">{problem.title}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6 space-y-6">
        {/* Tags and Companies */}
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span>Asked in: {problem.companies.join(", ")}</span>
        </div>

        {/* Problem Statement */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-line">{problem.statement}</p>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {problem.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <p className="font-semibold text-foreground">Example {index + 1}:</p>
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                  <p><span className="font-semibold">Input:</span> {example.input}</p>
                  <p><span className="font-semibold">Output:</span> {example.output}</p>
                  <p><span className="font-semibold">Explanation:</span> {example.explanation}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
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
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/hints/${problemId}`)}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Show Hints
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

export default ProblemDetail;
