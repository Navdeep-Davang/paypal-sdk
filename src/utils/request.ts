// src/utils/request.ts
import { APIError } from './error';

interface RequestOptions extends RequestInit {
  apiKey?: string; // Add API key option
}

export async function request(url: string, options: RequestOptions = {}): Promise<any> { // Return type any for now
  const baseUrl = "https://api.paypal.com"; // Or read from config
  const fullUrl = `${baseUrl}${url}`;

  try {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json', // Default content type
        ...options.headers as Record<string, string>, // Allow overriding headers
    };

    if (options.apiKey) {
      headers['Authorization'] = `Bearer ${options.apiKey}`; // API Key Authentication
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let message = `API Error: ${response.status} ${response.statusText}`;
      let details: any = null;

      try {
        details = await response.json(); // Try to parse error details from JSON
        message += ` - ${JSON.stringify(details)}`
      } catch (parseError) {
        // Could not parse JSON, just use the basic message
      }

      throw new APIError(message, response.status, details);
    }

    // Attempt to parse JSON, but handle cases where the response is not JSON
    try {
      return await response.json();
    } catch (jsonError) {
      // If it's not JSON, return the raw text (or handle differently)
      return await response.text();
    }

  } catch (error: any) {
    if (error instanceof APIError) {
      throw error; // Re-throw API errors
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}