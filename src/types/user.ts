// export enum UserRole {
//   USER = 'USER',
//   ADMIN = 'ADMIN',
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   password: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface AuthenticatedUser {
//   id: string;
//   email: string;
//   role: UserRole;
// }

import { Role } from '@prisma/client';

export { Role as UserRole };

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}