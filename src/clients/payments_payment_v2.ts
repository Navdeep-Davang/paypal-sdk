// src/clients/payments_payment_v2.ts

import { request } from '../utils/request';
import {
    Authorization2,
    Capture2,
    Refund,
    CaptureRequest,
    ReauthorizeRequest,
    RefundRequest,
    AuthorizationIdParameter,
    PaypalRequestIdParameter,
    PreferParameter,
    PaypalAuthAssertionParameter,
    CaptureIdParameter,
    RefundIdParameter,
} from '../types/payments_payment_v2';
import {
    Authorization2Schema,
    Capture2Schema,
    RefundSchema,
    CaptureRequestSchema,
    ReauthorizeRequestSchema,
    RefundRequestSchema,
    AuthorizationIdParameterSchema,
    PaypalRequestIdParameterSchema,
    PreferParameterSchema,
    PaypalAuthAssertionParameterSchema,
    CaptureIdParameterSchema,
    RefundIdParameterSchema,
} from '../schema/payments_payment_v2';
import { SDKConfiguration } from '../index';

export class PaymentsPaymentV2Client {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Show details for authorized payment
     * Shows details for an authorized payment, by ID.
     */
    async getAuthorization(
        authorization_id: AuthorizationIdParameter
    ): Promise<Authorization2> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorization_id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/authorizations/${authorization_id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = Authorization2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Capture authorized payment
     * Captures an authorized payment, by ID.
     */
    async captureAuthorization(
        authorization_id: AuthorizationIdParameter,
        requestBody: CaptureRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            prefer?: PreferParameter;
        } = {}
    ): Promise<Capture2> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorization_id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);

        // Validate request body
        CaptureRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/authorizations/${authorization_id}/capture`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = Capture2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Reauthorize authorized payment
     * Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still available, reauthorize a payment after its initial three-day honor period expires. Within the 29-day authorization period, you can issue multiple re-authorizations after the honor period expires.<br/><br/>If 30 days have transpired since the date of the original authorization, you must create an authorized payment instead of reauthorizing the original authorized payment.<br/><br/>A reauthorized payment itself has a new honor period of three days.<br/><br/>You can reauthorize an authorized payment from 4 to 29 days after the 3-day honor period. The allowed amount depends on context and geography, for example in US it is up to 115% of the original authorized amount, not to exceed an increase of $75 USD.<br/><br/>Supports only the `amount` request parameter.<blockquote><strong>Note:</strong> This request is currently not supported for Partner use cases.</blockquote>
     */
    async reauthorizeAuthorization(
        authorization_id: AuthorizationIdParameter,
        requestBody: ReauthorizeRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            prefer?: PreferParameter;
        } = {}
    ): Promise<Authorization2> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorization_id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);

        // Validate request body
        ReauthorizeRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/authorizations/${authorization_id}/reauthorize`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = Authorization2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Void authorized payment
     * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.
     */
    async voidAuthorization(
        authorization_id: AuthorizationIdParameter,
        params: {
            paypalAuthAssertion?: PaypalAuthAssertionParameter;
            prefer?: PreferParameter;
        } = {}
    ): Promise<Authorization2 | void> {
        // Validate parameters
        AuthorizationIdParameterSchema.parse(authorization_id);
        if (params.paypalAuthAssertion) PaypalAuthAssertionParameterSchema.parse(params.paypalAuthAssertion);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalAuthAssertion ? { 'PayPal-Auth-Assertion': params.paypalAuthAssertion } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/authorizations/${authorization_id}/void`, {
            method: 'POST',
            headers: headers,
        });

        if (response.status === 204) {
            return; // No content
        }

        // Response Validation (only if not 204)
        const parsedResponse = Authorization2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show captured payment details
     * Shows details for a captured payment, by ID.
     */
    async getCapture(
        capture_id: CaptureIdParameter
    ): Promise<Capture2> {
        // Validate parameters
        CaptureIdParameterSchema.parse(capture_id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/captures/${capture_id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = Capture2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Refund captured payment
     * Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body. For a partial refund, include an <code>amount</code> object in the JSON request body.
     */
    async refundCapture(
        capture_id: CaptureIdParameter,
        requestBody: RefundRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
            prefer?: PreferParameter;
            paypalAuthAssertion?: PaypalAuthAssertionParameter;
        } = {}
    ): Promise<Refund> {
        // Validate parameters
        CaptureIdParameterSchema.parse(capture_id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalAuthAssertion) PaypalAuthAssertionParameterSchema.parse(params.paypalAuthAssertion);

        // Validate request body
        RefundRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalAuthAssertion ? { 'PayPal-Auth-Assertion': params.paypalAuthAssertion } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/captures/${capture_id}/refund`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = RefundSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show refund details
     * Shows details for a refund, by ID.
     */
    async getRefund(
        refund_id: RefundIdParameter
    ): Promise<Refund> {
        // Validate parameters
        RefundIdParameterSchema.parse(refund_id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/payments/refunds/${refund_id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = RefundSchema.parse(await response.json());
        return parsedResponse;
    }
}