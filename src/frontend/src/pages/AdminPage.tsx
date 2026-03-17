import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Loader2, LogIn, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (!actor || isFetching || !isAuthenticated) {
      setIsAdmin(null);
      return;
    }
    setCheckingAdmin(true);
    actor
      .isCallerAdmin()
      .then((result) => setIsAdmin(result))
      .catch(() => setIsAdmin(false))
      .finally(() => setCheckingAdmin(false));
  }, [actor, isFetching, isAuthenticated]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setIsAdmin(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/assets/generated/dynamic-painters-logo-transparent.dim_400x200.png"
              alt="Dynamic Painters"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="font-display font-semibold text-lg">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <span className="text-sm text-white/70 hidden sm:block">
              {identity?.getPrincipal().toString().slice(0, 16)}...
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={isAuthenticated ? handleLogout : handleLogin}
            disabled={isLoggingIn}
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isLoggingIn
              ? "Logging in..."
              : isAuthenticated
                ? "Logout"
                : "Login"}
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
            data-ocid="admin.panel"
          >
            <LogIn className="w-16 h-16 text-brand-navy mx-auto opacity-60" />
            <div className="text-center">
              <h1 className="text-3xl font-display font-bold text-brand-navy mb-2">
                Admin Access
              </h1>
              <p className="text-muted-foreground mb-6">
                Please log in with Internet Identity to access the admin panel.
              </p>
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3"
                data-ocid="admin.open_modal_button"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
              </Button>
            </div>
          </div>
        ) : checkingAdmin || isFetching ? (
          <div
            className="flex items-center justify-center min-h-[60vh]"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-brand-navy" />
            <span className="ml-3 text-muted-foreground">
              Verifying admin access...
            </span>
          </div>
        ) : isAdmin === false ? (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
            data-ocid="admin.error_state"
          >
            <ShieldAlert className="w-16 h-16 text-destructive" />
            <h2 className="text-2xl font-display font-bold">Access Denied</h2>
            <p className="text-muted-foreground text-center max-w-md">
              You don&apos;t have admin privileges. Contact the owner at{" "}
              <a href="tel:9716089123" className="text-brand-green font-medium">
                9716089123
              </a>
              .
            </p>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : isAdmin ? (
          <AdminDashboard />
        ) : null}
      </div>
    </div>
  );
}
