'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">E-mail do Parceiro</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          required
          placeholder="nome@exemplo.com" 
          className="h-13 bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-blue-500 rounded-2xl transition-all border-white/5"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between ml-1">
          <Label htmlFor="password" className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em]">Chave de Acesso</Label>
          <a href="#" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Esqueceu a Chave?
          </a>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          required
          placeholder="••••••••" 
          className="h-13 bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-blue-500 rounded-2xl transition-all border-white/5"
        />
      </div>
      <div className="flex items-center space-x-3 ml-1">
        <Checkbox id="remember" className="h-5 w-5 border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-lg" />
        <label
          htmlFor="remember"
          className="text-xs font-semibold leading-none text-zinc-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Lembrar minha sessão
        </label>
      </div>

      {errorMessage && (
        <div className="text-xs text-red-400 font-bold bg-red-400/10 border border-red-400/20 rounded-xl p-3 text-center">
          {errorMessage}
        </div>
      )}

      <div className="pt-4 flex flex-col space-y-6">
        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-base shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] rounded-2xl transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
        >
          {isPending ? 'Verificando Identidade...' : 'Acessar Dashboard de Parceiro'}
        </Button>
        <div className="text-center w-full">
          <p className="text-zinc-600 text-xs font-bold tracking-tight">
            AINDA NÃO É PARCEIRO? <a href="/register" className="text-blue-400 hover:text-amber-400 transition-colors">JUNTE-SE À AGÊNCIA →</a>
          </p>
        </div>
      </div>
    </form>
  );
}
