// src/clients/billing_subscriptions_v1.ts


import { request } from '../utils/request';
import {
    Plan,
    PlanCollection,
    PlanRequestPOST,
    PatchRequest,
    UpdatePricingSchemesListRequest,
    Subscription,
    SubscriptionRequestPOST,
    SubscriptionReviseRequest,
    SubscriptionSuspendRequest,
    SubscriptionActivateRequest,
    SubscriptionCaptureRequest,
    Transaction,
    TransactionsList,
    PreferParameter,
    PaypalRequestIdParameter,
    ProductIdParameter,
    PlanIdsParameter,
    PageSizeParameter,
    PageParameter,
    TotalRequiredParameter,
    IdParameter,
    FieldsParameter,
    StartTimeParameter,
    EndTimeParameter,
    // BillingCycle,
    // PaymentPreferences,
    // Taxes,
    // BillingCycleOverride,
    // PaymentPreferencesOverride,
    // TaxesOverride,
    // PlanOverride,
    SubscriptionReviseResponse,
    // SubscriptionActivate422,
    // SubscriptionsCapture422,
    // SubscriptionsRevise422,
    // SubscriptionsSuspend422,
    // SubscriptionsCancel422,
    // SubscriptionsCreate422,
    // SubscriptionsPatch422,
    // PlansActivate422,
    // PlansDeactivate422,
    // PlansPatch422,
    // PlansUpdatePricingSchemes422,
    // PlansCreate400,
    // PlansUpdatePricingSchemes400,
    // SubscriptionsCreate400,
    // SubscriptionsPatch400,
    // SubscriptionsRevise400,
    // SubscriptionsSuspend400,
    // SubscriptionsCancel400,
    // SubscriptionsActivate400,
    // SubscriptionsCapture400,
    // SubscriptionsTransactions400,
    _400,
    _401,
    _403,
    _404,
    _422,
    // ErrorDefault,
    // Error404,
    // Error409,
    // Error415,
    // Error500,
    // Error503,
} from '../types/billing_subscriptions_v1';
import {
    PlanSchema,
    PlanCollectionSchema,
    PlanRequestPOSTSchema,
    PatchRequestSchema,
    UpdatePricingSchemesListRequestSchema,
    SubscriptionSchema,
    SubscriptionRequestPOSTSchema,
    SubscriptionReviseRequestSchema,
    SubscriptionSuspendRequestSchema,
    SubscriptionActivateRequestSchema,
    SubscriptionCaptureRequestSchema,
    TransactionSchema,
    TransactionsListSchema,
    PreferParameterSchema,
    PaypalRequestIdParameterSchema,
    ProductIdParameterSchema,
    PlanIdsParameterSchema,
    PageSizeParameterSchema,
    PageParameterSchema,
    TotalRequiredParameterSchema,
    IdParameterSchema,
    FieldsParameterSchema,
    StartTimeParameterSchema,
    EndTimeParameterSchema,
    BillingCycleSchema,
    PaymentPreferencesSchema,
    TaxesSchema,
    BillingCycleOverrideSchema,
    PaymentPreferencesOverrideSchema,
    TaxesOverrideSchema,
    PlanOverrideSchema,
    SubscriptionReviseResponseSchema,
    SubscriptionsActivate422Schema,
    SubscriptionsCapture422Schema,
    SubscriptionsRevise422Schema,
    SubscriptionsSuspend422Schema,
    SubscriptionsCancel422Schema,
    SubscriptionsCreate422Schema,
    SubscriptionsPatch422Schema,
    PlansActivate422Schema,
    PlansDeactivate422Schema,
    PlansPatch422Schema,
    PlansUpdatePricingSchemes422Schema,
    PlansCreate400Schema,
    PlansUpdatePricingSchemes400Schema,
    SubscriptionsCreate400Schema,
    SubscriptionsPatch400Schema,
    SubscriptionsRevise400Schema,
    SubscriptionsSuspend400Schema,
    SubscriptionsCancel400Schema,
    SubscriptionsActivate400Schema,
    SubscriptionsCapture400Schema,
    SubscriptionsTransactions400Schema,
    _400Schema,
    _401Schema,
    _403Schema,
    _404Schema,
    _422Schema,
    ErrorDefaultSchema,
    Error404Schema,
    Error409Schema,
    Error415Schema,
    Error500Schema,
    Error503Schema,
} from '../schema/billing_subscriptions_v1';
import { SDKConfiguration } from '../index';

export class BillingSubscriptionsClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create plan
     * Creates a plan that defines pricing and billing cycle details for subscriptions.
     */
    async createPlan(
        requestBody: PlanRequestPOST,
        params: {
            prefer?: PreferParameter;
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Plan> {
        // Validate request body
        PlanRequestPOSTSchema.parse(requestBody);

        // Validate parameters
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/plans`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PlanSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List plans
     * Lists billing plans.
     */
    async listPlans(
        params: {
            prefer?: PreferParameter;
            productId?: ProductIdParameter;
            planIds?: PlanIdsParameter;
            pageSize?: PageSizeParameter;
            page?: PageParameter;
            totalRequired?: TotalRequiredParameter;
        } = {}
    ): Promise<PlanCollection> {
        // Validate parameters
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.productId) ProductIdParameterSchema.parse(params.productId);
        if (params.planIds) PlanIdsParameterSchema.parse(params.planIds);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);

        const queryParams = new URLSearchParams();
        if (params.productId) queryParams.append('product_id', params.productId);
        if (params.planIds) queryParams.append('plan_ids', params.planIds);
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.page) queryParams.append('page', String(params.page));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/plans?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PlanCollectionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show plan details
     * Shows details for a plan, by ID.
     */
    async getPlan(
        id: IdParameter
    ): Promise<Plan> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/plans/${id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PlanSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update plan
     * Updates a plan with the `CREATED` or `ACTIVE` status. For an `INACTIVE` plan, you can make only status updates.
     * <br/>You can patch these attributes and objects:<table><thead><tr><th>Attribute or object</th><th>Operations</th></tr></thead><tbody><tr><td><code>description</code></td><td>replace</td></tr><tr><td><code>payment_preferences.auto_bill_outstanding</code></td><td>replace</td></tr><tr><td><code>taxes.percentage</code></td><td>replace</td></tr><tr><td><code>payment_preferences.payment_failure_threshold</code></td><td>replace</td></tr><tr><td><code>payment_preferences.setup_fee</code></td><td>replace</td></tr><tr><td><code>payment_preferences.setup_fee_failure_action</code></td><td>replace</td></tr><tr><td><code>name</code></td><td>replace</td></tr></tbody></table>
     */
    async patchPlan(
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

        await request(`${this.baseUrl}/v1/billing/plans/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Activate plan
     * Activates a plan, by ID.
     */
    async activatePlan(
        id: IdParameter
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/plans/${id}/activate`, {
            method: 'POST',
            headers: headers,
        });
    }

    /**
     * Deactivate plan
     * Deactivates a plan, by ID.
     */
    async deactivatePlan(
        id: IdParameter
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/plans/${id}/deactivate`, {
            method: 'POST',
            headers: headers,
        });
    }

    /**
     * Update pricing
     * Updates pricing for a plan. For example, you can update a regular billing cycle from $5 per month to $7 per month.
     */
    async updatePricingSchemes(
        id: IdParameter,
        requestBody: UpdatePricingSchemesListRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        UpdatePricingSchemesListRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/plans/${id}/update-pricing-schemes`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Create subscription
     * Creates a subscription.
     */
    async createSubscription(
        requestBody: SubscriptionRequestPOST,
        params: {
            prefer?: PreferParameter;
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Subscription> {
        // Validate request body
        SubscriptionRequestPOSTSchema.parse(requestBody);

        // Validate parameters
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/subscriptions`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubscriptionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show subscription details
     * Shows details for a subscription, by ID.
     */
    async getSubscription(
        id: IdParameter,
        params: {
            fields?: FieldsParameter;
        } = {}
    ): Promise<Subscription> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.fields) FieldsParameterSchema.parse(params.fields);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/subscriptions/${id}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = SubscriptionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update subscription
     * Updates a subscription which could be in <code>ACTIVE</code> or <code>SUSPENDED</code> status. You can override plan level default attributes by providing customised values for plan path in the patch request.<br /> <ul> <li>You cannot update attributes that have already completed (Example - trial cycles can’t be updated if completed).</li> <li>Once overridden, changes to plan resource will not impact subscription.</li> <li>Any price update will not impact billing cycles within next 10 days (Applicable only for subscriptions funded by PayPal account).</li> </ul> Following are the fields eligible for patch.<table><thead><tr><th>Attribute or object</th><th>Operations</th></tr></thead><tbody><tr><td><code>billing_info.outstanding_balance</code></td><td>replace</td></tr><tr><td><code>custom_id</code></td><td>add,replace</td></tr><tr><td><code>plan.billing_cycles[@sequence==n].<br/>pricing_scheme.fixed_price</code></td><td>add,replace</td></tr><tr><td><code>plan.billing_cycles[@sequence==n].<br/>pricing_scheme.tiers</code></td><td>replace</td></tr><tr><td><code>plan.billing_cycles[@sequence==n].<br/>total_cycles</code></td><td>replace</td></tr><tr><td><code>plan.payment_preferences.<br/>auto_bill_outstanding</code></td><td>replace</td></tr><tr><td><code>plan.payment_preferences.<br/>payment_failure_threshold</code></td><td>replace</td></tr><tr><td><code>plan.taxes.inclusive</code></td><td>add,replace</td></tr><tr><td><code>plan.taxes.percentage</code></td><td>add,replace</td></tr><tr><td><code>shipping_amount</code></td><td>add,replace</td></tr><tr><td><code>start_time</code></td><td>replace</td></tr><tr><td><code>subscriber.shipping_address</code></td><td>add,replace</td></tr><tr><td><code>subscriber.payment_source (for subscriptions funded<br/>by card payments)</code></td><td>replace</td></tr></tbody></table>
     */
    async patchSubscription(
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

        await request(`${this.baseUrl}/v1/billing/subscriptions/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Revise plan or quantity of subscription
     * Updates the quantity of the product or service in a subscription. You can also use this method to switch the plan and update the `shipping_amount`, `shipping_address` values for the subscription. This type of update requires the buyer's consent.
     */
    async reviseSubscription(
        id: IdParameter,
        requestBody: SubscriptionReviseRequest
    ): Promise<SubscriptionReviseResponse> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        SubscriptionReviseRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/revise`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubscriptionReviseResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Suspend subscription
     * Suspends the subscription.
     */
    async suspendSubscription(
        id: IdParameter,
        requestBody: SubscriptionSuspendRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        SubscriptionSuspendRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/suspend`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Cancel subscription
     * Cancels the subscription.
     */
    async cancelSubscription(
        id: IdParameter,
        requestBody: SubscriptionSuspendRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        SubscriptionSuspendRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/cancel`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Activate subscription
     * Activates the subscription.
     */
    async activateSubscription(
        id: IdParameter,
        requestBody: SubscriptionActivateRequest
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        SubscriptionActivateRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/activate`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Capture authorized payment on subscription
     * Captures an authorized payment from the subscriber on the subscription.
     */
    async captureSubscription(
        id: IdParameter,
        requestBody: SubscriptionCaptureRequest,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Transaction> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        // Validate request body
        SubscriptionCaptureRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/capture`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TransactionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List transactions for subscription
     * Lists transactions for a subscription.
     */
    async listTransactions(
        id: IdParameter,
        params: {
            startTime: StartTimeParameter;
            endTime: EndTimeParameter;
        }
    ): Promise<TransactionsList> {
        // Validate parameters
        IdParameterSchema.parse(id);
        StartTimeParameterSchema.parse(params.startTime);
        EndTimeParameterSchema.parse(params.endTime);

        const queryParams = new URLSearchParams();
        queryParams.append('start_time', params.startTime);
        queryParams.append('end_time', params.endTime);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/billing/subscriptions/${id}/transactions?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TransactionsListSchema.parse(await response.json());
        return parsedResponse;
    }
}