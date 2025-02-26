// src/clients/payments_payment_v1.ts

import { request } from '../utils/request';
import {
    Payment,
    PaymentHistory,
    PatchRequest,
    Sale,
    DetailedRefund,
    Authorization,
    Order,
    Capture,
    PaymentExecution,
    RefundRequest,
    PaypalPartnerAttributionIdParameter,
    CountParameter,
    StartIdParameter,
    StartIndexParameter,
    StartTimeParameter,
    EndTimeParameter,
    PayeeIdParameter,
    SortByParameter,
    SortOrderParameter,
    PaymentIdParameter,
    PaypalRequestIdParameter,
    SaleIdParameter,
    AuthorizationIdParameter,
    OrderIdParameter,
    CaptureIdParameter,
    RefundIdParameter,
    Refund,
} from '../types/payments_payment_v1';
import {
    PaymentSchema,
    PaymentHistorySchema,
    PatchRequestSchema,
    SaleSchema,
    DetailedRefundSchema,
    AuthorizationSchema,
    OrderSchema,
    CaptureSchema,
    PaymentExecutionSchema,
    RefundRequestSchema,
    PaypalPartnerAttributionIdParameterSchema,
    CountParameterSchema,
    StartIdParameterSchema,
    StartIndexParameterSchema,
    StartTimeParameterSchema,
    EndTimeParameterSchema,
    PayeeIdParameterSchema,
    SortByParameterSchema,
    SortOrderParameterSchema,
    PaymentIdParameterSchema,
    PaypalRequestIdParameterSchema,
    SaleIdParameterSchema,
    AuthorizationIdParameterSchema,
    OrderIdParameterSchema,
    CaptureIdParameterSchema,
    RefundIdParameterSchema,
    RefundSchema,
} from '../schema/payments_payment_v1';
import { SDKConfiguration } from '../index';

/**
 * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
 */
export class PaymentsPaymentClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create payment
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Creates a sale, an authorized payment to be captured later, or an order.
     */
    async createPayment(
        requestBody: Payment,
        params: {
            paypalPartnerAttributionId?: PaypalPartnerAttributionIdParameter;
        } = {}
    ): Promise<Payment> {
        // Validate request body
        PaymentSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalPartnerAttributionId) PaypalPartnerAttributionIdParameterSchema.parse(params.paypalPartnerAttributionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalPartnerAttributionId ? { 'PayPal-Partner-Attribution-Id': params.paypalPartnerAttributionId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payment`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PaymentSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List payments
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Lists payments that are completed.
     */
    async listPayments(
        params: {
            count?: CountParameter;
            startId?: StartIdParameter;
            startIndex?: StartIndexParameter;
            startTime?: StartTimeParameter;
            endTime?: EndTimeParameter;
            payeeId?: PayeeIdParameter;
            sortBy?: SortByParameter;
            sortOrder?: SortOrderParameter;
        } = {}
    ): Promise<PaymentHistory> {
        // Validate parameters
        if (params.count) CountParameterSchema.parse(params.count);
        if (params.startId) StartIdParameterSchema.parse(params.startId);
        if (params.startIndex) StartIndexParameterSchema.parse(params.startIndex);
        if (params.startTime) StartTimeParameterSchema.parse(params.startTime);
        if (params.endTime) EndTimeParameterSchema.parse(params.endTime);
        if (params.payeeId) PayeeIdParameterSchema.parse(params.payeeId);
        if (params.sortBy) SortByParameterSchema.parse(params.sortBy);
        if (params.sortOrder) SortOrderParameterSchema.parse(params.sortOrder);

        const queryParams = new URLSearchParams();
        if (params.count) queryParams.append('count', String(params.count));
        if (params.startId) queryParams.append('start_id', params.startId);
        if (params.startIndex) queryParams.append('start_index', String(params.startIndex));
        if (params.startTime) queryParams.append('start_time', params.startTime);
        if (params.endTime) queryParams.append('end_time', params.endTime);
        if (params.payeeId) queryParams.append('payee_id', params.payeeId);
        if (params.sortBy) queryParams.append('sort_by', params.sortBy);
        if (params.sortOrder) queryParams.append('sort_order', params.sortOrder);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payment?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PaymentHistorySchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show payment details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Shows details for a payment, by ID, that has yet to complete.
     */
    async getPayment(
        paymentId: PaymentIdParameter
    ): Promise<Payment> {
        // Validate parameters
        PaymentIdParameterSchema.parse(paymentId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payment/${paymentId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PaymentSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Partially update payment
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Partially updates a payment, by ID.
     */
    async updatePayment(
        paymentId: PaymentIdParameter,
        requestBody: PatchRequest
    ): Promise<Payment> {
        // Validate parameters
        PaymentIdParameterSchema.parse(paymentId);

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payment/${paymentId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PaymentSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Execute approved PayPal payment
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Executes a PayPal payment that the customer has approved.
     */
    async executePayment(
        paymentId: PaymentIdParameter,
        requestBody: PaymentExecution,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            paypalPartnerAttributionId?: PaypalPartnerAttributionIdParameter;
        } = {}
    ): Promise<Payment> {
        // Validate parameters
        PaymentIdParameterSchema.parse(paymentId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.paypalPartnerAttributionId) PaypalPartnerAttributionIdParameterSchema.parse(params.paypalPartnerAttributionId);

        // Validate request body
        PaymentExecutionSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.paypalPartnerAttributionId ? { 'PayPal-Partner-Attribution-Id': params.paypalPartnerAttributionId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payment/${paymentId}/execute`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PaymentSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show sale details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Shows details for a sale, by ID.
     */
    async getSale(
        saleId: SaleIdParameter
    ): Promise<Sale> {
        // Validate parameters
        SaleIdParameterSchema.parse(saleId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/sale/${saleId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = SaleSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Refund sale
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Refunds a sale, by ID.
     */
    async refundSale(
        saleId: SaleIdParameter,
        requestBody: RefundRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<DetailedRefund> {
        // Validate parameters
        SaleIdParameterSchema.parse(saleId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        // Validate request body
        RefundRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/sale/${saleId}/refund`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = DetailedRefundSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show authorization details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Shows details for an authorization, by ID.
     */
    async getAuthorization(
        authorizationId: AuthorizationIdParameter
    ): Promise<Authorization> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorizationId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/authorization/${authorizationId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = AuthorizationSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Capture authorization
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Captures and processes an authorization, by ID.
     */
    async captureAuthorization(
        authorizationId: AuthorizationIdParameter,
        requestBody: Capture
    ): Promise<Capture> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorizationId);

        // Validate request body
        CaptureSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/authorization/${authorizationId}/capture`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = CaptureSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Void authorization
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Voids, or cancels, an authorization, by ID.
     */
    async voidAuthorization(
        authorizationId: AuthorizationIdParameter,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Authorization> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorizationId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/authorization/${authorizationId}/void`, {
            method: 'POST',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = AuthorizationSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Re-authorize payment
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Re-authorizes a PayPal account payment, by authorization ID.
     */
    async reauthorizePayment(
        authorizationId: AuthorizationIdParameter,
        requestBody: Authorization
    ): Promise<Authorization> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorizationId);

        // Validate request body
        AuthorizationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/authorization/${authorizationId}/reauthorize`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = AuthorizationSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show order details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
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

        const response = await request(`${this.baseUrl}/v1/payments/orders/${orderId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Capture order
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Captures a payment for an order, by ID.
     */
    async captureOrder(
        orderId: OrderIdParameter,
        requestBody: Capture
    ): Promise<Capture> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);

        // Validate request body
        CaptureSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/orders/${orderId}/capture`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = CaptureSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Void order
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Voids, or cancels, an order, by ID.
     */
    async voidOrder(
        orderId: OrderIdParameter,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Order> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/orders/${orderId}/do-void`, {
            method: 'POST',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = OrderSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Authorize order
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Authorizes an order, by ID.
     */
    async authorizeOrder(
        orderId: OrderIdParameter,
        requestBody: Order
    ): Promise<Authorization> {
        // Validate parameters
        OrderIdParameterSchema.parse(orderId);

        // Validate request body
        OrderSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/orders/${orderId}/authorize`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = AuthorizationSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show captured payment details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Shows details for a captured payment, by ID.
     */
    async getCapture(
        captureId: CaptureIdParameter
    ): Promise<Capture> {
        // Validate parameters
        CaptureIdParameterSchema.parse(captureId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/capture/${captureId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = CaptureSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Refund captured payment
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Refunds a captured payment, by ID.
     */
    async refundCapture(
        captureId: CaptureIdParameter,
        requestBody: RefundRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<DetailedRefund> {
        // Validate parameters
        CaptureIdParameterSchema.parse(captureId);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        // Validate request body
        RefundRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/capture/${captureId}/refund`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = DetailedRefundSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show refund details
     * @deprecated The `/v1/payments` endpoint is deprecated. Use the `/v2/payments` endpoint instead.
     * Shows details for a refund, by ID.
     */
    async getRefund(
        refundId: RefundIdParameter
    ): Promise<Refund> {
        // Validate parameters
        RefundIdParameterSchema.parse(refundId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/refund/${refundId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = RefundSchema.parse(await response.json());
        return parsedResponse;
    }
}