import { api } from '../lib/api';

export interface User {
  id: string;
  registrationCode: string;
  fullName: string;
  registrationNumber: string;
  email: string;
  phone: string;
  yearOfStudy: 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR';
  branch: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  codechefHandle?: string;
  leetcodeHandle?: string;
  codeforcesHandle?: string;
  transactionId: string;
  screenshotUrl: string;
  paymentStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationData {
  fullName: string;
  registrationNumber: string;
  email: string;
  phone: string;
  yearOfStudy: string;
  branch: string;
  gender: string;
  codechefHandle?: string;
  leetcodeHandle?: string;
  codeforcesHandle?: string;
  transactionId: string;
  screenshotUrl: string;
}

export interface CloudinarySignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
}

export const registrationApi = {
  getUploadSignature: async (): Promise<CloudinarySignature> => {
    const response = await api.get<CloudinarySignature>('/registration/upload-signature');
    return response.data!;
  },

  register: async (data: RegistrationData): Promise<User> => {
    const response = await api.post<User>('/registration', data);
    return response.data!;
  },
};
