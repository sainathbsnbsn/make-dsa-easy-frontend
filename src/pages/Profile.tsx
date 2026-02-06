import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, Mail, Calendar, Trophy, Moon, Sun, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-primary-foreground mx-auto">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Username</h1>
            <p className="text-sm opacity-90">Intermediate • Level 5</p>
          </div>
          <div className="flex justify-center gap-6 text-center pt-2">
            <div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-xs opacity-80">Problems</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs opacity-80">Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1280</p>
              <p className="text-xs opacity-80">XP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>user@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Joined January 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="secondary" className="mr-2">7 Day Streak</Badge>
            <Badge variant="secondary" className="mr-2">Array Master</Badge>
            <Badge variant="secondary">50 Problems Solved</Badge>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          {isAdmin && (
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="lg"
              onClick={() => navigate("/admin")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Panel
            </Button>
          )}
          <Card>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive" 
            size="lg"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
