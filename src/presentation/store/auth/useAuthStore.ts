import { create } from 'zustand';
import { authCheckStatus, authLogin, authLogout } from '../../../actions/auth/auth';
import { StorageAdapter } from '../../../config/adatpers/storage-adapter';

import type { User } from '../../../domain/entities/user.entity';
import type { AuthStatus } from '../../../infraestructure/interfaces/auth.status';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(set => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email, password) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }
    // TODO: Save the token in the storage
    await StorageAdapter.setItem('token', resp.token);

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },
  logout: async () => {
    await authLogout();
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
