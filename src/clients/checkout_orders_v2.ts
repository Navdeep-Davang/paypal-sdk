// src/clients/checkout_orders_v2.ts


import { request } from '../utils/request';
import {
    Order,
    PaypalRequestIdParameter,
    PaypalPartnerAttributionIdParameter,
    PaypalClientMetadataIdParameter,
    PreferParameter,
    OrderRequest,
    IdParameter,
    FieldsParameter,
    PatchRequest,
    ConfirmOrderRequest,
    OrderAuthorizeResponse,
    OrderCaptureRequest,
    OrderTrackerRequest,
    Error400,
    Error401,
    Error422,
    ErrorDefault,
} from '../types/checkout_orders_v2';
import {
    OrderSchema,
    PaypalRequestIdParameterSchema,
    PaypalPartnerAttributionIdParameterSchema,
    PaypalClientMetadataIdParameterSchema,
    PreferParameterSchema,
    OrderRequestSchema,
    IdParameterSchema,
    FieldsParameterSchema,
    PatchRequestSchema,
    ConfirmOrderRequestSchema,
    OrderAuthorizeResponseSchema,
    OrderCaptureRequestSchema,
    OrderTrackerRequestSchema,
    Error400Schema,
    Error401Schema,
    Error422Schema,
    ErrorDefaultSchema,
} from '../schema/checkout_orders_v2';
import { SDKConfiguration } from '../index';


export class CheckoutOrdersV2Client {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create order
     * Creates an order.
     */
    async createOrder(
        requestBody: OrderRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            paypalPartnerAttributionId?: PaypalPartnerAttributionIdParameter;
            paypalClientMetadataId?: PaypalClientMetadataIdParameter;
            prefer?: PreferParameter;
        } = {}
    ): Promise<Order> {
        // Validate request body
        OrderRequestSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.paypalPartnerAttributionId) PaypalPartnerAttributionIdParameterSchema.parse(params.paypalPartnerAttributionId);
        if (params.paypalClientMetadataId) PaypalClientMetadataIdParameterSchema.parse(params.paypalClientMetadataId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.paypalPartnerAttributionId ? { 'PayPal-Partner-Attribution-Id': params.paypalPartnerAttributionId } : {}),
            ...(params.paypalClientMetadataId ? { 'PayPal-Client-Metadata-Id': params.paypalClientMetadataId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show order details
     * Shows details for an order, by ID.
     */
    async getOrder(
        id: IdParameter,
        params: {
            fields?: FieldsParameter;
        } = {}
    ): Promise<Order> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.fields) FieldsParameterSchema.parse(params.fields);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders/${id}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update order
     * Updates an order with a `CREATED` or `APPROVED` status.
     */
    async patchOrder(
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

        await request(`${this.baseUrl}/v2/checkout/orders/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Confirm the Order
     * Payer confirms their intent to pay for the the Order with the given payment source.
     */
    async confirmOrder(
        id: IdParameter,
        requestBody: ConfirmOrderRequest,
        params: {
            paypalClientMetadataId?: PaypalClientMetadataIdParameter;
            prefer?: PreferParameter;
        } = {}
    ): Promise<Order> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.paypalClientMetadataId) PaypalClientMetadataIdParameterSchema.parse(params.paypalClientMetadataId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);

        // Validate request body
        ConfirmOrderRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalClientMetadataId ? { 'PayPal-Client-Metadata-Id': params.paypalClientMetadataId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders/${id}/confirm-payment-source`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Authorize payment for order
     * Authorizes payment for an order.
     */
    async authorizeOrder(
        id: IdParameter,
        requestBody?: any, // TODO: No schema for request body, so using any
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            prefer?: PreferParameter;
            paypalClientMetadataId?: PaypalClientMetadataIdParameter;
            paypalAuthAssertion?: string; // TODO: No schema for paypalAuthAssertion
        } = {}
    ): Promise<OrderAuthorizeResponse> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalClientMetadataId) PaypalClientMetadataIdParameterSchema.parse(params.paypalClientMetadataId);
        // TODO: No schema for paypalAuthAssertion

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalClientMetadataId ? { 'PayPal-Client-Metadata-Id': params.paypalClientMetadataId } : {}),
            ...(params.paypalAuthAssertion ? { 'PayPal-Auth-Assertion': params.paypalAuthAssertion } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders/${id}/authorize`, {
            method: 'POST',
            headers: headers,
            body: requestBody ? JSON.stringify(requestBody) : undefined,
        });

        // Response Validation
        const parsedResponse = OrderAuthorizeResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Capture payment for order
     * Captures payment for an order.
     */
    async captureOrder(
        id: IdParameter,
        requestBody?: any, // TODO: No schema for request body, so using any
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            prefer?: PreferParameter;
            paypalClientMetadataId?: PaypalClientMetadataIdParameter;
            paypalAuthAssertion?: string; // TODO: No schema for paypalAuthAssertion
        } = {}
    ): Promise<Order> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalClientMetadataId) PaypalClientMetadataIdParameterSchema.parse(params.paypalClientMetadataId);
        // TODO: No schema for paypalAuthAssertion

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalClientMetadataId ? { 'PayPal-Client-Metadata-Id': params.paypalClientMetadataId } : {}),
            ...(params.paypalAuthAssertion ? { 'PayPal-Auth-Assertion': params.paypalAuthAssertion } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders/${id}/capture`, {
            method: 'POST',
            headers: headers,
            body: requestBody ? JSON.stringify(requestBody) : undefined,
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Add tracking information for an Order.
     * Adds tracking information for an Order.
     */
    async trackOrder(
        id: IdParameter,
        requestBody: OrderTrackerRequest,
        params: {
            paypalAuthAssertion?: string; // TODO: No schema for paypalAuthAssertion
        } = {}
    ): Promise<Order> {
        // Validate parameters
        IdParameterSchema.parse(id);
        // TODO: No schema for paypalAuthAssertion

        // Validate request body
        OrderTrackerRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalAuthAssertion ? { 'PayPal-Auth-Assertion': params.paypalAuthAssertion } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/checkout/orders/${id}/track`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update or cancel tracking information for a PayPal order
     * Updates or cancels the tracking information for a PayPal order, by ID.
     */
    async patchOrderTrackers(
        id: IdParameter,
        trackerId: string, // TODO: No schema for trackerId
        requestBody: PatchRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);
        // TODO: No schema for trackerId

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/checkout/orders/${id}/trackers/${trackerId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }
}