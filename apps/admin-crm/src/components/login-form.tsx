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
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          required
          placeholder="admin@livestyle.com" 
          className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-zinc-300">Password</Label>
          <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">
            Forgot password?
          </a>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          required
          placeholder="••••••••" 
          className="bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-blue-500"
        />
      </div>
      
      {errorMessage && (
        <div className="text-sm text-red-500 font-medium">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}