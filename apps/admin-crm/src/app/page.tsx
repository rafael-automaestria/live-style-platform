import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";

export default function AdminLogin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px]"></div>
        <div className="absolute top-[60%] right-[0%] w-[40%] h-[40%] rounded-full bg-violet-600 blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md z-10 border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl tracking-tighter">LS</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to manage the Live Style Agency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-zinc-500 z-10">
        © 2026 Live Style Platform. All rights reserved.
      </p>
    </main>
  );
}
