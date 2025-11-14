import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Solution = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();

  const approaches = [
    {
      level: "Good",
      title: "Brute Force",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      description: "Use nested loops to check every pair of numbers. Simple but inefficient for large inputs.",
      code: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    return new int[] {};
}`,
    },
    {
      level: "Better",
      title: "Two-Pointer (Sorted)",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      description: "Sort the array and use two pointers from both ends. Better than brute force but sorting adds overhead.",
      code: `public int[] twoSum(int[] nums, int target) {
    int[][] numsWithIndex = new int[nums.length][2];
    for (int i = 0; i < nums.length; i++) {
        numsWithIndex[i] = new int[] { nums[i], i };
    }
    
    Arrays.sort(numsWithIndex, (a, b) -> a[0] - b[0]);
    
    int left = 0, right = nums.length - 1;
    
    while (left < right) {
        int sum = numsWithIndex[left][0] + numsWithIndex[right][0];
        
        if (sum == target) {
            return new int[] { 
                numsWithIndex[left][1], 
                numsWithIndex[right][1] 
            };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return new int[] {};
}`,
    },
    {
      level: "Best",
      title: "HashMap (Optimal)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Use a HashMap to store complements for constant lookup time. This is the optimal solution with linear time complexity.",
      code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        
        map.put(nums[i], i);
    }
    
    return new int[] {};
}`,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 sticky top-0 z-10 shadow-elevated">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Solution: Two Sum</h1>
            <p className="text-white/80 text-sm">Multiple approaches explained</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-6 space-y-6">
        {approaches.map((approach, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge 
                      variant="secondary" 
                      className={
                        approach.level === "Best" 
                          ? "bg-green-500/10 text-green-700 dark:text-green-400" 
                          : approach.level === "Better"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          : "bg-slate-500/10 text-slate-700 dark:text-slate-400"
                      }
                    >
                      {approach.level}
                    </Badge>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      {approach.title}
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground mt-2">{approach.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">
                  Time: {approach.timeComplexity}
                </Badge>
                <Badge variant="secondary">
                  Space: {approach.spaceComplexity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="java">
                <TabsList>
                  <TabsTrigger value="java">Java</TabsTrigger>
                  <TabsTrigger value="cpp">C++</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
                <TabsContent value="java">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono">{approach.code}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="cpp">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono">// C++ implementation coming soon</code>
                  </pre>
                </TabsContent>
                <TabsContent value="python">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono"># Python implementation coming soon</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>
          <Button 
            className="flex-1"
            onClick={() => navigate("/problems/arrays-hashing")}
          >
            Next Problem
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Solution;
