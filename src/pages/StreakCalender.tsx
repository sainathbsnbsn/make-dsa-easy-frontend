import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StreakCalendarProps {
  activityData: Record<string, number>; // date string -> problem count
}

const StreakCalendar = ({ activityData }: StreakCalendarProps) => {
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-secondary";
    if (count === 1) return "bg-primary/20";
    if (count === 2) return "bg-primary/40";
    if (count === 3) return "bg-primary/60";
    return "bg-primary";
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getMonthsInYear = (date: Date) => {
    const year = date.getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (viewMode === "month") {
        newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      } else {
        newDate.setFullYear(prev.getFullYear() + (direction === "next" ? 1 : -1));
      }
      return newDate;
    });
  };

  const renderMonthView = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

    // Add weekday headers
    const headers = weekDays.map((day, i) => (
      <div key={`header-${i}`} className="text-xs text-muted-foreground font-medium text-center">
        {day}
      </div>
    ));

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const count = activityData[dateKey] || 0;
      const isToday = dateKey === formatDateKey(new Date());

      days.push(
        <div
          key={day}
          className={cn(
            "aspect-square rounded-md transition-all duration-200 hover:scale-110 cursor-pointer relative",
            getIntensityClass(count),
            isToday && "ring-2 ring-primary ring-offset-1"
          )}
          title={`${dateKey}: ${count} problem${count !== 1 ? "s" : ""} solved`}
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {day}
          </span>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {headers}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = getMonthsInYear(currentDate);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
      <div className="grid grid-cols-4 gap-3">
        {months.map((month, idx) => {
          const monthData = Object.entries(activityData).filter(([date]) => {
            const d = new Date(date);
            return d.getMonth() === idx && d.getFullYear() === currentDate.getFullYear();
          });
          
          const totalProblems = monthData.reduce((sum, [, count]) => sum + count, 0);
          const avgIntensity = monthData.length > 0 ? totalProblems / monthData.length : 0;

          return (
            <div
              key={idx}
              className={cn(
                "p-3 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer",
                getIntensityClass(Math.round(avgIntensity))
              )}
              onClick={() => {
                setCurrentDate(month);
                setViewMode("month");
              }}
              title={`${monthNames[idx]}: ${totalProblems} problems solved`}
            >
              <div className="text-center">
                <div className="text-sm font-semibold text-foreground">{monthNames[idx]}</div>
                <div className="text-xs text-muted-foreground mt-1">{totalProblems}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderTitle = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    return currentDate.getFullYear().toString();
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("prev")}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{getHeaderTitle()}</h3>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              className={cn(
                "px-3 py-1 text-xs font-medium transition-colors",
                viewMode === "month" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setViewMode("month")}
            >
              Month
            </button>
            <button
              className={cn(
                "px-3 py-1 text-xs font-medium transition-colors",
                viewMode === "year" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setViewMode("year")}
            >
              Year
            </button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("next")}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      {viewMode === "month" ? renderMonthView() : renderYearView()}

      {/* Legend */}
      <div className="flex items-center gap-2 justify-end">
        <span className="text-xs text-muted-foreground">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn("w-4 h-4 rounded", getIntensityClass(level))}
          />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
};

export default StreakCalendar;
