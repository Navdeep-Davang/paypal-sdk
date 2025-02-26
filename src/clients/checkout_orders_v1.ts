// src/clients/checkout_orders_v1.ts

import { request } from '../utils/request';
import {
    Order,
    PayOrderRequest,
    PayOrderResponse,
    PaypalPartnerAttributionIdParameter,
    OrderIdParameter,
    PaypalRequestIdParameter,
} from '../types/checkout_orders_v1';
import {
    OrderSchema,
    PayOrderRequestSchema,
    PayOrderResponseSchema,
    PaypalPartnerAttributionIdParameterSchema,
    OrderIdParameterSchema,
    PaypalRequestIdParameterSchema,
} from '../schema/checkout_orders_v1';
import { SDKConfiguration } from '../index';

export class CheckoutOrdersClient {
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
        requestBody: Order,
        params: {
            paypalPartnerAttributionId?: PaypalPartnerAttributionIdParameter;
        } = {}
    ): Promise<Order> {
        // Validate request body
        OrderSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalPartnerAttributionId) PaypalPartnerAttributionIdParameterSchema.parse(params.paypalPartnerAttributionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalPartnerAttributionId ? { 'PayPal-Partner-Attribution-Id': params.paypalPartnerAttributionId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/checkout/orders`, {
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
        orderId: OrderIdParameter
    ): Promise<Order> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/checkout/orders/${orderId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Cancel order
     * Cancels an order, by ID, and deletes the order. To call this method, the order status must be  `CREATED` or `APPROVED`.
     */
    async cancelOrder(
        orderId: OrderIdParameter
    ): Promise<void> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/checkout/orders/${orderId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Pay for order
     * Initiates a PayPal payment that a buyer has approved.
     * <blockquote><strong>Note:</strong> For Partner use cases, use the <code>disbursement_mode</code> to indicate whether to disburse funds to the seller and partner accounts immediately or later. If you delay disbursement, you must call <a href="/docs/multiparty/checkout/delayed-disbursement/">disburse funds</a> to disburse funds to the merchant and partner.</blockquote>
     */
    async payOrder(
        orderId: OrderIdParameter,
        requestBody: PayOrderRequest,
        params: {
            paypalPartnerAttributionId?: PaypalPartnerAttributionIdParameter;
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<PayOrderResponse> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);
        if (params.paypalPartnerAttributionId) PaypalPartnerAttributionIdParameterSchema.parse(params.paypalPartnerAttributionId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        // Validate request body
        PayOrderRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalPartnerAttributionId ? { 'PayPal-Partner-Attribution-Id': params.paypalPartnerAttributionId } : {}),
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/checkout/orders/${orderId}/pay`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PayOrderResponseSchema.parse(await response.json());
        return parsedResponse;
    }
}