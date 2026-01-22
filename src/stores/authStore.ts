import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (admin: Admin, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,

      setAuth: (admin, token) => {
        localStorage.setItem('admin_token', token);
        set({ admin, token, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('admin_token');
        set({ admin: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ admin: state.admin, token: state.token }),
    }
  )
);
