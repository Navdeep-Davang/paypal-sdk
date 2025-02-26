// src/clients/notifications_webhooks_v1.ts

import { request } from '../utils/request';
import {
    Webhook,
    WebhookList,
    PatchRequest,
    EventTypeList,
    WebhooksLookup,
    WebhookLookupList,
    VerifyWebhookSignature,
    VerifyWebhookSignatureResponse,
    Event,
    EventResend,
    SimulateEvent,
    PaypalRequestIdParameter,
    AnchorTypeParameter,
    WebhookIdParameter,
    WebhookLookupIdParameter,
    PageSizeParameter,
    StartTimeParameter,
    EndTimeParameter,
    TransactionIdParameter,
    EventTypeParameter,
    EventIdParameter,
    Error,
    EventList,
} from '../types/notifications_webhooks_v1';
import {
    WebhookSchema,
    WebhookListSchema,
    PatchRequestSchema,
    EventTypeListSchema,
    WebhooksLookupSchema,
    WebhookLookupListSchema,
    VerifyWebhookSignatureSchema,
    VerifyWebhookSignatureResponseSchema,
    EventSchema,
    EventResendSchema,
    SimulateEventSchema,
    PaypalRequestIdParameterSchema,
    AnchorTypeParameterSchema,
    WebhookIdParameterSchema,
    WebhookLookupIdParameterSchema,
    PageSizeParameterSchema,
    StartTimeParameterSchema,
    EndTimeParameterSchema,
    TransactionIdParameterSchema,
    EventTypeParameterSchema,
    EventIdParameterSchema,
    ErrorSchema,
    EventListSchema,
} from '../schema/notifications_webhooks_v1';
import { SDKConfiguration } from '../index';

export class NotificationsWebhooksClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create webhook
     * Subscribes your webhook listener to events.
     */
    async createWebhook(
        requestBody: Webhook,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Webhook> {
        // Validate request body
        WebhookSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = WebhookSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * List webhooks
     * Lists webhooks for an app.
     */
    async listWebhooks(
        params: {
            anchorType?: AnchorTypeParameter;
        } = {}
    ): Promise<WebhookList> {
        // Validate parameters
        if (params.anchorType) AnchorTypeParameterSchema.parse(params.anchorType);

        const queryParams = new URLSearchParams();
        if (params.anchorType) queryParams.append('anchor_type', params.anchorType);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks?${queryParams.toString()}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebhookListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * Show webhook details
     * Shows details for a webhook, by ID.
     */
    async getWebhook(
        webhookId: WebhookIdParameter
    ): Promise<Webhook> {
        // Validate parameters
        WebhookIdParameterSchema.parse(webhookId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks/${webhookId}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebhookSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Update webhook
     * Updates a webhook to replace webhook fields with new values. Supports only the `replace` operation. Pass a `json_patch` object with `replace` operation and `path`, which is `/url` for a URL or `/event_types` for events. The `value` is either the URL or a list of events.
     */
    async updateWebhook(
        webhookId: WebhookIdParameter,
        requestBody: PatchRequest
    ): Promise<Webhook> {
        // Validate parameters
        WebhookIdParameterSchema.parse(webhookId);

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks/${webhookId}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = WebhookSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 404, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * Delete webhook
     * Deletes a webhook, by ID.
     */
    async deleteWebhook(
        webhookId: WebhookIdParameter
    ): Promise<void> {
        // Validate parameters
        WebhookIdParameterSchema.parse(webhookId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            await request(`${this.baseUrl}/v1/notifications/webhooks/${webhookId}`, {
                method: 'DELETE',
                headers: headers,
            });
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * List event subscriptions for webhook
     * Lists event subscriptions for a webhook, by ID.
     */
    async listEventTypes(
        webhookId: WebhookIdParameter
    ): Promise<EventTypeList> {
        // Validate parameters
        WebhookIdParameterSchema.parse(webhookId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks/${webhookId}/event-types`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = EventTypeListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Create webhook lookup
     * Creates a webhook lookup.
     */
    async createWebhookLookup(): Promise<WebhooksLookup> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-lookup`, {
                method: 'POST',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebhooksLookupSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * List webhook lookups
     * Lists webhook lookups.
     */
    async listWebhookLookups(): Promise<WebhookLookupList> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-lookup`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebhookLookupListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * Show webhook lookup details
     * Shows details for a webhook lookup, by ID.
     */
    async getWebhookLookup(
        webhookLookupId: WebhookLookupIdParameter
    ): Promise<WebhooksLookup> {
        // Validate parameters
        WebhookLookupIdParameterSchema.parse(webhookLookupId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-lookup/${webhookLookupId}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = WebhooksLookupSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Delete webhook lookup
     * Deletes a webhook lookup, by ID.
     */
    async deleteWebhookLookup(
        webhookLookupId: WebhookLookupIdParameter
    ): Promise<void> {
        // Validate parameters
        WebhookLookupIdParameterSchema.parse(webhookLookupId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            await request(`${this.baseUrl}/v1/notifications/webhooks-lookup/${webhookLookupId}`, {
                method: 'DELETE',
                headers: headers,
            });
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Verify webhook signature
     * Verifies a webhook signature.
     */
    async verifyWebhookSignature(
        requestBody: VerifyWebhookSignature
    ): Promise<VerifyWebhookSignatureResponse> {
        // Validate request body
        VerifyWebhookSignatureSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/verify-webhook-signature`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = VerifyWebhookSignatureResponseSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * List available events
     * Lists available events to which any webhook can subscribe. For a list of supported events, see [Webhook event names](/docs/api/notifications/webhooks/event-names/).
     */
    async listAvailableEvents(): Promise<EventTypeList> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-event-types`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = EventTypeListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * List event notifications
     * Lists webhooks event notifications. Use query parameters to filter the response.
     */
    async listEventNotifications(
        params: {
            pageSize?: PageSizeParameter;
            startTime?: StartTimeParameter;
            endTime?: EndTimeParameter;
            transactionId?: TransactionIdParameter;
            eventType?: EventTypeParameter;
        } = {}
    ): Promise<EventList> {
        // Validate parameters
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.startTime) StartTimeParameterSchema.parse(params.startTime);
        if (params.endTime) EndTimeParameterSchema.parse(params.endTime);
        if (params.transactionId) TransactionIdParameterSchema.parse(params.transactionId);
        if (params.eventType) EventTypeParameterSchema.parse(params.eventType);

        const queryParams = new URLSearchParams();
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.startTime) queryParams.append('start_time', String(params.startTime));
        if (params.endTime) queryParams.append('end_time', String(params.endTime));
        if (params.transactionId) queryParams.append('transaction_id', String(params.transactionId));
        if (params.eventType) queryParams.append('event_type', String(params.eventType));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-events?${queryParams.toString()}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = EventListSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }

    /**
     * Show event notification details
     * Shows details for a webhooks event notification, by ID.
     */
    async getEventNotification(
        eventId: EventIdParameter
    ): Promise<Event> {
        // Validate parameters
        EventIdParameterSchema.parse(eventId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-events/${eventId}`, {
                method: 'GET',
                headers: headers,
            });

            // Response Validation
            const parsedResponse = EventSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Resend event notification
     * Resends a webhook event notification, by ID. Any pending notifications are not resent.
     */
    async resendEventNotification(
        eventId: EventIdParameter,
        requestBody: EventResend
    ): Promise<Event> {
        // Validate parameters
        EventIdParameterSchema.parse(eventId);

        // Validate request body
        EventResendSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/webhooks-events/${eventId}/resend`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = EventSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 404) and map to custom error types
            throw error;
        }
    }

    /**
     * Simulate webhook event
     * Simulates a webhook event. In the JSON request body, specify a sample payload.<br>You need to subscribe to the following webhook events for Pay upon Invoice:<br><table><thead><tr><th>Event</th><th>Trigger</th></tr></thead><tbody><tr><td><code>PAYMENT.CAPTURE.COMPLETED</code></td><td>A payment capture completes.</td></tr><tr><td><code>PAYMENT.CAPTURE.DENIED</code></td><td>A payment capture is denied.</td></tr><tr><td><code>CHECKOUT.PAYMENT-APPROVAL.REVERSED</code></td><td>PayPal reverses a payment capture.</td></tr></tbody></table>
     */
    async simulateEvent(
        requestBody: SimulateEvent
    ): Promise<Event> {
        // Validate request body
        SimulateEventSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        try {
            const response = await request(`${this.baseUrl}/v1/notifications/simulate-event`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            // Response Validation
            const parsedResponse = EventSchema.parse(await response.json());
            return parsedResponse;
        } catch (error: any) {
            // TODO: Handle specific error cases (e.g., 400, 422) and map to custom error types
            throw error;
        }
    }
}