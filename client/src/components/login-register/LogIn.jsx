"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/_features/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user) {
        dispatch(
          setUser({
            name: session.user.name || session.user.email?.split("@")[0] || "User",
            email: session.user.email || "",
          })
        );
        router.push("/");
      }
    };
    checkSession();
  }, [dispatch, router]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const logIn = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Both email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again!");
      } else {
        const session = await getSession();
        if (session?.user) {
          dispatch(
            setUser({
              name: session.user.name || session.user.email?.split("@")[0] || "User",
              email: session.user.email || "",
            })
          );
        }
        toast.success("Successfully logged in");
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again!");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        toast.error("Google login failed. Please try again!");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again!");
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleGitHubLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await signIn("github", {
  //       callbackUrl: "/dashboard",
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       toast.error("GitHub login failed. Please try again!");
  //     }
  //   } catch (error) {
  //     toast.error("GitHub login failed. Please try again!");
  //     console.error("GitHub login error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              logIn(formData);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="Enter your email" required disabled={loading} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <>
                      <GrFormViewHide className="w-4 h-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <BiShowAlt className="w-4 h-4 mr-1" />
                      Show
                    </>
                  )}
                </Button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {/* Google SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 262" className="mr-2">
                <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/>
                <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/>
                <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/>
                <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
              </svg>
              Google
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              className="bg-transparent"
              onClick={handleGitHubLogin}
              disabled={loading}
            > */}
              {/* GitHub SVG */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-2">
                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12..."/>
              </svg> */}
              {/* GitHub */}
            {/* </Button> */}
          </div>

          <div className="flex flex-col space-y-2 text-center text-sm">
            <Link href="/register" className="text-primary hover:underline">
              Don't have an account? Create one
            </Link>
            <Link href="/forgot-password" className="text-muted-foreground hover:text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
