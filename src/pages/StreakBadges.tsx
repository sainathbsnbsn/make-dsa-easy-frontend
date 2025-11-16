import { Flame, Trophy, Star, Zap, Crown, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakBadgesProps {
  currentStreak: number;
  longestStreak: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  daysRequired: number;
  color: string;
  bgColor: string;
}

const badges: Badge[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Complete a 3-day streak",
    icon: Flame,
    daysRequired: 3,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "consistent",
    name: "Consistent",
    description: "Complete a 7-day streak",
    icon: Star,
    daysRequired: 7,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Complete a 14-day streak",
    icon: Zap,
    daysRequired: 14,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "champion",
    name: "Champion",
    description: "Complete a 30-day streak",
    icon: Trophy,
    daysRequired: 30,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "legend",
    name: "Legend",
    description: "Complete a 60-day streak",
    icon: Crown,
    daysRequired: 60,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "master",
    name: "Master",
    description: "Complete a 100-day streak",
    icon: Rocket,
    daysRequired: 100,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const StreakBadges = ({ currentStreak, longestStreak }: StreakBadgesProps) => {
  const isUnlocked = (daysRequired: number) => longestStreak >= daysRequired;
  const isActive = (daysRequired: number) => currentStreak >= daysRequired;

  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((badge) => {
        const Icon = badge.icon;
        const unlocked = isUnlocked(badge.daysRequired);
        const active = isActive(badge.daysRequired);

        return (
          <div
            key={badge.id}
            className={cn(
              "relative p-4 rounded-xl border transition-all duration-300",
              unlocked
                ? "border-border bg-card hover:shadow-md hover:-translate-y-1 cursor-pointer"
                : "border-border/50 bg-muted/30 opacity-50"
            )}
          >
            {/* Active Indicator */}
            {active && unlocked && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Flame className="w-3 h-3 text-primary-foreground" />
              </div>
            )}

            {/* Badge Icon */}
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all",
                unlocked ? badge.bgColor : "bg-muted"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-all",
                  unlocked ? badge.color : "text-muted-foreground"
                )}
              />
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h4
                className={cn(
                  "text-sm font-semibold mb-1",
                  unlocked ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {badge.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-tight">
                {badge.description}
              </p>
            </div>

            {/* Lock Overlay */}
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StreakBadges;
