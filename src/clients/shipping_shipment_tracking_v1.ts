// src/clients/shipping_shipment_tracking_v1.ts

import { request } from '../utils/request';
import {
    BatchTrackerCollection,
    TrackerCollection,
    Tracker,
    Error,
    TransactionIdParameter,
    TrackingNumberParameter,
    AccountIdParameter,
    IdParameter,
} from '../types/shipping_shipment_tracking_v1';
import {
    BatchTrackerCollectionSchema,
    TrackerCollectionSchema,
    TrackerSchema,
    ErrorSchema,
    TransactionIdParameterSchema,
    TrackingNumberParameterSchema,
    AccountIdParameterSchema,
    IdParameterSchema,
} from '../schema/shipping_shipment_tracking_v1';
import { SDKConfiguration } from '../index';

export class ShippingShipmentTrackingClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Add tracking information for multiple PayPal transactions
     * Adds tracking information, with or without tracking numbers, for multiple PayPal transactions. Accepts up to 20 tracking IDs. For more information, see <a href="/docs/tracking/integrate/#add-tracking-information-with-tracking-numbers">Add tracking information with tracking numbers</a> and <a href="/docs/tracking/integrate/#add-tracking-information-without-tracking-numbers">Add tracking information without tracking numbers</a>.
     */
    async addTrackingInformationBatch(
        requestBody: TrackerCollection
    ): Promise<BatchTrackerCollection> {
        // Validate request body
        TrackerCollectionSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/shipping/trackers-batch`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = BatchTrackerCollectionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Add tracking information for PayPal transaction
     * Adds tracking information for a PayPal transaction.
     */
    async addTrackingInformation(
        requestBody: TrackerCollection
    ): Promise<TrackerCollection> {
        // Validate request body
        TrackerCollectionSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/shipping/trackers`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TrackerCollectionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List tracking information
     * Lists tracking information that meet search criteria. The tracking ID is required but the tracking number is optional.
     */
    async listTrackingInformation(
        params: {
            transactionId: TransactionIdParameter;
            trackingNumber?: TrackingNumberParameter;
            accountId?: AccountIdParameter;
        }
    ): Promise<Tracker> {
        // Validate parameters
        TransactionIdParameterSchema.parse(params.transactionId);
        if (params.trackingNumber) TrackingNumberParameterSchema.parse(params.trackingNumber);
        if (params.accountId) AccountIdParameterSchema.parse(params.accountId);

        const queryParams = new URLSearchParams();
        queryParams.append('transaction_id', params.transactionId);
        if (params.trackingNumber) queryParams.append('tracking_number', params.trackingNumber);
        if (params.accountId) queryParams.append('account_id', params.accountId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/shipping/trackers?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TrackerSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update or cancel tracking information for PayPal transaction
     * Updates or cancels the tracking information for a PayPal transaction, by ID. To cancel tracking information, call this method and set the status to CANCELLED. For more information, see <a href="/docs/tracking/integrate/#update-or-cancel-tracking-information">Update or cancel tracking information</a>.
     */
    async updateTrackingInformation(
        id: IdParameter,
        requestBody: Tracker
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        TrackerSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/shipping/trackers/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Show tracking information
     * Shows tracking information, by tracker ID, for a PayPal transaction.
     */
    async showTrackingInformation(
        id: IdParameter,
        params?: {
            accountId?: AccountIdParameter;
        }
    ): Promise<Tracker> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params?.accountId) AccountIdParameterSchema.parse(params.accountId);

        const queryParams = new URLSearchParams();
        if (params?.accountId) queryParams.append('account_id', params.accountId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/shipping/trackers/${id}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TrackerSchema.parse(await response.json());
        return parsedResponse;
    }
}