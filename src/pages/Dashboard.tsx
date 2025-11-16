import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Target, Calendar, TrendingUp, Brain, Zap } from "lucide-react";
import BottomNav from "./BottomNav";
import StreakCalendar from "./StreakCalender";
import StreakBadges from "./StreakBadges";

const Dashboard = () => {
  const topics = [
    { name: "Arrays", solved: 7, total: 10, progress: 70 },
    { name: "Strings", solved: 5, total: 10, progress: 50 },
    { name: "Dynamic Programming", solved: 2, total: 20, progress: 10 },
    { name: "Graphs", solved: 3, total: 15, progress: 20 },
  ];

  const activityData = {
    // Sample activity data for the calendar
    "2025-11-01": 2,
    "2025-11-02": 1,
    "2025-11-03": 3,
    "2025-11-05": 1,
    "2025-11-06": 2,
    "2025-11-07": 1,
    "2025-11-08": 4,
    "2025-11-09": 2,
    "2025-11-10": 1,
    "2025-11-11": 3,
    "2025-11-12": 2,
    "2025-11-13": 1,
    "2025-11-14": 2,
    "2025-11-15": 3,
    "2025-11-16": 1,
  };

  const stats = {
    currentStreak: 12,
    thisMonth: 45,
    totalSolved: 271,
    longestStreak: 18,
  };


  // Generate 12 weeks of activity data (GitHub style)
  // const generateActivityData = () => {
  //   const weeks = [];
  //   for (let week = 0; week < 12; week++) {
  //     const days = [];
  //     for (let day = 0; day < 7; day++) {
  //       // Random activity level (0-4)
  //       const level = Math.floor(Math.random() * 5);
  //       days.push(level);
  //     }
  //     weeks.push(days);
  //   }
  //   return weeks;
  // };

  // const activityData = generateActivityData();

  const getActivityColor = (level: number) => {
    const colors = [
      "bg-muted/30",           // No activity
      "bg-success/30",         // Low
      "bg-success/50",         // Medium-low
      "bg-success/70",         // Medium-high
      "bg-success",            // High
    ];
    return colors[level];
  };

  const badges = [
    { icon: Flame, label: "7 Day Streak", color: "text-orange-500" },
    { icon: Brain, label: "Array Master", color: "text-purple-500" },
    { icon: Trophy, label: "50 Solved", color: "text-yellow-500" },
    { icon: Zap, label: "DP Warrior", color: "text-blue-500" },
    { icon: TrendingUp, label: "Graph Explorer", color: "text-green-500" },
    { icon: Target, label: "Hard Qn", color: "text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary-foreground">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Username</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="bg-primary-foreground/20 px-2 py-1 rounded-full">
                Level: Intermediate
              </span>
              <span>•</span>
              <span>XP: 1280</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-muted-foreground">
                    {topic.solved}/{topic.total}
                  </span>
                </div>
                <Progress value={topic.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Streak Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <StreakCalendar activityData={activityData} />

            {/* Activity Grid */}

            {/* Streak Stats */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Current Streak</span>
                </div>
                <span className="text-sm font-semibold">12 days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Longest Streak</span>
                </div>
                <span className="text-sm font-semibold">18 days</span>
              </div>
            </div>
            <StreakBadges currentStreak={stats.currentStreak} longestStreak={stats.longestStreak} />

          </CardContent>
        </Card>

        {/* Daily Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Daily Goal Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Goal: Solve 2 problems</span>
                <span className="font-semibold text-primary">67%</span>
              </div>
              <Progress value={67} className="h-3" />
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-success">✔</span>
                <span>Solved 1 problem</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏳</span>
                <span>1 more to go!</span>
              </div>
            </div>
            <Button className="w-full">Complete Daily Goal</Button>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Badges & Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg"
                  >
                    <Icon className={`w-8 h-8 ${badge.color}`} />
                    <span className="text-xs text-center font-medium">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Tasks & Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Finish DP basics today (15 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Try 2 graph questions to hit weekly target</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span className="text-warning">You haven't practiced Trees in 5 days</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Weekly Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Spent:</span>
              <span className="font-semibold">4h 22m this week</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Problems Solved:</span>
              <span className="font-semibold">18 problems</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary">Easy: 8</Badge>
              <Badge variant="secondary">Medium: 7</Badge>
              <Badge variant="secondary">Hard: 3</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Insights */}
        <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Personalized Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
              <span>You're solving medium problems 28% faster now</span>
            </p>
            <p className="flex items-start gap-2">
              <Target className="w-4 h-4 mt-0.5 text-warning flex-shrink-0" />
              <span>Weak topic: Dynamic Programming</span>
            </p>
            <p className="flex items-start gap-2">
              <Brain className="w-4 h-4 mt-0.5 text-info flex-shrink-0" />
              <span>Peak learning time: 8–10 PM</span>
            </p>
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card className="bg-gradient-to-r from-primary to-purple-600 text-white border-none">
          <CardContent className="pt-6 text-center space-y-2">
            <p className="text-lg font-semibold">
              "Small progress every day leads to big results."
            </p>
            <p className="text-sm opacity-90">
              ⭐ You're just 1 problem away from your goal!
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
