// src/clients/invoicing_v1.ts
import { z } from 'zod';
import { request } from '../utils/request';
import {
    Invoice,
    Invoices,
    Search,
    QrCode,
    InvoiceNumber,
    Template,
    Templates,
    PageParameter,
    PageSizeParameter,
    TotalCountRequiredParameter,
    InvoiceIdParameter,
    NotifyMerchantParameter,
    TransactionIdParameter,
    WidthParameter,
    HeightParameter,
    FieldsParameter,
    TemplateIdParameter,
    Error,
    Notification,
    CancelNotification,
    PaymentDetail,
    RefundDetail,
} from '../types/invoicing_v1';
import {
    InvoiceSchema,
    InvoicesSchema,
    SearchSchema,
    QrCodeSchema,
    InvoiceNumberSchema,
    TemplateSchema,
    TemplatesSchema,
    PageParameterSchema,
    PageSizeParameterSchema,
    TotalCountRequiredParameterSchema,
    InvoiceIdParameterSchema,
    NotifyMerchantParameterSchema,
    TransactionIdParameterSchema,
    WidthParameterSchema,
    HeightParameterSchema,
    FieldsParameterSchema,
    TemplateIdParameterSchema,
    ErrorSchema,
    NotificationSchema,
    CancelNotificationSchema,
    PaymentDetailSchema,
    RefundDetailSchema,
} from '../schema/invoicing_v1';
import { SDKConfiguration } from '../index';

export class InvoicingV1Client {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create draft invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Creates a draft invoice. To move the invoice from a draft to payable state, you must <a href="/docs/api/invoicing/v1/#invoices_send">send the invoice</a>.<br/><br/>In the JSON request body, include invoice details including merchant information. The <code>invoice</code> object must include an <code>items</code> array.<blockquote><strong>Note:</strong> The merchant that you specify in an invoice must have a PayPal account in good standing.</blockquote>.
     */
    async createInvoice(requestBody: Invoice): Promise<Invoice> {
        // Validate request body
        InvoiceSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = InvoiceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List invoices
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Lists invoices. To filter the invoices that appear in the response, you can specify one or more optional query parameters.
     */
    async listInvoices(
        params: {
            page?: PageParameter;
            pageSize?: PageSizeParameter;
            totalCountRequired?: TotalCountRequiredParameter;
        } = {}
    ): Promise<Invoices> {
        // Validate parameters
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.totalCountRequired) TotalCountRequiredParameterSchema.parse(params.totalCountRequired);

        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', String(params.page));
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.totalCountRequired) queryParams.append('total_count_required', String(params.totalCountRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoicesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Search for invoices
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Searches for invoices that match search criteria. If you pass multiple criteria, the response lists invoices that match all criteria.
     */
    async searchInvoices(requestBody: Search): Promise<Invoices> {
        // Validate request body
        SearchSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/search`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = InvoicesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Send invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Sends an invoice, by ID, to a customer. To suppress the merchant's email notification, set the `notify_merchant` query parameter to `false`.<blockquote><strong>Note:</strong> After you send an invoice, you cannot resend it.</blockquote>
     */
    async sendInvoice(
        invoiceId: InvoiceIdParameter,
        params: {
            notifyMerchant?: NotifyMerchantParameter;
        } = {}
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        if (params.notifyMerchant) NotifyMerchantParameterSchema.parse(params.notifyMerchant);

        const queryParams = new URLSearchParams();
        if (params.notifyMerchant !== undefined) queryParams.append('notify_merchant', String(params.notifyMerchant));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/send?${queryParams.toString()}`, {
            method: 'POST',
            headers: headers,
        });
    }

    /**
     * Schedule invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Schedules an invoice, by ID, to send on a future date. At 07:00 on that date in the preferred time zone of the merchant's PayPal account profile, PayPal emails an invoice notification to the merchant and the customer, adds an online payment button to the customer’s view of the invoice, and updates the invoice status to <code>SENT</code>.<blockquote><strong>Note:</strong> To change the scheduled date, adjust the invoice date and <a href="/docs/api/invoicing/v1/#invoices_update">update invoice</a>. To send the invoice immediately, update the invoice date to today or to a date in the past.</blockquote>
     */
    async scheduleInvoice(invoiceId: InvoiceIdParameter): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/schedule`, {
            method: 'POST',
            headers: headers,
        });
    }

    /**
     * Send invoice reminder
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Sends a reminder to the payer about an invoice, by ID. In the JSON request body, include a `notification` object that defines the subject of the reminder and other details.
     */
    async remindInvoice(invoiceId: InvoiceIdParameter, requestBody: Notification): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        NotificationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/remind`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Cancel sent invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Cancels a sent invoice, by ID, and, optionally, sends a notification about the cancellation to the payer, merchant, and CC: emails.
     */
    async cancelInvoice(invoiceId: InvoiceIdParameter, requestBody: CancelNotification): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        CancelNotificationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/cancel`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Mark invoice as paid
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Marks the status of an invoice, by ID, as paid.
     */
    async recordPayment(invoiceId: InvoiceIdParameter, requestBody: PaymentDetail): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        PaymentDetailSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/record-payment`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Mark invoice as refunded
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Marks the status of an invoice, by ID, as refunded.
     */
    async recordRefund(invoiceId: InvoiceIdParameter, requestBody: RefundDetail): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        RefundDetailSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/record-refund`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Show invoice details
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Shows details for an invoice, by ID.
     */
    async getInvoice(invoiceId: InvoiceIdParameter): Promise<Invoice> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoiceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Fully updates an invoice, by ID. In the JSON request body, include a complete `invoice` object. This call does not support partial updates.
     */
    async updateInvoice(
        invoiceId: InvoiceIdParameter,
        requestBody: Invoice,
        params: {
            notifyMerchant?: NotifyMerchantParameter;
        } = {}
    ): Promise<Invoice> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        if (params.notifyMerchant) NotifyMerchantParameterSchema.parse(params.notifyMerchant);

        // Validate request body
        InvoiceSchema.parse(requestBody);

        const queryParams = new URLSearchParams();
        if (params.notifyMerchant !== undefined) queryParams.append('notify_merchant', String(params.notifyMerchant));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}?${queryParams.toString()}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = InvoiceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete draft invoice
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Deletes invoices in the <code>DRAFT</code> or <code>SCHEDULED</code> state, by ID. For invoices that have already been sent, you can <a href="/docs/api/invoicing/v1/#invoices_cancel">cancel the invoice</a>. After you delete a draft or scheduled invoice, you can no longer use it or show its details. However, you can reuse its invoice number.
     */
    async deleteInvoice(invoiceId: InvoiceIdParameter): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Delete external payment
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Deletes an external payment, by invoice ID and transaction ID.
     */
    async deleteExternalPayment(invoiceId: InvoiceIdParameter, transactionId: TransactionIdParameter): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        TransactionIdParameterSchema.parse(transactionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/payment-records/${transactionId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Delete external refund
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Deletes an external refund, by invoice ID and transaction ID.
     */
    async deleteExternalRefund(invoiceId: InvoiceIdParameter, transactionId: TransactionIdParameter): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        TransactionIdParameterSchema.parse(transactionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/refund-records/${transactionId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Generate QR code
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Generates a QR code for an invoice, by ID. The QR code is a PNG image in <a href="https://www.base64encode.org/">Base64-encoded</a> format that corresponds to the invoice ID. You can generate a QR code for an invoice and add it to a paper or PDF invoice. When customers use their mobile devices to scan the QR code, they are redirected to the PayPal mobile payment flow where they can view the invoice and pay online with PayPal or a credit card. Before you get a QR code, you must <a href="#invoices_create">create an invoice</a> and <a href="#invoices_send">send an invoice</a> to move the invoice from a draft to payable state. Do not include an email address if you do not want the invoice emailed.
     */
    async generateQrCode(
        invoiceId: InvoiceIdParameter,
        params: {
            width?: WidthParameter;
            height?: HeightParameter;
        } = {}
    ): Promise<QrCode> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        if (params.width) WidthParameterSchema.parse(params.width);
        if (params.height) HeightParameterSchema.parse(params.height);

        const queryParams = new URLSearchParams();
        if (params.width) queryParams.append('width', String(params.width));
        if (params.height) queryParams.append('height', String(params.height));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices/${invoiceId}/qr-code?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = QrCodeSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Generate invoice number
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Generates the next invoice number that is available to the merchant. The next invoice number uses the prefix and suffix from the last invoice number and increments the number by one. For example, the next invoice number after `INVOICE-1234` is `INVOICE-1235`.
     */
    async generateInvoiceNumber(): Promise<InvoiceNumber> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/invoices/next-invoice-number`, {
            method: 'POST',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoiceNumberSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Create template
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Creates an invoice template. You can use details from this template to create an invoice. You can create up to 50 templates.<blockquote><strong>Note:</strong> Every merchant starts with three PayPal system templates that are optimized for the unit type billed. The template includes `Quantity`, `Hours`, and `Amount`.</blockquote>
     */
    async createTemplate(requestBody: Template): Promise<Template> {
        // Validate request body
        TemplateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/templates`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List templates
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Lists merchant-created templates with associated details. The associated details include the email addresses, postal addresses, and phone numbers from the user's PayPal profile.<br/>The user can select which values to show in the business information section of their template.
     */
    async listTemplates(
        params: {
            fields?: FieldsParameter;
        } = {}
    ): Promise<Templates> {
        // Validate parameters
        if (params.fields) FieldsParameterSchema.parse(params.fields);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/templates?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TemplatesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show template details
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Shows details for a template, by ID.
     */
    async getTemplate(templateId: TemplateIdParameter): Promise<Template> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/templates/${templateId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete template
     * Deletes a template, by ID.
     */
    async deleteTemplate(templateId: TemplateIdParameter): Promise<void> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/invoicing/templates/${templateId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Update template
     * <blockquote><strong>Deprecation notice:</strong> The <code>/v1/invoices</code> endpoint is deprecated. Use the <code>/v2/invoices</code> endpoint instead. For details, see <a href="/docs/invoicing/basic-integration/">PayPal Invoicing Basic Integration</a>.</blockquote>Updates a template, by ID. In the JSON request body, specify a complete `template` object. The update method does not support partial updates.
     */
    async updateTemplate(templateId: TemplateIdParameter, requestBody: Template): Promise<Template> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        // Validate request body
        TemplateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/invoicing/templates/${templateId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }
}