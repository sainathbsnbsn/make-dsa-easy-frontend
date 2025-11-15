import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import BottomNav from "./BottomNav";

const Topics = () => {
  const topics = [
    { name: "Arrays & Hashing", solved: 7, total: 10, progress: 70, color: "bg-blue-500" },
    { name: "Two Pointers", solved: 4, total: 8, progress: 50, color: "bg-green-500" },
    { name: "Sliding Window", solved: 3, total: 10, progress: 30, color: "bg-purple-500" },
    { name: "Stack", solved: 5, total: 12, progress: 42, color: "bg-orange-500" },
    { name: "Binary Search", solved: 2, total: 15, progress: 13, color: "bg-red-500" },
    { name: "Linked List", solved: 6, total: 10, progress: 60, color: "bg-pink-500" },
    { name: "Trees", solved: 8, total: 20, progress: 40, color: "bg-teal-500" },
    { name: "Tries", solved: 1, total: 8, progress: 12, color: "bg-yellow-500" },
    { name: "Heap / Priority Queue", solved: 3, total: 10, progress: 30, color: "bg-indigo-500" },
    { name: "Backtracking", solved: 2, total: 12, progress: 17, color: "bg-cyan-500" },
    { name: "Graphs", solved: 3, total: 15, progress: 20, color: "bg-emerald-500" },
    { name: "Dynamic Programming", solved: 2, total: 20, progress: 10, color: "bg-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Practice Topics</h1>
          <p className="text-sm opacity-90 mt-1">Choose a topic to start practicing</p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {topics.map((topic) => (
          <Link key={topic.name} to="/topic-problems">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-12 rounded-full ${topic.color}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{topic.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.solved}/{topic.total} solved
                        </p>
                      </div>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Topics;
