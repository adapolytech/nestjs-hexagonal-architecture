export class RegisterDto {
  email: string;
  password: string;
  name: string;
}

export class VerificationEmailDto {
  token: string;
}
