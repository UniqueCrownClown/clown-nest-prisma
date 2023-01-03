declare module '@prisma/client';

declare interface ExpressUser extends Express.User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  isAdmin: boolean;
}
