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
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300 ml-1">Partner Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          required
          placeholder="name@example.com" 
          className="h-12 bg-zinc-950/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between ml-1">
          <Label htmlFor="password" className="text-zinc-300">Access Key</Label>
          <a href="#" className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors">
            Need help?
          </a>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          required
          placeholder="••••••••" 
          className="h-12 bg-zinc-950/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500 rounded-xl"
        />
      </div>
      <div className="flex items-center space-x-2 ml-1">
        <Checkbox id="remember" className="border-zinc-700 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500" />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Remember my session
        </label>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500 font-medium ml-1">
          {errorMessage}
        </div>
      )}

      <div className="pt-2 flex flex-col space-y-4">
        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-lg shadow-xl shadow-amber-500/10 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isPending ? 'Verifying...' : 'Enter Training Area'}
        </Button>
        <div className="text-center w-full">
          <p className="text-zinc-500 text-sm">
            Not a partner yet? <a href="#" className="text-amber-500 font-bold hover:underline">Apply here</a>
          </p>
        </div>
      </div>
    </form>
  );
}
