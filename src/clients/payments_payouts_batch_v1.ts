// src/clients/payments_payouts_batch_v1.ts

import { request } from '../utils/request';
import {
    CreatePayoutRequest,
    Payout,
    PayoutBatch,
    PayoutItem2,
    PaypalRequestIdParameter,
    IdParameter,
    FieldsParameter,
    PageParameter,
    PageSizeParameter,
    TotalRequiredParameter,
    PayoutItemIdParameter,
} from '../types/payments_payouts_batch_v1';
import {
    CreatePayoutRequestSchema,
    PayoutSchema,
    PayoutBatchSchema,
    PayoutItem2Schema,
    PaypalRequestIdParameterSchema,
    IdParameterSchema,
    FieldsParameterSchema,
    PageParameterSchema,
    PageSizeParameterSchema,
    TotalRequiredParameterSchema,
    PayoutItemIdParameterSchema,
} from '../schema/payments_payouts_batch_v1';
import { SDKConfiguration } from '../index';

export class PaymentsPayoutsBatchClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create batch payout
     * Creates a batch payout. In the JSON request body, pass a `sender_batch_header` and an `items` array. The `sender_batch_header` defines how to handle the payout. The `items` array defines the payout items.<br/>You can make payouts to one or more recipients.
     */
    async createPayout(
        requestBody: CreatePayoutRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Payout> {
        // Validate request body
        CreatePayoutRequestSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payouts`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PayoutSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show payout batch details
     * Shows the latest status of a batch payout. Includes the transaction status and other data for individual payout items.
     */
    async getPayout(
        id: IdParameter,
        params: {
            fields?: FieldsParameter;
            page?: PageParameter;
            pageSize?: PageSizeParameter;
            totalRequired?: TotalRequiredParameter;
        } = {}
    ): Promise<PayoutBatch> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.fields) FieldsParameterSchema.parse(params.fields);
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);
        if (params.page) queryParams.append('page', String(params.page));
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payouts/${id}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PayoutBatchSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show payout item details
     * Shows details for a payout item, by ID. A <code>payout_item_id</code> helps you identify denied payments. If a payment is denied, you can use the <code>payout_item_id</code> to identify the payment even if it lacks a <code>transaction_id</code>.
     */
    async getPayoutItem(
        payout_item_id: PayoutItemIdParameter
    ): Promise<PayoutItem2> {
        // Validate parameters
        PayoutItemIdParameterSchema.parse(payout_item_id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payouts-item/${payout_item_id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PayoutItem2Schema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Cancel unclaimed payout item
     * Cancels an unclaimed payout item, by ID. If no one claims the unclaimed item within 30 days, the API automatically returns the funds to the sender. Use this call to cancel the unclaimed item before the automatic 30-day refund. You can cancel payout items with a <code>transaction_status</code> of <code>UNCLAIMED</code>.
     */
    async cancelPayoutItem(
        payout_item_id: PayoutItemIdParameter
    ): Promise<PayoutItem2> {
        // Validate parameters
        PayoutItemIdParameterSchema.parse(payout_item_id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/payments/payouts-item/${payout_item_id}/cancel`, {
            method: 'POST',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PayoutItem2Schema.parse(await response.json());
        return parsedResponse;
    }
}