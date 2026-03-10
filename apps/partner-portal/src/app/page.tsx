import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";

export default function PartnerLogin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Decor - Warmer Gold/Amber Tones for Partners */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-600 blur-[150px]"></div>
        <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] rounded-full bg-orange-700 blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md z-10 border-zinc-800 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl border-t-amber-500/20">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/20 rotate-3">
              <span className="text-white font-black text-2xl tracking-tighter -rotate-3">LS</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-zinc-100">
            Partner Portal
          </CardTitle>
          <CardDescription className="text-zinc-400 text-base">
            Welcome back! Ready to scale your lives?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      
      <div className="mt-12 flex items-center space-x-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 z-10">
        <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Trusted by TikTok Top Creators</span>
      </div>
    </main>
  );
}
