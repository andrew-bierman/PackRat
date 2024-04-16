import { UserRole } from './types';

export interface User {
  createdAt: string;
  email: string;
  favorites: any[];
  id: string;
  name: string;
  profileImage: string;
  role: UserRole;
  token: string;
  updatedAt: string;
  username: string;
  id: string;
}
