'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6 py-2">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Endereço de E-mail</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          required
          placeholder="admin@livestyle.com" 
          className="bg-zinc-950/40 border-zinc-800 h-11 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-red-600 focus-visible:border-red-600/50 transition-all"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Senha</Label>
          <a href="#" className="text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors">
            Esqueceu a senha?
          </a>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          required
          placeholder="••••••••" 
          className="bg-zinc-950/40 border-zinc-800 h-11 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-red-600 focus-visible:border-red-600/50 transition-all"
        />
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500 font-bold bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-11 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-lg shadow-[0_0_20px_-5px_rgba(220,38,38,0.4)] transition-all active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? 'Autenticando...' : 'Entrar no Painel'}
      </Button>
    </form>
  );
}