// src/utils/error.ts

export class PayPalAPIError extends Error {
  status: number;
  body: any;

  constructor(status: number, body: any, message?: string) {
    super(message ?? `PayPal API Error: ${status}`); // Default message if not provided
    this.status = status;
    this.body = body;
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      body: this.body,
    };
  }
}

  
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}