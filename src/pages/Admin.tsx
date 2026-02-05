 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Checkbox } from "@/components/ui/checkbox";
 import { Badge } from "@/components/ui/badge";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { useToast } from "@/hooks/use-toast";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/hooks/useAuth";
 
 interface Example {
   input: string;
   output: string;
   explanation: string;
 }
 
 interface Hint {
   hint_text: string;
 }
 
 interface Solution {
   approach_level: "Good" | "Better" | "Best";
   title: string;
   description: string;
   time_complexity: string;
   space_complexity: string;
   java_code: string;
   cpp_code: string;
   python_code: string;
 }
 
 interface Pattern {
   id: string;
   name: string;
   slug: string;
 }
 
 interface Company {
   id: string;
   name: string;
   slug: string;
 }
 
 const Admin = () => {
   const navigate = useNavigate();
   const { toast } = useToast();
   const { user } = useAuth();
   const [loading, setLoading] = useState(false);
   const [patterns, setPatterns] = useState<Pattern[]>([]);
   const [companies, setCompanies] = useState<Company[]>([]);
 
   // Form state
   const [title, setTitle] = useState("");
   const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
   const [problemStatement, setProblemStatement] = useState("");
   const [constraints, setConstraints] = useState("");
   const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
   const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
   const [tags, setTags] = useState<string[]>([]);
   const [tagInput, setTagInput] = useState("");
   const [examples, setExamples] = useState<Example[]>([{ input: "", output: "", explanation: "" }]);
   const [hints, setHints] = useState<Hint[]>([{ hint_text: "" }]);
   const [solutions, setSolutions] = useState<Solution[]>([
     {
       approach_level: "Good",
       title: "Brute Force",
       description: "",
       time_complexity: "",
       space_complexity: "",
       java_code: "",
       cpp_code: "",
       python_code: "",
     },
     {
       approach_level: "Better",
       title: "",
       description: "",
       time_complexity: "",
       space_complexity: "",
       java_code: "",
       cpp_code: "",
       python_code: "",
     },
     {
       approach_level: "Best",
       title: "Optimal",
       description: "",
       time_complexity: "",
       space_complexity: "",
       java_code: "",
       cpp_code: "",
       python_code: "",
     },
   ]);
 
   useEffect(() => {
     fetchPatterns();
     fetchCompanies();
   }, []);
 
   const fetchPatterns = async () => {
     const { data } = await supabase.from("patterns").select("id, name, slug").order("name");
     if (data) setPatterns(data);
   };
 
   const fetchCompanies = async () => {
     const { data } = await supabase.from("companies").select("id, name, slug").order("name");
     if (data) setCompanies(data);
   };
 
   const generateSlug = (text: string) => {
     return text
       .toLowerCase()
       .replace(/[^a-z0-9]+/g, "-")
       .replace(/(^-|-$)/g, "");
   };
 
   const addTag = () => {
     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
       setTags([...tags, tagInput.trim()]);
       setTagInput("");
     }
   };
 
   const removeTag = (tag: string) => {
     setTags(tags.filter((t) => t !== tag));
   };
 
   const addExample = () => {
     setExamples([...examples, { input: "", output: "", explanation: "" }]);
   };
 
   const removeExample = (index: number) => {
     if (examples.length > 1) {
       setExamples(examples.filter((_, i) => i !== index));
     }
   };
 
   const updateExample = (index: number, field: keyof Example, value: string) => {
     const updated = [...examples];
     updated[index][field] = value;
     setExamples(updated);
   };
 
   const addHint = () => {
     setHints([...hints, { hint_text: "" }]);
   };
 
   const removeHint = (index: number) => {
     if (hints.length > 1) {
       setHints(hints.filter((_, i) => i !== index));
     }
   };
 
   const updateHint = (index: number, value: string) => {
     const updated = [...hints];
     updated[index].hint_text = value;
     setHints(updated);
   };
 
   const updateSolution = (index: number, field: keyof Solution, value: string) => {
     const updated = [...solutions];
     (updated[index] as any)[field] = value;
     setSolutions(updated);
   };
 
   const togglePattern = (patternId: string) => {
     setSelectedPatterns((prev) =>
       prev.includes(patternId) ? prev.filter((id) => id !== patternId) : [...prev, patternId]
     );
   };
 
   const toggleCompany = (companyId: string) => {
     setSelectedCompanies((prev) =>
       prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
     );
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
 
     if (!title.trim() || !problemStatement.trim()) {
       toast({
         title: "Validation Error",
         description: "Title and Problem Statement are required",
         variant: "destructive",
       });
       return;
     }
 
     setLoading(true);
 
     try {
       const slug = generateSlug(title);
 
       // Insert problem
       const { data: problem, error: problemError } = await supabase
         .from("problems")
         .insert({
           title,
           slug,
           difficulty,
           problem_statement: problemStatement,
           constraints,
           created_by: user?.id,
         })
         .select()
         .single();
 
       if (problemError) throw problemError;
 
       const problemId = problem.id;
 
       // Insert tags
       if (tags.length > 0) {
         const tagData = tags.map((tag) => ({ problem_id: problemId, tag }));
         const { error } = await supabase.from("problem_tags").insert(tagData);
         if (error) throw error;
       }
 
       // Insert patterns
       if (selectedPatterns.length > 0) {
         const patternData = selectedPatterns.map((pattern_id) => ({
           problem_id: problemId,
           pattern_id,
         }));
         const { error } = await supabase.from("problem_patterns").insert(patternData);
         if (error) throw error;
       }
 
       // Insert companies
       if (selectedCompanies.length > 0) {
         const companyData = selectedCompanies.map((company_id) => ({
           problem_id: problemId,
           company_id,
         }));
         const { error } = await supabase.from("problem_companies").insert(companyData);
         if (error) throw error;
       }
 
       // Insert examples
       const validExamples = examples.filter((e) => e.input.trim() || e.output.trim());
       if (validExamples.length > 0) {
         const exampleData = validExamples.map((example, index) => ({
           problem_id: problemId,
           input: example.input,
           output: example.output,
           explanation: example.explanation,
           order_index: index,
         }));
         const { error } = await supabase.from("problem_examples").insert(exampleData);
         if (error) throw error;
       }
 
       // Insert hints
       const validHints = hints.filter((h) => h.hint_text.trim());
       if (validHints.length > 0) {
         const hintData = validHints.map((hint, index) => ({
           problem_id: problemId,
           hint_text: hint.hint_text,
           order_index: index,
         }));
         const { error } = await supabase.from("problem_hints").insert(hintData);
         if (error) throw error;
       }
 
       // Insert solutions
       const validSolutions = solutions.filter((s) => s.title.trim() && s.description.trim());
       if (validSolutions.length > 0) {
         const solutionData = validSolutions.map((solution, index) => ({
           problem_id: problemId,
           approach_level: solution.approach_level,
           title: solution.title,
           description: solution.description,
           time_complexity: solution.time_complexity,
           space_complexity: solution.space_complexity,
           java_code: solution.java_code,
           cpp_code: solution.cpp_code,
           python_code: solution.python_code,
           order_index: index,
         }));
         const { error } = await supabase.from("problem_solutions").insert(solutionData);
         if (error) throw error;
       }
 
       toast({
         title: "Success!",
         description: "Problem created successfully",
       });
 
       // Reset form
       setTitle("");
       setDifficulty("medium");
       setProblemStatement("");
       setConstraints("");
       setSelectedPatterns([]);
       setSelectedCompanies([]);
       setTags([]);
       setExamples([{ input: "", output: "", explanation: "" }]);
       setHints([{ hint_text: "" }]);
       setSolutions([
         {
           approach_level: "Good",
           title: "Brute Force",
           description: "",
           time_complexity: "",
           space_complexity: "",
           java_code: "",
           cpp_code: "",
           python_code: "",
         },
         {
           approach_level: "Better",
           title: "",
           description: "",
           time_complexity: "",
           space_complexity: "",
           java_code: "",
           cpp_code: "",
           python_code: "",
         },
         {
           approach_level: "Best",
           title: "Optimal",
           description: "",
           time_complexity: "",
           space_complexity: "",
           java_code: "",
           cpp_code: "",
           python_code: "",
         },
       ]);
     } catch (error: any) {
       toast({
         title: "Error",
         description: error.message || "Failed to create problem",
         variant: "destructive",
       });
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="min-h-screen bg-background pb-8">
       {/* Header */}
       <div className="bg-gradient-to-r from-primary to-primary-light p-6 sticky top-0 z-10 shadow-lg">
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
             <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
             <p className="text-white/80 text-sm">Add new problem</p>
           </div>
         </div>
       </div>
 
       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
         {/* Basic Info */}
         <Card>
           <CardHeader>
             <CardTitle>Basic Information</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="grid gap-4 md:grid-cols-2">
               <div className="space-y-2">
                 <Label htmlFor="title">Problem Title *</Label>
                 <Input
                   id="title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="e.g., Two Sum"
                   required
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="difficulty">Difficulty *</Label>
                 <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="easy">Easy</SelectItem>
                     <SelectItem value="medium">Medium</SelectItem>
                     <SelectItem value="hard">Hard</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
 
             <div className="space-y-2">
               <Label htmlFor="statement">Problem Statement *</Label>
               <Textarea
                 id="statement"
                 value={problemStatement}
                 onChange={(e) => setProblemStatement(e.target.value)}
                 placeholder="Describe the problem..."
                 rows={6}
                 required
               />
             </div>
 
             <div className="space-y-2">
               <Label htmlFor="constraints">Constraints</Label>
               <Textarea
                 id="constraints"
                 value={constraints}
                 onChange={(e) => setConstraints(e.target.value)}
                 placeholder="e.g., 2 <= nums.length <= 10^4"
                 rows={3}
               />
             </div>
           </CardContent>
         </Card>
 
         {/* Tags */}
         <Card>
           <CardHeader>
             <CardTitle>Tags</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex gap-2">
               <Input
                 value={tagInput}
                 onChange={(e) => setTagInput(e.target.value)}
                 placeholder="Add a tag"
                 onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
               />
               <Button type="button" onClick={addTag} variant="secondary">
                 <Plus className="w-4 h-4" />
               </Button>
             </div>
             <div className="flex flex-wrap gap-2">
               {tags.map((tag) => (
                 <Badge key={tag} variant="secondary" className="gap-1">
                   {tag}
                   <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                     ×
                   </button>
                 </Badge>
               ))}
             </div>
           </CardContent>
         </Card>
 
         {/* Patterns & Companies */}
         <div className="grid gap-6 md:grid-cols-2">
           <Card>
             <CardHeader>
               <CardTitle>Patterns</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                 {patterns.map((pattern) => (
                   <div key={pattern.id} className="flex items-center space-x-2">
                     <Checkbox
                       id={`pattern-${pattern.id}`}
                       checked={selectedPatterns.includes(pattern.id)}
                       onCheckedChange={() => togglePattern(pattern.id)}
                     />
                     <label htmlFor={`pattern-${pattern.id}`} className="text-sm cursor-pointer">
                       {pattern.name}
                     </label>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
 
           <Card>
             <CardHeader>
               <CardTitle>Companies</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                 {companies.map((company) => (
                   <div key={company.id} className="flex items-center space-x-2">
                     <Checkbox
                       id={`company-${company.id}`}
                       checked={selectedCompanies.includes(company.id)}
                       onCheckedChange={() => toggleCompany(company.id)}
                     />
                     <label htmlFor={`company-${company.id}`} className="text-sm cursor-pointer">
                       {company.name}
                     </label>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Examples */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle>Examples</CardTitle>
             <Button type="button" onClick={addExample} variant="outline" size="sm">
               <Plus className="w-4 h-4 mr-1" /> Add Example
             </Button>
           </CardHeader>
           <CardContent className="space-y-4">
             {examples.map((example, index) => (
               <div key={index} className="p-4 border rounded-lg space-y-3 relative">
                 <div className="flex justify-between items-center">
                   <h4 className="font-medium text-sm text-muted-foreground">Example {index + 1}</h4>
                   {examples.length > 1 && (
                     <Button
                       type="button"
                       variant="ghost"
                       size="sm"
                       onClick={() => removeExample(index)}
                       className="text-destructive hover:text-destructive"
                     >
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   )}
                 </div>
                 <div className="grid gap-3 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label>Input</Label>
                     <Textarea
                       value={example.input}
                       onChange={(e) => updateExample(index, "input", e.target.value)}
                       placeholder="nums = [2,7,11,15], target = 9"
                       rows={2}
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>Output</Label>
                     <Textarea
                       value={example.output}
                       onChange={(e) => updateExample(index, "output", e.target.value)}
                       placeholder="[0,1]"
                       rows={2}
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label>Explanation</Label>
                   <Input
                     value={example.explanation}
                     onChange={(e) => updateExample(index, "explanation", e.target.value)}
                     placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]"
                   />
                 </div>
               </div>
             ))}
           </CardContent>
         </Card>
 
         {/* Hints */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle>Hints</CardTitle>
             <Button type="button" onClick={addHint} variant="outline" size="sm">
               <Plus className="w-4 h-4 mr-1" /> Add Hint
             </Button>
           </CardHeader>
           <CardContent className="space-y-3">
             {hints.map((hint, index) => (
               <div key={index} className="flex gap-2 items-start">
                 <span className="text-sm font-medium text-muted-foreground mt-2">{index + 1}.</span>
                 <Input
                   value={hint.hint_text}
                   onChange={(e) => updateHint(index, e.target.value)}
                   placeholder="Think about using a hash map..."
                   className="flex-1"
                 />
                 {hints.length > 1 && (
                   <Button
                     type="button"
                     variant="ghost"
                     size="icon"
                     onClick={() => removeHint(index)}
                     className="text-destructive hover:text-destructive"
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                 )}
               </div>
             ))}
           </CardContent>
         </Card>
 
         {/* Solutions */}
         <Card>
           <CardHeader>
             <CardTitle>Solutions</CardTitle>
           </CardHeader>
           <CardContent>
             <Tabs defaultValue="Good" className="w-full">
               <TabsList className="grid w-full grid-cols-3">
                 <TabsTrigger value="Good">Good (Brute)</TabsTrigger>
                 <TabsTrigger value="Better">Better</TabsTrigger>
                 <TabsTrigger value="Best">Best (Optimal)</TabsTrigger>
               </TabsList>
 
               {solutions.map((solution, index) => (
                 <TabsContent key={solution.approach_level} value={solution.approach_level} className="space-y-4 mt-4">
                   <div className="grid gap-4 md:grid-cols-2">
                     <div className="space-y-2">
                       <Label>Approach Title</Label>
                       <Input
                         value={solution.title}
                         onChange={(e) => updateSolution(index, "title", e.target.value)}
                         placeholder="e.g., HashMap Approach"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                       <div className="space-y-2">
                         <Label>Time Complexity</Label>
                         <Input
                           value={solution.time_complexity}
                           onChange={(e) => updateSolution(index, "time_complexity", e.target.value)}
                           placeholder="O(n)"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>Space Complexity</Label>
                         <Input
                           value={solution.space_complexity}
                           onChange={(e) => updateSolution(index, "space_complexity", e.target.value)}
                           placeholder="O(n)"
                         />
                       </div>
                     </div>
                   </div>
 
                   <div className="space-y-2">
                     <Label>Explanation</Label>
                     <Textarea
                       value={solution.description}
                       onChange={(e) => updateSolution(index, "description", e.target.value)}
                       placeholder="Explain the approach..."
                       rows={3}
                     />
                   </div>
 
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label>Java Code</Label>
                       <Textarea
                         value={solution.java_code}
                         onChange={(e) => updateSolution(index, "java_code", e.target.value)}
                         placeholder="public int[] twoSum(int[] nums, int target) {...}"
                         rows={8}
                         className="font-mono text-sm"
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>C++ Code</Label>
                       <Textarea
                         value={solution.cpp_code}
                         onChange={(e) => updateSolution(index, "cpp_code", e.target.value)}
                         placeholder="vector<int> twoSum(vector<int>& nums, int target) {...}"
                         rows={8}
                         className="font-mono text-sm"
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Python Code</Label>
                       <Textarea
                         value={solution.python_code}
                         onChange={(e) => updateSolution(index, "python_code", e.target.value)}
                         placeholder="def twoSum(self, nums: List[int], target: int) -> List[int]:"
                         rows={8}
                         className="font-mono text-sm"
                       />
                     </div>
                   </div>
                 </TabsContent>
               ))}
             </Tabs>
           </CardContent>
         </Card>
 
         {/* Submit */}
         <div className="flex gap-4">
           <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
             Cancel
           </Button>
           <Button type="submit" className="flex-1" disabled={loading}>
             {loading ? (
               <>
                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                 Saving...
               </>
             ) : (
               <>
                 <Save className="w-4 h-4 mr-2" />
                 Save Problem
               </>
             )}
           </Button>
         </div>
       </form>
     </div>
   );
 };
 
 export default Admin;