// src/clients/reporting_transactions_v1.ts

import { request } from '../utils/request';
import {
    SearchResponse,
    BalancesResponse,
    TransactionIdParameter,
    TransactionTypeParameter,
    TransactionStatusParameter,
    TransactionAmountParameter,
    TransactionCurrencyParameter,
    StartDateParameter,
    EndDateParameter,
    PaymentInstrumentTypeParameter,
    StoreIdParameter,
    TerminalIdParameter,
    FieldsParameter,
    BalanceAffectingRecordsOnlyParameter,
    PageSizeParameter,
    PageParameter,
    AsOfTimeParameter,
    CurrencyCodeParameter,
    Error400,
    Error403,
    Error500,
    ErrorDefault
} from '../types/reporting_transactions_v1';
import {
    SearchResponseSchema,
    BalancesResponseSchema,
    TransactionIdParameterSchema,
    TransactionTypeParameterSchema,
    TransactionStatusParameterSchema,
    TransactionAmountParameterSchema,
    TransactionCurrencyParameterSchema,
    StartDateParameterSchema,
    EndDateParameterSchema,
    PaymentInstrumentTypeParameterSchema,
    StoreIdParameterSchema,
    TerminalIdParameterSchema,
    FieldsParameterSchema,
    BalanceAffectingRecordsOnlyParameterSchema,
    PageSizeParameterSchema,
    PageParameterSchema,
    AsOfTimeParameterSchema,
    CurrencyCodeParameterSchema,
    Error400Schema,
    Error403Schema,
    Error500Schema,
    ErrorDefaultSchema
} from '../schema/reporting_transactions_v1';
import { SDKConfiguration } from '../index';

export class ReportingTransactionsClient {
    private baseUrl: string = "https://api-m.paypal.com/v1/reporting"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * List transactions
     * Lists transactions. Specify one or more query parameters to filter the transaction that appear in the response.
     * <blockquote><strong>Notes:</strong> <ul><li>If you specify one or more optional query parameters, the <code>ending_balance</code> response field is empty.</li><li>It takes a maximum of three hours for executed transactions to appear in the list transactions call.</li><li>This call lists transaction for the previous three years.</li></ul></blockquote>
     */
    async listTransactions(
        params: {
            transactionId?: TransactionIdParameter;
            transactionType?: TransactionTypeParameter;
            transactionStatus?: TransactionStatusParameter;
            transactionAmount?: TransactionAmountParameter;
            transactionCurrency?: TransactionCurrencyParameter;
            startDate: StartDateParameter;
            endDate: EndDateParameter;
            paymentInstrumentType?: PaymentInstrumentTypeParameter;
            storeId?: StoreIdParameter;
            terminalId?: TerminalIdParameter;
            fields?: FieldsParameter;
            balanceAffectingRecordsOnly?: BalanceAffectingRecordsOnlyParameter;
            pageSize?: PageSizeParameter;
            page?: PageParameter;
        }
    ): Promise<SearchResponse> {
        // Validate parameters
        if (params.transactionId) TransactionIdParameterSchema.parse(params.transactionId);
        if (params.transactionType) TransactionTypeParameterSchema.parse(params.transactionType);
        if (params.transactionStatus) TransactionStatusParameterSchema.parse(params.transactionStatus);
        if (params.transactionAmount) TransactionAmountParameterSchema.parse(params.transactionAmount);
        if (params.transactionCurrency) TransactionCurrencyParameterSchema.parse(params.transactionCurrency);
        StartDateParameterSchema.parse(params.startDate);
        EndDateParameterSchema.parse(params.endDate);
        if (params.paymentInstrumentType) PaymentInstrumentTypeParameterSchema.parse(params.paymentInstrumentType);
        if (params.storeId) StoreIdParameterSchema.parse(params.storeId);
        if (params.terminalId) TerminalIdParameterSchema.parse(params.terminalId);
        if (params.fields) FieldsParameterSchema.parse(params.fields);
        if (params.balanceAffectingRecordsOnly) BalanceAffectingRecordsOnlyParameterSchema.parse(params.balanceAffectingRecordsOnly);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.page) PageParameterSchema.parse(params.page);

        const queryParams = new URLSearchParams();
        if (params.transactionId) queryParams.append('transaction_id', params.transactionId);
        if (params.transactionType) queryParams.append('transaction_type', params.transactionType);
        if (params.transactionStatus) queryParams.append('transaction_status', params.transactionStatus);
        if (params.transactionAmount) queryParams.append('transaction_amount', params.transactionAmount);
        if (params.transactionCurrency) queryParams.append('transaction_currency', params.transactionCurrency);
        queryParams.append('start_date', params.startDate);
        queryParams.append('end_date', params.endDate);
        if (params.paymentInstrumentType) queryParams.append('payment_instrument_type', params.paymentInstrumentType);
        if (params.storeId) queryParams.append('store_id', params.storeId);
        if (params.terminalId) queryParams.append('terminal_id', params.terminalId);
        if (params.fields) queryParams.append('fields', params.fields);
        if (params.balanceAffectingRecordsOnly) queryParams.append('balance_affecting_records_only', params.balanceAffectingRecordsOnly);
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.page) queryParams.append('page', String(params.page));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/transactions?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = SearchResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List all balances
     * List all balances. Specify date time to list balances for that time that appear in the response.
     * <blockquote><strong>Notes:</strong> <ul><li>It takes a maximum of three hours for balances to appear in the list balances call.</li><li>This call lists balances upto the previous three years.</li></ul></blockquote>
     */
    async listBalances(
        params: {
            asOfTime?: AsOfTimeParameter;
            currencyCode?: CurrencyCodeParameter;
        } = {}
    ): Promise<BalancesResponse> {
        // Validate parameters
        if (params.asOfTime) AsOfTimeParameterSchema.parse(params.asOfTime);
        if (params.currencyCode) CurrencyCodeParameterSchema.parse(params.currencyCode);

        const queryParams = new URLSearchParams();
        if (params.asOfTime) queryParams.append('as_of_time', params.asOfTime);
        if (params.currencyCode) queryParams.append('currency_code', params.currencyCode);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/balances?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = BalancesResponseSchema.parse(await response.json());
        return parsedResponse;
    }
}