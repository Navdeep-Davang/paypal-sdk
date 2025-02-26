// src/clients/vault_payment_tokens_v3.ts

import { request } from '../utils/request';
import {
    PaymentTokenResponse,
    CustomerVaultPaymentTokensResponse,
    SetupTokenResponse,
    PaymentTokenRequest,
    SetupTokenRequest,
    PayPalRequestIdParameter,
    CustomerIdParameter,
    PageSizeParameter,
    PageParameter,
    TotalRequiredParameter,
    IdParameter,
    Error,
} from '../types/vault_payment_tokens_v3';
import {
    PaymentTokenResponseSchema,
    CustomerVaultPaymentTokensResponseSchema,
    SetupTokenResponseSchema,
    PaymentTokenRequestSchema,
    SetupTokenRequestSchema,
    PayPalRequestIdParameterSchema,
    CustomerIdParameterSchema,
    PageSizeParameterSchema,
    PageParameterSchema,
    TotalRequiredParameterSchema,
    IdParameterSchema,
    ErrorSchema,
} from '../schema/vault_payment_tokens_v3';
import { SDKConfiguration } from '../index';

export class VaultPaymentTokensClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create payment token for a given payment source
     * Creates a Payment Token from the given payment source and adds it to the Vault of the associated customer.
     */
    async createPaymentToken(
        requestBody: PaymentTokenRequest,
        params: {
            paypalRequestId?: PayPalRequestIdParameter;
        } = {}
    ): Promise<PaymentTokenResponse> {
        // Validate request body
        PaymentTokenRequestSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PayPalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v3/vault/payment-tokens`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PaymentTokenResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List all payment tokens
     * Returns all payment tokens for a customer.
     */
    async listPaymentTokens(
        params: {
            customerId: CustomerIdParameter;
            pageSize?: PageSizeParameter;
            page?: PageParameter;
            totalRequired?: TotalRequiredParameter;
        }
    ): Promise<CustomerVaultPaymentTokensResponse> {
        // Validate parameters
        CustomerIdParameterSchema.parse(params.customerId);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);

        const queryParams = new URLSearchParams();
        queryParams.append('customer_id', params.customerId);
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.page) queryParams.append('page', String(params.page));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v3/vault/payment-tokens?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = CustomerVaultPaymentTokensResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Retrieve a payment token
     * Returns a readable representation of vaulted payment source associated with the payment token id.
     */
    async getPaymentToken(
        id: IdParameter
    ): Promise<PaymentTokenResponse> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v3/vault/payment-tokens/${id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PaymentTokenResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete payment token
     * Delete the payment token associated with the payment token id.
     */
    async deletePaymentToken(
        id: IdParameter
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v3/vault/payment-tokens/${id}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Create a setup token
     * Creates a Setup Token from the given payment source and adds it to the Vault of the associated customer.
     */
    async createSetupToken(
        requestBody: SetupTokenRequest,
        params: {
            paypalRequestId?: PayPalRequestIdParameter;
        } = {}
    ): Promise<SetupTokenResponse> {
        // Validate request body
        SetupTokenRequestSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PayPalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v3/vault/setup-tokens`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SetupTokenResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Retrieve a setup token
     * Returns a readable representation of temporarily vaulted payment source associated with the setup token id.
     */
    async getSetupToken(
        id: IdParameter
    ): Promise<SetupTokenResponse> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v3/vault/setup-tokens/${id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = SetupTokenResponseSchema.parse(await response.json());
        return parsedResponse;
    }
}