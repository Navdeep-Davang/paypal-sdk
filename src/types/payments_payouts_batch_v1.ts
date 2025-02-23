// payments_payouts_batch_v1 ts types 

// Total 42 ts types

import { z } from 'zod';
import {
  ErrorLocationSchema,
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  CurrencySchema,
  PhoneSchema,
  AlternateNotificationMethodSchema,
  LanguageSchema,
  ApplicationContextSchema,
  PurposeEnumSchema,
  RecipientEnumSchema,
  BatchEnumSchema,
  TransactionEnumSchema,
  FundingSourceSchema,
  NameSchema,
  RecipientWalletEnumSchema,
  LinkDescriptionSchema,
  SenderBatchHeaderSchema,
  PayoutItemSchema,
  CreatePayoutRequestSchema,
  Error400Schema,
  Error403Schema,
  Error500Schema,
  PayoutSenderBatchHeaderSchema,
  PayoutHeaderSchema,
  PayoutSchema,
  PayoutBatchHeaderSchema,
  PayoutItemDetailSchema,
  PayoutCurrencyConversionSchema,
  PayoutBatchItemsSchema,
  PayoutBatchSchema,
  PayoutItem2Schema,
  PaypalRequestIdParameterSchema,
  IdParameterSchema,
  FieldsParameterSchema,
  PageParameterSchema,
  PageSizeParameterSchema,
  TotalRequiredParameterSchema,
  PayoutItemIdParameterSchema,
  ErrorDetails2Schema,
  LinkDescription2Schema,
  ErrorSchema,
  Error404Schema
} from '../schema/payments_payouts_batch_v1';

export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type AlternateNotificationMethod = z.infer<typeof AlternateNotificationMethodSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type ApplicationContext = z.infer<typeof ApplicationContextSchema>;
export type PurposeEnum = z.infer<typeof PurposeEnumSchema>;
export type RecipientEnum = z.infer<typeof RecipientEnumSchema>;
export type BatchEnum = z.infer<typeof BatchEnumSchema>;
export type TransactionEnum = z.infer<typeof TransactionEnumSchema>;
export type FundingSource = z.infer<typeof FundingSourceSchema>;
export type Name = z.infer<typeof NameSchema>;
export type RecipientWalletEnum = z.infer<typeof RecipientWalletEnumSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type SenderBatchHeader = z.infer<typeof SenderBatchHeaderSchema>;
export type PayoutItem = z.infer<typeof PayoutItemSchema>;
export type CreatePayoutRequest = z.infer<typeof CreatePayoutRequestSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type PayoutSenderBatchHeader = z.infer<typeof PayoutSenderBatchHeaderSchema>;
export type PayoutHeader = z.infer<typeof PayoutHeaderSchema>;
export type Payout = z.infer<typeof PayoutSchema>;
export type PayoutBatchHeader = z.infer<typeof PayoutBatchHeaderSchema>;
export type PayoutItemDetail = z.infer<typeof PayoutItemDetailSchema>;
export type PayoutCurrencyConversion = z.infer<typeof PayoutCurrencyConversionSchema>;
export type PayoutBatchItems = z.infer<typeof PayoutBatchItemsSchema>;
export type PayoutBatch = z.infer<typeof PayoutBatchSchema>;
export type PayoutItem2 = z.infer<typeof PayoutItem2Schema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type TotalRequiredParameter = z.infer<typeof TotalRequiredParameterSchema>;
export type PayoutItemIdParameter = z.infer<typeof PayoutItemIdParameterSchema>;
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type LinkDescription2 = z.infer<typeof LinkDescription2Schema>;
export type ErrorType = z.infer<typeof ErrorSchema>;
export type Error404 = z.infer<typeof Error404Schema>;