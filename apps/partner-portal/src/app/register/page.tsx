import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PartnerRegister() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050507] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-red-600/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-red-600 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <Image
              src="/logo.png"
              alt="Live Style Agency"
              width={80}
              height={80}
              className="relative rounded-full"
            />
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
              Junte-se à <span className="text-blue-500">Elite</span>
            </h1>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
              Parceria de Criadores Live Style
            </p>
          </div>
        </div>

        <Card className="border-zinc-800/50 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-red-600 to-amber-500"></div>
          <CardHeader className="pt-8 pb-2">
            <CardDescription className="text-zinc-500 text-center font-bold text-xs uppercase tracking-widest">
              Solicitação de Parceria
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider ml-1">Nome Completo</Label>
                  <Input placeholder="Seu nome completo" className="h-12 bg-zinc-950/60 border-zinc-800 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider ml-1">Usuário do TikTok</Label>
                  <Input placeholder="@seu_usuario" className="h-12 bg-zinc-950/60 border-zinc-800 rounded-xl text-blue-400 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider ml-1">Endereço de E-mail</Label>
                  <Input type="email" placeholder="nome@exemplo.com" className="h-12 bg-zinc-950/60 border-zinc-800 rounded-xl" />
                </div>
             </div>

             <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm rounded-2xl shadow-xl transition-all">
                ENVIAR SOLICITAÇÃO DE PARCERIA
             </Button>

             <div className="text-center">
                <p className="text-zinc-500 text-xs font-bold">
                  JÁ É UM PARCEIRO? <Link href="/" className="text-white hover:text-blue-400 underline underline-offset-4 decoration-blue-500/50">ENTRE AQUI</Link>
                </p>
             </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] pt-4">
          © 2026 Live Style Platform. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
