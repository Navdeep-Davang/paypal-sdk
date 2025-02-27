// src/utils/request.ts

import { PayPalAPIError } from './error';

interface RequestOptions extends RequestInit {
  apiKey?: string; // Add API key option
}

export async function request(url: string, options: RequestOptions): Promise<any> {

  try {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json', // Default content type
        ...options.headers as Record<string, string>, // Allow overriding headers
    };

    if (options.apiKey) {
      headers['Authorization'] = `Bearer ${options.apiKey}`; // API Key Authentication
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let body: any;
      let message = `PayPal API Error: ${response.status} ${response.statusText}`;

      try {
        body = await response.json(); // Try to parse error response
        if (body?.message) {
          message = body.message; // Use PayPal-provided error message if available
        }
      } catch {
        body = await response.text(); // Fallback to text if JSON parsing fails
      }

      throw new PayPalAPIError(response.status, body, message);
    }

  } catch (error: any) {
    if (error instanceof PayPalAPIError) {
      throw error; 
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}