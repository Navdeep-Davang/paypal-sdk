// payments_payment_v1 ts types 

// Total 52 ts types

import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CurrencyCodeSchema,
  ItemSchema,
  ShippingAddressSchema,
  ProcessorResponseSchema,
  FmfDetailsSchema,
  PaymentHoldReasonSchema,
  RelatedResourcesSchema,
  CreditCardTokenSchema,
  FundingInstrumentSchema,
  PayeeBaseSchema,
  AddressSchema,
  PayerInfoSchema,
  PayerSchema,
  TokenSchema,
  PaymentSourceSchema,
  PaymentPatternSchema,
  ApplicationContextSchema,
  AmountSchema,
  PaymentAmountDetailsSchema,
  PayeeSchema,
  TransactionSchema,
  PaymentSchema,
  PaymentHistorySchema,
  PatchSchema,
  PatchRequestSchema,
  CartBaseSchema,
  PaymentExecutionSchema,
  RefundRequestSchema,
  RefundSchema,
  DetailedRefundSchema,
  SaleSchema,
  AuthorizationSchema,
  OrderSchema,
  CaptureSchema,
  PaypalPartnerAttributionIdParameterSchema,
  CountParameterSchema,
  StartIdParameterSchema,
  StartIndexParameterSchema,
  StartTimeParameterSchema,
  EndTimeParameterSchema,
  PayeeIdParameterSchema,
  SortByParameterSchema,
  SortOrderParameterSchema,
  PaymentIdParameterSchema,
  PaypalRequestIdParameterSchema,
  SaleIdParameterSchema,
  AuthorizationIdParameterSchema,
  OrderIdParameterSchema,
  CaptureIdParameterSchema,
  RefundIdParameterSchema
} from '../schema/payments_payment_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type ProcessorResponse = z.infer<typeof ProcessorResponseSchema>;
export type FmfDetails = z.infer<typeof FmfDetailsSchema>;
export type PaymentHoldReason = z.infer<typeof PaymentHoldReasonSchema>;
export type RelatedResources = z.infer<typeof RelatedResourcesSchema>;
export type CreditCardToken = z.infer<typeof CreditCardTokenSchema>;
export type FundingInstrument = z.infer<typeof FundingInstrumentSchema>;
export type PayeeBase = z.infer<typeof PayeeBaseSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type PayerInfo = z.infer<typeof PayerInfoSchema>;
export type Payer = z.infer<typeof PayerSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type PaymentSource = z.infer<typeof PaymentSourceSchema>;
export type PaymentPattern = z.infer<typeof PaymentPatternSchema>;
export type ApplicationContext = z.infer<typeof ApplicationContextSchema>;
export type Amount = z.infer<typeof AmountSchema>;
export type PaymentAmountDetails = z.infer<typeof PaymentAmountDetailsSchema>;
export type Payee = z.infer<typeof PayeeSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentHistory = z.infer<typeof PaymentHistorySchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type CartBase = z.infer<typeof CartBaseSchema>;
export type PaymentExecution = z.infer<typeof PaymentExecutionSchema>;
export type RefundRequest = z.infer<typeof RefundRequestSchema>;
export type Refund = z.infer<typeof RefundSchema>;
export type DetailedRefund = z.infer<typeof DetailedRefundSchema>;
export type Sale = z.infer<typeof SaleSchema>;
export type Authorization = z.infer<typeof AuthorizationSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Capture = z.infer<typeof CaptureSchema>;

//Parameter Types
export type PaypalPartnerAttributionIdParameter = z.infer<typeof PaypalPartnerAttributionIdParameterSchema>;
export type CountParameter = z.infer<typeof CountParameterSchema>;
export type StartIdParameter = z.infer<typeof StartIdParameterSchema>;
export type StartIndexParameter = z.infer<typeof StartIndexParameterSchema>;
export type StartTimeParameter = z.infer<typeof StartTimeParameterSchema>;
export type EndTimeParameter = z.infer<typeof EndTimeParameterSchema>;
export type PayeeIdParameter = z.infer<typeof PayeeIdParameterSchema>;
export type SortByParameter = z.infer<typeof SortByParameterSchema>;
export type SortOrderParameter = z.infer<typeof SortOrderParameterSchema>;
export type PaymentIdParameter = z.infer<typeof PaymentIdParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type SaleIdParameter = z.infer<typeof SaleIdParameterSchema>;
export type AuthorizationIdParameter = z.infer<typeof AuthorizationIdParameterSchema>;
export type OrderIdParameter = z.infer<typeof OrderIdParameterSchema>;
export type CaptureIdParameter = z.infer<typeof CaptureIdParameterSchema>;
export type RefundIdParameter = z.infer<typeof RefundIdParameterSchema>;