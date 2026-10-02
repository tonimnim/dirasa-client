"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { nextPathFromLocation } from "@/lib/auth/routes";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useAuth();

  // Signed in here, restored on load, or signed in from another tab: continue to the page that sent us here.
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPathFromLocation());
    }
  }, [status, router]);

  return (
    <AuthShell title="Welcome back" description="Sign in to your Dirasa account.">
      <LoginForm />
    </AuthShell>
  );
}
