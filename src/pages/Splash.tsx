import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <Code2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white mb-2">DSA SPRINT</h1>
          <p className="text-xl text-white/90">Master DSA Fast</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
