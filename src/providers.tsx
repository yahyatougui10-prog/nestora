import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { CompareProvider } from '@/context/CompareContext';
import { ToastContainer } from '@/components/ui/Toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CompareProvider>
            {children}
            <ToastContainer />
          </CompareProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
