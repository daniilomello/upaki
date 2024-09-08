import { Logo } from '@/views/components/logo';
import { useAuth } from '@app/hooks/useAuth';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface IFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();

  const form = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await signIn(email, password);
    } catch {
      toast.error('Credenciais inválidas!');
    } finally {
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <div className="w-full flex justify-center items-center mb-[60px]">
        <Logo className='invert dark:invert-0' />
      </div>

      <h1 className="font-semibold text-xl">Acesse sua conta</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register('email')} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register('password')} />
        </div>

        <Button className="mt-3" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2Icon className="size-6 animate-spin mr-2" />}
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <p>Não possui uma conta? <Link to={'/signup'} className='underline'>Cadastre-se</Link></p>
      </form>
    </div>
  );
}
