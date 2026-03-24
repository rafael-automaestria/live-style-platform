import Image from "next/image";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050507] p-4 relative overflow-hidden">
      {/* Sophisticated Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-amber-500/20 to-blue-400/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <Image
              src="/logo.png"
              alt="Live Style Agency"
              width={120}
              height={120}
              className="relative rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl uppercase italic italic-none">
              Hub do <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Parceiro</span>
            </h1>
            <p className="text-zinc-400 text-lg font-medium tracking-wide">
              Eleve seu conteúdo. Dimensione sua influência.
            </p>
          </div>
        </div>

        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-3xl shadow-2xl border-t-blue-500/10 rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-400"></div>
          <CardHeader className="pt-8 pb-2">
            <CardDescription className="text-zinc-500 text-center font-medium">
              Bem-vindo de volta, Criador. Insira suas credenciais para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <LoginForm />
          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center space-y-6 pt-4 opacity-50">
          <div className="flex items-center space-x-2">
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Confiado pelos Melhores Criadores</span>
            <div className="h-px w-8 bg-zinc-800"></div>
          </div>
          <p className="text-xs text-zinc-600 font-medium">
            © 2026 Live Style Platform. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
