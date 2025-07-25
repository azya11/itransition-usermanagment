import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-6">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="pb-4">
          <div className="text-primary text-3xl font-bold tracking-wider mb-2">
            THE APP
          </div>
          <CardTitle className="text-2xl">User Management System</CardTitle>
          <p className="text-muted-foreground">
            Professional user management and administration platform
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => navigate("/login")} 
            className="w-full h-12 text-base"
            size="lg"
          >
            Sign In to Dashboard
          </Button>
          <div className="text-sm text-muted-foreground">
            Professional, secure, and intuitive user management
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
