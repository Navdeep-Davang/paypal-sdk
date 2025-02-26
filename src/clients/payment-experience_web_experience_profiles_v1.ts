// src/clients/payment-experience_web_experience_profiles_v1.ts

import { z } from 'zod';
import { request } from '../utils/request';
import {
    WebProfile,
    WebProfileList,
    PatchRequest,
    PaypalRequestIdParameter,
    IdParameter,
    ErrorType
} from '../types/payment-experience_web_experience_profiles_v1';
import {
    WebProfileSchema,
    WebProfileListSchema,
    PatchRequestSchema,
    PaypalRequestIdParameterSchema,
    IdParameterSchema,
    ErrorSchema
} from '../schema/payment-experience_web_experience_profiles_v1';
import { SDKConfiguration } from '../index';

export class PaymentExperienceWebExperienceProfilesClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create web experience profile
     * Creates a web experience profile. In the JSON request body, specify the profile name and details.
     */
    async createWebExperienceProfile(
        requestBody: WebProfile,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<WebProfile> {
        // Validate request body
        WebProfileSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/payment-experience/web-profiles`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = WebProfileSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }

    /**
     * List web experience profiles
     * Lists the latest 20 web experience profiles for a merchant or subject. To show details for these or additional profiles, you can show web experience profile details by ID.
     */
    async listWebExperienceProfiles(): Promise<WebProfileList> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/payment-experience/web-profiles`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebProfileListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }

    /**
     * Update web experience profile
     * Updates a web experience profile, by ID. In the JSON request body, specify the profile details. If your request omits any profile parameters, any previously set values for those parameters are removed.
     */
    async updateWebExperienceProfile(
        id: IdParameter,
        requestBody: WebProfile
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        WebProfileSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            await request(`${this.baseUrl}/v1/payment-experience/web-profiles/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(requestBody),
            });
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }

    /**
     * Partially update web experience profile
     * Partially-updates a web experience profile, by ID. In the JSON request body, specify a patch object, the path of the profile location to update, and a new value.
     */
    async partialUpdateWebExperienceProfile(
        id: IdParameter,
        requestBody: PatchRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            await request(`${this.baseUrl}/v1/payment-experience/web-profiles/${id}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(requestBody),
            });
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }

    /**
     * Show web experience profile details by ID
     * Shows details for a web experience profile, by ID.
     */
    async getWebExperienceProfile(
        id: IdParameter
    ): Promise<WebProfile> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/payment-experience/web-profiles/${id}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebProfileSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }

    /**
     * Delete web experience profile
     * Deletes a web experience profile, by ID.
     */
    async deleteWebExperienceProfile(
        id: IdParameter
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            await request(`${this.baseUrl}/v1/payment-experience/web-profiles/${id}`, {
                method: 'DELETE',
                headers: headers,
            });
        } catch (error: any) {
            // Handle potential API errors (e.g., 500)
            if (error instanceof z.ZodError) {
                throw error; // Re-throw Zod errors (validation errors)
            }
            try {
                // Attempt to parse the error response from the API
                const errorResponse = ErrorSchema.parse(JSON.parse(error.message));
                throw errorResponse; // Throw the parsed API error
            } catch (parseError: any) {
                // If parsing the API error fails, throw the original error
                throw error;
            }
        }
    }
}