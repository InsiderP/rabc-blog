import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (requireAdmin && user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, requireAdmin, user, router]);

  if (!isAuthenticated || (requireAdmin && user?.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
} 