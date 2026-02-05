 import { Navigate } from "react-router-dom";
 import { useAuth } from "@/hooks/useAuth";
 import { Loader2 } from "lucide-react";
 
 interface ProtectedAdminRouteProps {
   children: React.ReactNode;
 }
 
 const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
   const { user, loading, isAdmin } = useAuth();
 
   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
     );
   }
 
   if (!user) {
     return <Navigate to="/auth" replace />;
   }
 
   if (!isAdmin) {
     return <Navigate to="/home" replace />;
   }
 
   return <>{children}</>;
 };
 
 export default ProtectedAdminRoute;