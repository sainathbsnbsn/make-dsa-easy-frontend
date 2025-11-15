import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNav from "./BottomNav";

const companies = [
  { name: "Google", count: 156 },
  { name: "Amazon", count: 142 },
  { name: "Meta", count: 128 },
  { name: "Microsoft", count: 134 },
  { name: "Apple", count: 98 },
  { name: "Adobe", count: 76 },
  { name: "Goldman Sachs", count: 64 },
  { name: "Infosys", count: 52 },
  { name: "TCS", count: 48 },
  { name: "Zoho", count: 42 },
];

const Companies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 sticky top-0 z-10 shadow-elevated">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="space-y-3">
          {companies.map((company) => (
            <Card
              key={company.name}
              className="cursor-pointer hover:shadow-card transition-all border-primary/10"
              onClick={() => navigate(`/problems/company/${company.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.count} problems</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Companies;
