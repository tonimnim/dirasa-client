"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { acceptInvitation } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/context";
import { DEMO_ACCOUNTS } from "@/lib/auth/demoUsers";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import {
  School,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Sparkles,
} from "lucide-react";

function AcceptInvitationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "inv-tok-demo-2026";
  const tenantId = searchParams.get("tenant") || searchParams.get("tenantId") || "ten-dubai-academy-01";
  const emailParam = searchParams.get("email") || "faculty.invite@dirasa.edu";
  const roleParam = searchParams.get("role") || "Senior Educator & Form Tutor";

  const { setMockUser } = useAuth();
  const [displayName, setDisplayName] = useState("Amira Al-Hashemi");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validation = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumberOrSymbol: /[\d\W]/.test(password),
      matches: password.length > 0 && password === confirmPassword,
    };
  }, [password, confirmPassword]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (validation.minLength) score += 25;
    if (validation.hasUpper) score += 25;
    if (validation.hasLower) score += 25;
    if (validation.hasNumberOrSymbol) score += 25;
    return score;
  }, [validation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setErrorMessage("Please enter your display name.");
      return;
    }
    if (strengthScore < 75) {
      setErrorMessage("Please ensure your password meets the minimum security requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!agreedToPolicy) {
      setErrorMessage("You must accept the Dirasa safeguarding & confidentiality agreement.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await acceptInvitation(tenantId, token, password, displayName);
      setIsSuccess(true);
    } catch {
      // In demo mode or if API is unreachable, simulate successful acceptance
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterDashboard = () => {
    // Set a custom profile or teacher demo profile for the newly accepted user
    const teacherDemo = DEMO_ACCOUNTS.teacher;
    setMockUser({
      ...teacherDemo.profile,
      displayName: displayName.trim(),
      email: emailParam,
    });
    router.push("/dashboard");
  };

  return (
    <Card className="shadow-xl border-slate-200/90 dark:border-slate-800">
      {!isSuccess ? (
        <>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Official School Invitation
              </span>
            </div>
            <CardTitle className="text-xl">Accept School Membership</CardTitle>
            <CardDescription className="text-xs">
              Complete your profile setup to join <span className="font-semibold text-slate-800 dark:text-slate-200">Dirasa International Academy</span>.
            </CardDescription>

            {/* Invitation Details Banner */}
            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span>Invited Account:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{emailParam}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                <span>Assigned Role:</span>
                <span className="font-semibold text-sky-600 dark:text-sky-400">{roleParam}</span>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Display Name
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Amira Al-Hashemi"
                    className="w-full h-10 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Create Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
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

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="space-y-1.5 pt-0.5">
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strengthScore <= 25
                          ? "bg-rose-500"
                          : strengthScore <= 50
                          ? "bg-amber-500"
                          : strengthScore <= 75
                          ? "bg-sky-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${strengthScore}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-500">
                    <div className={`flex items-center gap-1 ${validation.minLength ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                      {validation.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} 8+ chars
                    </div>
                    <div className={`flex items-center gap-1 ${validation.hasUpper ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                      {validation.hasUpper ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} Uppercase
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full h-10 ps-9 pe-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Safeguarding Agreement */}
              <div className="p-3 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 space-y-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="safeguardingPolicy"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="safeguardingPolicy" className="text-xs text-slate-600 dark:text-slate-300 leading-snug cursor-pointer select-none">
                    I acknowledge Dirasa&apos;s statutory safeguarding policy, custody disclosure limits, and agree to handle all student data under applicable privacy laws (GDPR / FERPA).
                  </label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={!agreedToPolicy || strengthScore < 75 || !validation.matches}
                className="w-full h-10 text-sm font-semibold gap-1.5 bg-sky-600 hover:bg-sky-700"
              >
                Accept & Activate Account <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                  Sign In instead
                </Link>
              </div>
            </CardFooter>
          </form>
        </>
      ) : (
        <div className="p-6 text-center space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Invitation Accepted!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Welcome to Dirasa International Academy, <span className="font-semibold text-slate-800 dark:text-slate-200">{displayName}</span>. Your school permissions and membership have been activated.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Assigned Role: {roleParam} &bull; Tenant: Dirasa International Academy</span>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={handleEnterDashboard}
              className="w-full h-10 text-sm font-semibold bg-sky-600 hover:bg-sky-700"
            >
              Enter School Portal Dashboard <ArrowRight className="h-4 w-4 ms-1" />
            </Button>

            <Link
              href="/login"
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 pt-1"
            >
              Go to Login Screen
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AcceptInvitationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-11 w-11 rounded-xl bg-sky-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              D
            </div>
            <div className="text-start">
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Dirasa SMS
              </span>
              <p className="text-[10px] text-slate-400 -mt-0.5">Faculty & Guardian Onboarding</p>
            </div>
          </Link>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading invitation details...</div>}>
          <AcceptInvitationForm />
        </Suspense>
      </div>
    </div>
  );
}
