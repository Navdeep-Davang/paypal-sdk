// src/clients/invoicing_v2.ts

import { request } from '../utils/request';
import {
    Invoice,
    Invoices,
    Notification,
    LinkDescription,
    PaymentReference,
    RefundReference,
    QrConfig,
    InvoiceNumber,
    Template,
    Templates,
    SearchData,
    PageParameter,
    PageSizeParameter,
    TotalRequiredParameter,
    FieldsParameter,
    InvoiceIdParameter,
    TransactionIdParameter,
    SendToRecipientParameter,
    SendToInvoicerParameter,
    TemplateIdParameter,
    InvoicesCreate400,
    Error403,
    Error422,
    InvoicesRemind400,
    InvoicesRemind422,
    InvoicesCancel400,
    InvoicesCancel422,
    InvoicesPayments400,
    InvoicesPayments422,
    InvoicesPaymentsDelete422,
    InvoicesRefunds400,
    InvoicesRefunds422,
    InvoicesUpdate400,
    InvoicesGenerateQrCode400,
    InvoicesSearchInvoices400,
    TemplatesCreate400,
    TemplatesCreate422,
    TemplatesGet403,
    TemplatesUpdate400,
    TemplatesUpdate422,
    TemplatesDelete403,
    PaypalRequestIdParameter,
    RefundDetail,
    PaymentDetail,
} from '../types/invoicing_v2';
import {
    InvoiceSchema,
    InvoicesSchema,
    NotificationSchema,
    LinkDescriptionSchema,
    PaymentReferenceSchema,
    RefundReferenceSchema,
    QrConfigSchema,
    InvoiceNumberSchema,
    TemplateSchema,
    TemplatesSchema,
    SearchDataSchema,
    PageParameterSchema,
    PageSizeParameterSchema,
    TotalRequiredParameterSchema,
    FieldsParameterSchema,
    InvoiceIdParameterSchema,
    TransactionIdParameterSchema,
    SendToRecipientParameterSchema,
    SendToInvoicerParameterSchema,
    TemplateIdParameterSchema,
    InvoicesCreate400Schema,
    Error403Schema,
    Error422Schema,
    InvoicesRemind400Schema,
    InvoicesRemind422Schema,
    InvoicesCancel400Schema,
    InvoicesCancel422Schema,
    InvoicesPayments400Schema,
    InvoicesPayments422Schema,
    InvoicesPaymentsDelete422Schema,
    InvoicesRefunds400Schema,
    InvoicesRefunds422Schema,
    InvoicesUpdate400Schema,
    InvoicesGenerateQrCode400Schema,
    InvoicesSearchInvoices400Schema,
    TemplateSubtotalFieldSchema,
    TemplateDisplayPreferenceSchema,
    TemplateItemSettingSchema,
    TemplateSubtotalSettingSchema,
    TemplateSettingsSchema,
    TemplateInfoSchema,
    TemplateDetailSchema,
    TemplatesCreate400Schema,
    TemplatesCreate422Schema,
    TemplatesGet403Schema,
    TemplatesUpdate400Schema,
    TemplatesUpdate422Schema,
    TemplatesDelete403Schema,
    PaypalRequestIdParameterSchema,
    PaymentDetailSchema,
    RefundDetailSchema,
} from '../schema/invoicing_v2';
import { SDKConfiguration } from '../index';

export class InvoicingV2Client {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create draft invoice
     * Creates a draft invoice. To move the invoice from a draft to payable state, you must <a href="#invoices_send">send the invoice</a>.
     *
     * In the JSON request body, include invoice details including merchant information. The <code>invoice</code> object must include an <code>items</code> array.
     *
     * <blockquote><strong>Note:</strong> The merchant that you specify in an invoice must have a PayPal account in good standing.</blockquote>.
     */
    async createInvoice(
        requestBody: Invoice,
        params: {
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Invoice> {
        // Validate request body
        InvoiceSchema.parse(requestBody);

        // Validate parameters
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices`, {
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
     * Lists invoices. To filter the invoices that appear in the response, you can specify one or more optional query parameters.
     */
    async listInvoices(
        params: {
            page?: PageParameter;
            pageSize?: PageSizeParameter;
            totalRequired?: TotalRequiredParameter;
            fields?: FieldsParameter;
        } = {}
    ): Promise<Invoices> {
        // Validate parameters
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);
        if (params.fields) FieldsParameterSchema.parse(params.fields);

        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', String(params.page));
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));
        if (params.fields) queryParams.append('fields', params.fields);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoicesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Send invoice
     * Sends or schedules an invoice, by ID, to be sent to a customer. The action depends on the invoice issue date:
     * *   If the invoice issue date is current or in the past, sends the invoice immediately.
     * *   If the invoice issue date is in the future, schedules the invoice to be sent on that date.
     *
     * To suppress the merchant's email notification, set the `send_to_invoicer` body parameter to `false`. To send the invoice through a share link and not through PayPal, set the <code>send_to_recipient</code> parameter to <code>false</code> in the <code>notification</code> object. The <code>send_to_recipient</code> parameter does not apply to a future issue date because the invoice is scheduled to be sent through PayPal on that date.
     *
     * <blockquote><strong>Notes:</strong>
     * *   After you send an invoice, resending it has no effect.
     * *   To send a notification for updates, <a href="#invoices_update">update the invoice</a> and set the <code>send_to_recipient</code> body parameter to <code>true</code>.
     * </blockquote>
     */
    async sendInvoice(
        invoiceId: InvoiceIdParameter,
        requestBody: Notification
    ): Promise<LinkDescription> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        NotificationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/send`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = LinkDescriptionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Send invoice reminder
     * Sends a reminder to the payer about an invoice, by ID. In the JSON request body, include a `notification` object that defines the subject of the reminder and other details.
     */
    async remindInvoice(
        invoiceId: InvoiceIdParameter,
        requestBody: Notification
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        NotificationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/remind`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Cancel sent invoice
     * Cancels a sent invoice, by ID, and, optionally, sends a notification about the cancellation to the payer, merchant, and CC: emails.
     */
    async cancelInvoice(
        invoiceId: InvoiceIdParameter,
        requestBody: Notification
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        NotificationSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/cancel`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }

    /**
     * Record payment for invoice
     * Records a payment for the invoice. If no payment is due, the invoice is marked as `PAID`. Otherwise, the invoice is marked as `PARTIALLY PAID`.
     */
    async recordPayment(
        invoiceId: InvoiceIdParameter,
        requestBody: PaymentDetail
    ): Promise<PaymentReference> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
         PaymentDetailSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/payments`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PaymentReferenceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete external payment
     * Deletes an external payment, by invoice ID and transaction ID.
     */
    async deleteExternalPayment(
        invoiceId: InvoiceIdParameter,
        transactionId: TransactionIdParameter
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        TransactionIdParameterSchema.parse(transactionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/payments/${transactionId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Record refund for invoice
     * Records a refund for the invoice. If all payments are refunded, the invoice is marked as `REFUNDED`. Otherwise, the invoice is marked as `PARTIALLY REFUNDED`.
     */
    async recordRefund(
        invoiceId: InvoiceIdParameter,
        requestBody: RefundDetail
    ): Promise<RefundReference> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        RefundDetailSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/refunds`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = RefundReferenceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete external refund
     * Deletes an external refund, by invoice ID and transaction ID.
     */
    async deleteExternalRefund(
        invoiceId: InvoiceIdParameter,
        transactionId: TransactionIdParameter
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        TransactionIdParameterSchema.parse(transactionId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/refunds/${transactionId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Generate QR code
     * Generates a QR code for an invoice, by ID. The QR code is a PNG image in <a href="https://www.base64encode.org/">Base64-encoded</a> format that corresponds to the invoice ID. You can generate a QR code for an invoice and add it to a paper or PDF invoice. When customers use their mobile devices to scan the QR code, they are redirected to the PayPal mobile payment flow where they can view the invoice and pay online with PayPal or a credit card. Before you get a QR code, you must <a href="#invoices_create">create an invoice</a> and <a href="#invoices_send">send an invoice</a> to move the invoice from a draft to payable state. Do not include an email address if you do not want the invoice emailed.
     */
    async generateQrCode(
        invoiceId: InvoiceIdParameter,
        requestBody: QrConfig
    ): Promise<any> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        // Validate request body
        QrConfigSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}/generate-qr-code`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        // TODO :: No schema for 200 response, so skipping validation for now
        return await response.text(); // Assuming it returns the QR code as text
    }

    /**
     * Generate invoice number
     * Generates the next invoice number that is available to the merchant. The next invoice number uses the prefix and suffix from the last invoice number and increments the number by one. For example, the next invoice number after `INVOICE-1234` is `INVOICE-1235`.
     */
    async generateNextInvoiceNumber(): Promise<InvoiceNumber> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/generate-next-invoice-number`, {
            method: 'POST',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoiceNumberSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show invoice details
     * Shows details for an invoice, by ID.
     */
    async getInvoice(
        invoiceId: InvoiceIdParameter
    ): Promise<Invoice> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = InvoiceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Fully update invoice
     * Fully updates an invoice, by ID. In the JSON request body, include a complete `invoice` object. This call does not support partial updates.
     */
    async updateInvoice(
        invoiceId: InvoiceIdParameter,
        requestBody: Invoice,
        params: {
            sendToRecipient?: SendToRecipientParameter;
            sendToInvoicer?: SendToInvoicerParameter;
        } = {}
    ): Promise<Invoice> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);
        if (params.sendToRecipient) SendToRecipientParameterSchema.parse(params.sendToRecipient);
        if (params.sendToInvoicer) SendToInvoicerParameterSchema.parse(params.sendToInvoicer);

        // Validate request body
        InvoiceSchema.parse(requestBody);

        const queryParams = new URLSearchParams();
        if (params.sendToRecipient) queryParams.append('send_to_recipient', String(params.sendToRecipient));
        if (params.sendToInvoicer) queryParams.append('send_to_invoicer', String(params.sendToInvoicer));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}?${queryParams.toString()}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = InvoiceSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete invoice
     * Deletes a draft or scheduled invoice, by ID. Deletes invoices in the draft or scheduled state only. For invoices that have already been sent, you can <a href="/docs/api/invoicing/v2/#invoices_cancel">cancel the invoice</a>. After you delete a draft or scheduled invoice, you can no longer use it or show its details. However, you can reuse its invoice number.
     */
    async deleteInvoice(
        invoiceId: InvoiceIdParameter
    ): Promise<void> {
        // Validate parameters
        InvoiceIdParameterSchema.parse(invoiceId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/invoices/${invoiceId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    /**
     * Search for invoices
     * Searches for and lists invoices that match search criteria. If you pass multiple criteria, the response lists invoices that match all criteria.
     */
    async searchInvoices(
        requestBody: SearchData,
        params: {
            page?: PageParameter;
            pageSize?: PageSizeParameter;
            totalRequired?: TotalRequiredParameter;
        } = {}
    ): Promise<Invoices> {
        // Validate request body
        SearchDataSchema.parse(requestBody);

        // Validate parameters
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);

        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', String(params.page));
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/search-invoices?${queryParams.toString()}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = InvoicesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List templates
     * Lists merchant-created templates with associated details. The associated details include the emails, addresses, and phone numbers from the user's PayPal profile.
     * The user can select which values to show in the business information section of their template.
     */
    async listTemplates(
        params: {
            fields?: FieldsParameter;
            page?: PageParameter;
            pageSize?: PageSizeParameter;
        } = {}
    ): Promise<Templates> {
        // Validate parameters
        if (params.fields) FieldsParameterSchema.parse(params.fields);
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);
        if (params.page) queryParams.append('page', String(params.page));
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/templates?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TemplatesSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Create template
     * Creates an invoice template. You can use details from this template to create an invoice. You can create up to 50 templates.
     *
     * <blockquote><strong>Note:</strong> Every merchant starts with three PayPal system templates that are optimized for the unit type billed. The template includes `Quantity`, `Hours`, and `Amount`.</blockquote>
     */
    async createTemplate(
        requestBody: Template
    ): Promise<Template> {
        // Validate request body
        TemplateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/templates`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show template details
     * Shows details for a template, by ID.
     */
    async getTemplate(
        templateId: TemplateIdParameter
    ): Promise<Template> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/templates/${templateId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Fully update template
     * Fully updates a template, by ID. In the JSON request body, include a complete `template` object. This call does not support partial updates.
     */
    async updateTemplate(
        templateId: TemplateIdParameter,
        requestBody: Template
    ): Promise<Template> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        // Validate request body
        TemplateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/invoicing/templates/${templateId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = TemplateSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Delete template
     * Deletes a template, by ID.
     */
    async deleteTemplate(
        templateId: TemplateIdParameter
    ): Promise<void> {
        // Validate parameters
        TemplateIdParameterSchema.parse(templateId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v2/invoicing/templates/${templateId}`, {
            method: 'DELETE',
            headers: headers,
        });
    }
}