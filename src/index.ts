import { BillingSubscriptionsClient } from "./clients/billing_subscriptions_v1";

export interface SDKConfiguration {
    apiKey: string;
    baseUrl?: string;
}

export class PayPal {
    public billingSubscriptions: BillingSubscriptionsClient;

    constructor(config: SDKConfiguration) {
        if (!config.apiKey) {
            throw new Error("API Key is required to initialize PayPal SDK.");
        }

        this.billingSubscriptions = new BillingSubscriptionsClient(config);
    }
}
