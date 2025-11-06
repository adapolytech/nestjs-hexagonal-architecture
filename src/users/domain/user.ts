import { Email } from './value-objects/email';

export class User {
  constructor(
    public id: string,
    public name: string,
    private password: string,
    public email: Email,
    public emailVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
