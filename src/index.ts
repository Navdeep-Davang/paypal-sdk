import { BillingSubscriptionsClient } from "./clients/billing_subscriptions_v1";
import { CatalogsProductsClient } from "./clients/catalogs_products_v1";
import { CheckoutOrdersClient } from "./clients/checkout_orders_v1";
import { CheckoutOrdersV2Client } from "./clients/checkout_orders_v2";
import { CustomerDisputesClient } from "./clients/customer_disputes_v1";
import { CustomerPartnerReferralsClient } from "./clients/customer_partner_referrals_v1";
import { CustomerPartnerReferralsV2Client } from "./clients/customer_partner_referrals_v2";
import { InvoicingV1Client } from "./clients/invoicing_v1";
import { InvoicingV2Client } from "./clients/invoicing_v2";
import { NotificationsWebhooksClient } from "./clients/notifications_webhooks_v1";
import { PaymentExperienceWebExperienceProfilesClient } from "./clients/payment-experience_web_experience_profiles_v1";
import { PaymentsPaymentClient } from "./clients/payments_payment_v1";
import { PaymentsPaymentV2Client } from "./clients/payments_payment_v2";
import { PaymentsPayoutsBatchClient } from "./clients/payments_payouts_batch_v1";
import { ReportingTransactionsClient } from "./clients/reporting_transactions_v1";
import { ShippingShipmentTrackingClient } from "./clients/shipping_shipment_tracking_v1";
import { VaultPaymentTokensClient } from "./clients/vault_payment_tokens_v3";

export interface SDKConfiguration {
    apiKey: string;
    baseUrl?: string; // Optional base URL, allows overriding the default
}

export class PayPal {
    public billingSubscriptions: BillingSubscriptionsClient;
    public catalogsProducts: CatalogsProductsClient; //Fixed
    public checkoutOrders: CheckoutOrdersClient; //Fixed
    public checkoutOrdersV2: CheckoutOrdersV2Client; //Fixed
    public customerDisputes: CustomerDisputesClient; //Fixed
    public customerPartnerReferrals: CustomerPartnerReferralsClient; //Fixed
    public customerPartnerReferralsV2: CustomerPartnerReferralsV2Client; //Fixed
    public invoicingV1: InvoicingV1Client; //Fixed
    public invoicingV2: InvoicingV2Client;
    public notificationsWebhooks: NotificationsWebhooksClient;
    public paymentExperienceWebExperienceProfiles: PaymentExperienceWebExperienceProfilesClient;
    public paymentsPayment: PaymentsPaymentClient;
    public paymentsPaymentV2: PaymentsPaymentV2Client;
    public paymentsPayoutsBatch: PaymentsPayoutsBatchClient;
    public reportingTransactions: ReportingTransactionsClient;
    public shippingShipmentTracking: ShippingShipmentTrackingClient;
    public vaultPaymentTokens: VaultPaymentTokensClient;


    constructor(config: SDKConfiguration) {
        if (!config.apiKey) {
            throw new Error("API Key is required to initialize PayPal SDK.");
        }

        this.billingSubscriptions = new BillingSubscriptionsClient(config);
        this.catalogsProducts = new CatalogsProductsClient(config);
        this.checkoutOrders = new CheckoutOrdersClient(config);
        this.checkoutOrdersV2 = new CheckoutOrdersV2Client(config);
        this.customerDisputes = new CustomerDisputesClient(config);
        this.customerPartnerReferrals = new CustomerPartnerReferralsClient(config);
        this.customerPartnerReferralsV2 = new CustomerPartnerReferralsV2Client(config);
        this.invoicingV1 = new InvoicingV1Client(config);
        this.invoicingV2 = new InvoicingV2Client(config);
        this.notificationsWebhooks = new NotificationsWebhooksClient(config);
        this.paymentExperienceWebExperienceProfiles = new PaymentExperienceWebExperienceProfilesClient(config);
        this.paymentsPayment = new PaymentsPaymentClient(config);
        this.paymentsPaymentV2 = new PaymentsPaymentV2Client(config);
        this.paymentsPayoutsBatch = new PaymentsPayoutsBatchClient(config);
        this.reportingTransactions = new ReportingTransactionsClient(config);
        this.shippingShipmentTracking = new ShippingShipmentTrackingClient(config);
        this.vaultPaymentTokens = new VaultPaymentTokensClient(config);
    }
}