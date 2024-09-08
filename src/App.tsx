import { BrowserRouter } from 'react-router-dom';

import { Router } from '@app/Router';
import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Toaster } from '@views/components/ui/sonner';
import { AuthProvider } from './app/contexts/AuthContext';
import { Appbar } from './views/components/AppBar';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <Appbar />
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
