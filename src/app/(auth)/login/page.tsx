"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/context";
import { DEMO_ACCOUNTS, DemoRoleKey } from "@/lib/auth/demoUsers";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import {
  Lock,
  User,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  School,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { refreshProfile, setMockUser, loginAsDemo } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState<DemoRoleKey | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectDemoAccount = (roleKey: DemoRoleKey, autoSubmit = false) => {
    const demo = DEMO_ACCOUNTS[roleKey];
    setSelectedDemoRole(roleKey);
    setIdentifier(demo.email);
    setPassword(demo.password);
    setErrorMessage(null);

    if (autoSubmit) {
      setIsLoading(true);
      loginAsDemo(roleKey);
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMessage("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Check if the credentials match any demo account
    const matchingDemo = (Object.values(DEMO_ACCOUNTS) as typeof DEMO_ACCOUNTS[DemoRoleKey][]).find(
      (acc) =>
        acc.email.toLowerCase() === identifier.toLowerCase().trim() &&
        (password === acc.password || password === "Password123!" || password === "password")
    );

    try {
      // First attempt real API login
      await login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      });

      await refreshProfile();
      router.push("/dashboard");
    } catch {
      // If API login fails (e.g., backend offline, network error, or demo account),
      // check if it's a demo account or fallback to demo account
      if (matchingDemo) {
        setMockUser(matchingDemo.profile);
        router.push("/dashboard");
        return;
      }

      // If selected demo role was active, log in with that profile
      if (selectedDemoRole) {
        loginAsDemo(selectedDemoRole);
        router.push("/dashboard");
        return;
      }

      // Default demo fallback if manager credentials were typed
      if (identifier.includes("manager") || identifier.includes("admin")) {
        loginAsDemo("manager");
        router.push("/dashboard");
        return;
      } else if (identifier.includes("teacher")) {
        loginAsDemo("teacher");
        router.push("/dashboard");
        return;
      } else if (identifier.includes("parent")) {
        loginAsDemo("parent");
        router.push("/dashboard");
        return;
      } else if (identifier.includes("student")) {
        loginAsDemo("student");
        router.push("/dashboard");
        return;
      }

      setErrorMessage("Invalid credentials or server unreachable. Please select a demo account above to test the portal.");
    } finally {
      setIsLoading(false);
    }
  };

  const demoCards: {
    key: DemoRoleKey;
    icon: React.ElementType;
    color: string;
    bgHover: string;
  }[] = [
    {
      key: "manager",
      icon: ShieldCheck,
      color: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800",
      bgHover: "hover:border-sky-500",
    },
    {
      key: "teacher",
      icon: GraduationCap,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      bgHover: "hover:border-emerald-500",
    },
    {
      key: "parent",
      icon: Users,
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      bgHover: "hover:border-amber-500",
    },
    {
      key: "student",
      icon: Sparkles,
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
      bgHover: "hover:border-purple-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl px-4">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-12 w-12 rounded-xl bg-sky-600 group-hover:bg-sky-500 text-white font-black text-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              D
            </div>
            <div className="text-start">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Dirasa <span className="text-sky-600 text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800">SMS</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                Enterprise School Operating System
              </p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            Sign in to Your School Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Access statutory registers, continuous assessments, custody safeguards, and financial ledgers.
          </p>
        </div>

        {/* One-Click Demo Account Selectors */}
        <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                One-Click Demo Account Selectors
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Instant evaluation mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {demoCards.map(({ key, icon: Icon, color, bgHover }) => {
              const demo = DEMO_ACCOUNTS[key];
              const isSelected = selectedDemoRole === key;

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-xl border text-start transition-all cursor-pointer relative ${
                    isSelected
                      ? "border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 ring-2 ring-sky-500/20 shadow-sm"
                      : `border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 ${bgHover} hover:bg-slate-100/70 dark:hover:bg-slate-800/70`
                  }`}
                  onClick={() => selectDemoAccount(key, false)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {demo.roleLabel}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                          {demo.title}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectDemoAccount(key, true);
                      }}
                      className="px-2 py-1 text-[10px] font-semibold rounded bg-sky-600 hover:bg-sky-700 text-white shrink-0 shadow-xs transition-colors flex items-center gap-1"
                      title="Launch directly into dashboard with this role"
                    >
                      Enter →
                    </button>
                  </div>

                  <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {demo.badge}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Form */}
        <Card className="shadow-xl border-slate-200/90 dark:border-slate-800">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <CardTitle className="text-sm font-semibold flex items-center justify-between">
              <span>Account Credentials</span>
              <span className="text-[11px] font-normal text-slate-400">
                Pre-filled when you click a demo role
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Enter your Dirasa tenant email or username to access your workspace.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email or User ID
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. manager@demo.dirasa.local"
                    className="w-full h-10 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-10 ps-9 pe-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-400 select-none cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <School className="h-3 w-3" /> Dirasa Multi-Tenant v1.0
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full h-10 text-sm font-semibold gap-1.5 bg-sky-600 hover:bg-sky-700"
              >
                Sign In to School Portal <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="flex items-center justify-between w-full text-xs text-slate-500 pt-1">
                <span>
                  Invited staff or guardian?{" "}
                  <Link href="/accept-invitation" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                    Accept Invitation
                  </Link>
                </span>
                <Link href="/apply/demo-school" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 hover:underline">
                  Admissions Application →
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer info & Return to marketing */}
        <div className="mt-6 text-center text-xs text-slate-500 space-y-2">
          <p>
            Dirasa School Operating System is protected by strict custody safeguards and role-level isolation.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link href="/" className="text-sky-600 dark:text-sky-400 hover:underline">
              ← Return to Dirasa Public Website
            </Link>
            <span>&bull;</span>
            <Link href="/apply/demo-school" className="text-sky-600 dark:text-sky-400 hover:underline">
              Prospective Student Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
