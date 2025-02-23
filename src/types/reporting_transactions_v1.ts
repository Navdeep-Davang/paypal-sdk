// reporting_transactions_v1 ts types 

// Total 55 ts types

import { z } from 'zod';
import {
    ErrorDetailsSchema,
    ErrorLocationSchema,
    ErrorLinkDescriptionSchema,
    Error400Schema,
    Error401Schema,
    Error403Schema,
    Error404Schema,
    Error409Schema,
    Error415Schema,
    Error422Schema,
    Error500Schema,
    Error503Schema,
    ErrorDefaultSchema,
    DateTimeSchema,
    CurrencyCodeSchema,
    MoneySchema,
    PercentageSchema,
    TransactionInfoSchema,
    EmailAddressSchema,
    PhoneSchema,
    NameSchema,
    CountryCodeSchema,
    AddressSchema,
    PayerInfoSchema,
    ShippingInfoSchema,
    ItemDetailTaxAmountSchema,
    CheckoutOptionSchema,
    ItemDetailSchema,
    CartInfoSchema,
    StoreInfoSchema,
    AuctionInfoSchema,
    IncentiveDetailSchema,
    IncentiveInfoSchema,
    TransactionDetailSchema,
    LinkDescriptionSchema2,
    SearchResponseSchema,
    BalanceDetailSchema,
    AccountIdSchema2,
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
    CurrencyCodeParameterSchema
} from '../schema/reporting_transactions_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type ErrorDefault = z.infer<typeof ErrorDefaultSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type Name = z.infer<typeof NameSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type PayerInfo = z.infer<typeof PayerInfoSchema>;
export type ShippingInfo = z.infer<typeof ShippingInfoSchema>;
export type ItemDetailTaxAmount = z.infer<typeof ItemDetailTaxAmountSchema>;
export type CheckoutOption = z.infer<typeof CheckoutOptionSchema>;
export type ItemDetail = z.infer<typeof ItemDetailSchema>;
export type CartInfo = z.infer<typeof CartInfoSchema>;
export type StoreInfo = z.infer<typeof StoreInfoSchema>;
export type AuctionInfo = z.infer<typeof AuctionInfoSchema>;
export type IncentiveDetail = z.infer<typeof IncentiveDetailSchema>;
export type IncentiveInfo = z.infer<typeof IncentiveInfoSchema>;
export type TransactionDetail = z.infer<typeof TransactionDetailSchema>;
export type LinkDescription2 = z.infer<typeof LinkDescriptionSchema2>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type BalanceDetail = z.infer<typeof BalanceDetailSchema>;
export type AccountId2 = z.infer<typeof AccountIdSchema2>;
export type BalancesResponse = z.infer<typeof BalancesResponseSchema>;

//Parameter Types
export type TransactionIdParameter = z.infer<typeof TransactionIdParameterSchema>;
export type TransactionTypeParameter = z.infer<typeof TransactionTypeParameterSchema>;
export type TransactionStatusParameter = z.infer<typeof TransactionStatusParameterSchema>;
export type TransactionAmountParameter = z.infer<typeof TransactionAmountParameterSchema>;
export type TransactionCurrencyParameter = z.infer<typeof TransactionCurrencyParameterSchema>;
export type StartDateParameter = z.infer<typeof StartDateParameterSchema>;
export type EndDateParameter = z.infer<typeof EndDateParameterSchema>;
export type PaymentInstrumentTypeParameter = z.infer<typeof PaymentInstrumentTypeParameterSchema>;
export type StoreIdParameter = z.infer<typeof StoreIdParameterSchema>;
export type TerminalIdParameter = z.infer<typeof TerminalIdParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type BalanceAffectingRecordsOnlyParameter = z.infer<typeof BalanceAffectingRecordsOnlyParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type AsOfTimeParameter = z.infer<typeof AsOfTimeParameterSchema>;
export type CurrencyCodeParameter = z.infer<typeof CurrencyCodeParameterSchema>;