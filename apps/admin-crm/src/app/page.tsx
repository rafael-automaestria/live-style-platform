import Image from "next/image";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0c] p-4 relative overflow-hidden">
      {/* Dynamic Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-red-900/20 blur-[120px] animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <Image
              src="/logo.png"
              alt="Live Style Agency"
              width={100}
              height={100}
              className="relative rounded-full shadow-2xl"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Portal Administrativo
            </h1>
            <p className="text-zinc-400 text-lg font-medium">
              Gerencie sua agência com estilo
            </p>
          </div>
        </div>

        <Card className="border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border-t-white/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-zinc-500 text-center">
              Entre para acessar seu painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center space-y-4 pt-4">
          <p className="text-sm text-zinc-500">
            © 2026 Live Style Platform. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
