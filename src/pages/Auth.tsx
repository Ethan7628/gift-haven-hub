import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logoLight from "@/assets/logo-light.jpeg";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(100);
const nameSchema = z.string().trim().min(1, "Full name is required").max(100);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const validate = () => {
    const errs: Record<string, string> = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) errs.email = emailResult.error.errors[0].message;

    const pwResult = passwordSchema.safeParse(password);
    if (!pwResult.success) errs.password = pwResult.error.errors[0].message;

    if (!isLogin) {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) errs.fullName = nameResult.error.errors[0].message;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({ title: "Login failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ title: "Email not verified", description: "Please check your email and click the confirmation link.", variant: "destructive" });
          } else {
            toast({ title: "Login failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Welcome back!", description: "You have been logged in successfully." });
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { full_name: fullName },
          },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: "Account exists", description: "This email is already registered. Please log in instead.", variant: "destructive" });
          } else {
            toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account before logging in.",
          });
          setIsLogin(true);
        }
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logoLight} alt="Christian Gift Shop" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground font-body mt-2">
              {isLogin
                ? "Sign in to continue shopping"
                : "Join us to start your gift journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="font-body text-sm">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1.5"
                />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="font-body text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1.5"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="font-body text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="mt-1.5"
              />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground font-body">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
