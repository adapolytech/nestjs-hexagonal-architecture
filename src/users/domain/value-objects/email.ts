import { BadRequestException } from '@nestjs/common';

export class Email {
  private readonly value: string;
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static readonly MAX_LENGTH = 254;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Email {
    const normalized = email?.trim().toLowerCase();

    if (!normalized) {
      throw new BadRequestException('Email cannot be empty');
    }

    if (normalized.length > this.MAX_LENGTH) {
      throw new BadRequestException(
        `Email cannot exceed ${this.MAX_LENGTH} characters`,
      );
    }

    if (!this.EMAIL_REGEX.test(normalized)) {
      throw new BadRequestException('Invalid email format');
    }

    return new Email(normalized);
  }

  getValue() {
    return this.value;
  }
}
