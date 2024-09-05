import { BrowserRouter } from 'react-router-dom';

import { Router } from '@app/Router';
import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Toaster } from '@views/components/ui/sonner';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}
