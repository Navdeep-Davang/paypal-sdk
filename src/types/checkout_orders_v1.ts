import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  ErrorDetails2Schema,
  ErrorSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  CurrencySchema,
  AmountDetailsSchema,
  AmountSchema,
  PayeeDisplayMetadataSchema,
  PayeeSchema,
  ItemSchema,
  CountryCodeSchema,
  AddressSchema,
  ShippingAddressSchema,
  PartnerFeeDetailsSchema,
  NameValuePairSchema,
  MetadataSchema,
  LinkDescriptionSchema,
  CaptureSchema,
  RefundSchema,
  SaleSchema,
  PaymentSummarySchema,
  PurchaseUnitSchema,
  PaymentDetailsSchema,
  LanguageSchema,
  ApplicationContextSchema,
  OrderSchema,
  CreditCardSchema,
  CreditCardTokenSchema,
  FundingInstrumentSchema,
  PayerInfoSchema,
  PayerSchema,
  PayOrderRequestSchema,
  PayOrderResponseSchema,
  PaypalPartnerAttributionIdParameterSchema,
  OrderIdParameterSchema,
  PaypalRequestIdParameterSchema,
  ErrorDefaultSchema,
} from '../schema/checkout_orders_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type Error = z.infer<typeof ErrorSchema>;
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
export type Currency = z.infer<typeof CurrencySchema>;
export type AmountDetails = z.infer<typeof AmountDetailsSchema>;
export type Amount = z.infer<typeof AmountSchema>;
export type PayeeDisplayMetadata = z.infer<typeof PayeeDisplayMetadataSchema>;
export type Payee = z.infer<typeof PayeeSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type PartnerFeeDetails = z.infer<typeof PartnerFeeDetailsSchema>;
export type NameValuePair = z.infer<typeof NameValuePairSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type Capture = z.infer<typeof CaptureSchema>;
export type Refund = z.infer<typeof RefundSchema>;
export type Sale = z.infer<typeof SaleSchema>;
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;
export type PurchaseUnit = z.infer<typeof PurchaseUnitSchema>;
export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type ApplicationContext = z.infer<typeof ApplicationContextSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreditCard = z.infer<typeof CreditCardSchema>;
export type CreditCardToken = z.infer<typeof CreditCardTokenSchema>;
export type FundingInstrument = z.infer<typeof FundingInstrumentSchema>;
export type PayerInfo = z.infer<typeof PayerInfoSchema>;
export type Payer = z.infer<typeof PayerSchema>;
export type PayOrderRequest = z.infer<typeof PayOrderRequestSchema>;
export type PayOrderResponse = z.infer<typeof PayOrderResponseSchema>;

//Parameter Types
export type PaypalPartnerAttributionIdParameter = z.infer<typeof PaypalPartnerAttributionIdParameterSchema>;
export type OrderIdParameter = z.infer<typeof OrderIdParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;