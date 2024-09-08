
import { AuthService } from '@/app/services/AuthService';
import { Logo } from '@/views/components/logo';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IFormData {
  email: string;
  code: string;
}

export function Confirm() {
  const navigate = useNavigate();
  console.log('SignUp renderizou');

  const form = useForm<IFormData>({
    defaultValues: {
      email: '',
      code: '',
    },
  });

  const handleSubmit = form.handleSubmit(async ({ email, code }) => {
    try {
      const response = await AuthService.confirm({ email, code });
      toast.error('Conta confirmada! Faça o login');

      navigate('/signin');

      console.log(response);
    } catch {
      toast.error('Erro ao confirmar conta, contate o suporte!');
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <div className="w-full flex justify-center items-center mb-[60px]">
        <Logo className='invert dark:invert-0' />
      </div>
      <h1 className="font-semibold text-xl">Confirme sua conta</h1>

      <div className='my-10'>
        <p>
          Enviando um código de confirmação de conta para o seu email. Verifique na sua caixa entrada ou spam. Após, digite o seu email e o código enviado para finalizar o seu cadastrado
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register('email')} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmCode">Código</Label>
          <Input id="confirmCode" {...form.register('code')} />
        </div>

        <Button className="mt-3" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2Icon className="size-6 animate-spin mr-2" />}
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}
