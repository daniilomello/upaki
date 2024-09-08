
import { AuthService } from '@/app/services/AuthService';
import { Logo } from '@/views/components/logo';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IFormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate();
  console.log('SignUp renderizou');

  const form = useForm<IFormData>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async ({ name, lastname, email, password }) => {
    try {
      const response = await AuthService.signUp({ name, lastname, email, password });

      navigate('/confirm');

      console.log(response);
    } catch {
      toast.error('Erro ao criar conta, tente mais tarde!');
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <div className="w-full flex justify-center items-center mb-[60px]">
        <Logo className='invert dark:invert-0' />
      </div>
      <h1 className="font-semibold text-xl">Cadastre-se!</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...form.register('name')} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastname">Sobrenome</Label>
          <Input id="lastname" {...form.register('lastname')} />
        </div>

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
          {form.formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <p>Possui uma conta? <Link to={'/signin'} className='underline'>Faça o login</Link></p>
      </form>
    </div>
  );
}
