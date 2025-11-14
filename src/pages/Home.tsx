import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, BookOpen, Building2, BarChart3, Clock, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const todaysPick = {
    title: "Two Sum",
    company: "Amazon",
    difficulty: "Easy",
    pattern: "Arrays & Hashing",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 rounded-b-3xl shadow-elevated">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">DSA Sprint</h1>
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by title/company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-0 h-12 rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6 space-y-8">
        {/* Recommended Today */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Recommended Today</h2>
          </div>
          
          <Card className="bg-gradient-card border-0 shadow-card cursor-pointer hover:shadow-elevated transition-all" onClick={() => navigate(`/problem/${todaysPick.title.toLowerCase().replace(/\s+/g, '-')}`)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-xl mb-2">{todaysPick.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {todaysPick.company}
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {todaysPick.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                Solve Now
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Categories</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-card transition-all border-primary/20"
              onClick={() => navigate("/patterns")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Patterns</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-card transition-all border-primary/20"
              onClick={() => navigate("/companies")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Companies</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-card transition-all border-primary/20"
              onClick={() => navigate("/difficulty")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Difficulty</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
          
          <div className="space-y-3">
            <Card className="cursor-pointer hover:shadow-card transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Recent Problems</p>
                  <p className="text-sm text-muted-foreground">Continue where you left off</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-card transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Saved Problems</p>
                  <p className="text-sm text-muted-foreground">Your bookmarked challenges</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
