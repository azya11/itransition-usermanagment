import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string; rememberMe: boolean }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 pb-8">
            <div className="text-primary text-2xl font-bold tracking-wider mb-6">
              THE APP
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Start your journey</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In to The App
              </h1>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                Sign In
              </Button>
            </form>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
                <button className="text-primary hover:underline">Sign up</button>
              </span>
              <button className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Gradient Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/80 via-purple-400/80 to-blue-500/80"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};