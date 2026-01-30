import { api } from '../lib/api';
import type { User } from './registration';

// Types
export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

export interface DashboardStats {
  totalParticipants: number;
  verifiedPayments: number;
  pendingPayments: number;
  rejectedPayments: number;
  branchDistribution: Record<string, number>;
  yearDistribution: Record<string, number>;
  recentRegistrations: Array<{
    id: string;
    registrationCode: string;
    fullName: string;
    branch: string;
    yearOfStudy: string;
    paymentStatus: string;
    createdAt: string;
  }>;
}

export interface OutboxEntry {
  id: string;
  type: string;
  status: 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED';
  attempts: number;
  payload: {
    fullName: string;
    email: string;
    registrationCode: string;
    userId: string;
    phone?: string;
    registrationNumber?: string;
    branch?: string;
    yearOfStudy?: string;
  };
  createdAt: string;
  nextRetryAt?: string | null;
  lastError?: string | null;
  processedAt?: string | null;
}

export interface SendResult {
  success: string[];
  failed: { id: string; error: string }[];
}

export interface UsersFilters {
  paymentStatus?: string;
  branch?: string;
  yearOfStudy?: string;
  search?: string;
} 

// Admin API
export const adminApi = {
  login: async (data: AdminLoginData): Promise<AdminLoginResponse> => {
    const response = await api.post<AdminLoginResponse>('/admin/login', data);
    if (response.data?.token) {
      localStorage.setItem('admin_token', response.data.token);
    }
    return response.data!;
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  },


  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/admin/dashboard/stats');
    return response.data!;
  },

  getUsers: async (filters?: UsersFilters): Promise<User[]> => {
    const params = new URLSearchParams();
    if (filters?.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
    if (filters?.branch) params.append('branch', filters.branch);
    if (filters?.yearOfStudy) params.append('yearOfStudy', filters.yearOfStudy);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = `/admin/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<User[]>(url);
    return response.data!;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/admin/users/${id}`);
    return response.data!;
  },

  updatePaymentStatus: async (
    userId: string,
    status: 'PENDING' | 'VERIFIED' | 'REJECTED'
  ): Promise<User> => {
    const response = await api.patch<User>(`/admin/users/${userId}/payment-status`, { status });
    return response.data!;
  },

  getOutbox: async (status?: 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED'): Promise<OutboxEntry[]> => {
    const url = status ? `/admin/outbox?status=${status}` : '/admin/outbox';
    const response = await api.get<OutboxEntry[]>(url);
    return response.data!;
  },

  sendOutbox: async (outboxIds: string[]): Promise<SendResult> => {
    const response = await api.post<SendResult>('/admin/outbox/send', { outboxIds });
    return response.data!;
  },
};
