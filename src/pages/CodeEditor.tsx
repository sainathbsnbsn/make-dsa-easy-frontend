import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "./BottomNav";

const CodeEditor = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const { toast } = useToast();
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(`public int[] twoSum(int[] nums, int target) {
    // Write your code here
    
}`);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "error">("idle");

  const handleRun = () => {
    setOutput("[0, 1]");
    setStatus("correct");
    toast({
      title: "Code executed successfully",
      description: "All test cases passed!",
    });
  };

  const handleSubmit = () => {
    setStatus("correct");
    toast({
      title: "Accepted!",
      description: "Your solution has been accepted.",
    });
    setTimeout(() => {
      navigate(`/solution/${problemId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 sticky top-0 z-10 shadow-elevated">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold text-white">Two Sum</h1>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 bg-white/20 border-0 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4">
        <Tabs defaultValue="editor" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-0 focus-visible:ring-0 resize-none"
                  placeholder="// Write your code here"
                />
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="font-semibold">Input:</span> nums = [2,7,11,15], target = 9
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleRun} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button onClick={handleSubmit} variant="default" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="output">
            <Card>
              <CardContent className="p-6">
                {status === "idle" ? (
                  <p className="text-muted-foreground text-center py-8">
                    Run your code to see the output
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      status === "correct" 
                        ? "bg-green-500/10 text-green-700 dark:text-green-400" 
                        : "bg-red-500/10 text-red-700 dark:text-red-400"
                    }`}>
                      {status === "correct" ? "✓ Accepted" : "✗ Wrong Answer"}
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-semibold mb-2">Output:</p>
                      <p className="font-mono">{output}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testcases">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">Test Case 1:</p>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p><span className="font-semibold">Input:</span> nums = [2,7,11,15], target = 9</p>
                    <p><span className="font-semibold">Expected:</span> [0,1]</p>
                    <p className="text-green-600 dark:text-green-400">✓ Passed</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Test Case 2:</p>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p><span className="font-semibold">Input:</span> nums = [3,2,4], target = 6</p>
                    <p><span className="font-semibold">Expected:</span> [1,2]</p>
                    <p className="text-green-600 dark:text-green-400">✓ Passed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
};

export default CodeEditor;
