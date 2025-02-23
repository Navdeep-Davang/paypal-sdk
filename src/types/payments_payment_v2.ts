// payments_payment_v2 ts types 

// Total 69 ts types

import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  CurrencyCodeSchema,
  MoneySchema,
  CardBrandSchema,
  DateTimeSchema,
  LinkDescriptionSchema,
  Error400DetailsItemSchema,
  Error400Schema,
  Error401DetailsItemSchema,
  Error401Schema,
  Error403DetailsItemSchema,
  Error403Schema,
  Error404DetailsItemSchema,
  Error404Schema,
  Error409DetailsItemSchema,
  Error409Schema,
  Error422DetailsItemSchema,
  Error422Schema,
  AuthorizationStatusDetailsSchema,
  AuthorizationStatusSchema,
  NetworkTransactionReferenceSchema,
  SellerProtectionSchema,
  ActivityTimestampsSchema,
  AuthorizationBaseSchema,
  AuthorizationSchema,
  RelatedIdsSchema,
  SupplementaryDataSchema,
  EmailSchema,
  AccountIdSchema,
  PayeeBaseSchema,
  Authorization2Schema,
  SupplementaryPurchaseDataSchema,
  PlatformFeeSchema,
  PaymentInstructionSchema,
  CaptureRequestSchema,
  CaptureStatusDetailsSchema,
  CaptureStatusSchema,
  ExchangeRateSchema,
  SellerReceivableBreakdownSchema,
  ProcessorResponseSchema,
  CaptureBaseSchema,
  CaptureSchema,
  Capture2Schema,
  ReauthorizeRequestSchema,
  AuthorizationsReauthorize400DetailsItemSchema,
  AuthorizationsReauthorize400Schema,
  AuthorizationsReauthorize422DetailsItemSchema,
  AuthorizationsReauthorize422Schema,
  AuthorizationsVoid422DetailsItemSchema,
  AuthorizationsVoid422Schema,
  PaymentInstruction2Schema,
  RefundRequestSchema,
  RefundStatusDetailsSchema,
  RefundStatusSchema,
  NetAmountBreakdownItemSchema,
  RefundSchema,
  CapturesRefund400DetailsItemSchema,
  CapturesRefund400Schema,
  CapturesRefund422DetailsItemSchema,
  CapturesRefund422Schema,
  DisbursementModeSchema,
  AuthorizationIdParameterSchema,
  PaypalRequestIdParameterSchema,
  PreferParameterSchema,
  PaypalAuthAssertionParameterSchema,
  CaptureIdParameterSchema,
  RefundIdParameterSchema
} from '../schema/payments_payment_v2';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type Error400DetailsItem = z.infer<typeof Error400DetailsItemSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401DetailsItem = z.infer<typeof Error401DetailsItemSchema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403DetailsItem = z.infer<typeof Error403DetailsItemSchema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404DetailsItem = z.infer<typeof Error404DetailsItemSchema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409DetailsItem = z.infer<typeof Error409DetailsItemSchema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error422DetailsItem = z.infer<typeof Error422DetailsItemSchema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type AuthorizationStatusDetails = z.infer<typeof AuthorizationStatusDetailsSchema>;
export type AuthorizationStatus = z.infer<typeof AuthorizationStatusSchema>;
export type NetworkTransactionReference = z.infer<typeof NetworkTransactionReferenceSchema>;
export type SellerProtection = z.infer<typeof SellerProtectionSchema>;
export type ActivityTimestamps = z.infer<typeof ActivityTimestampsSchema>;
export type AuthorizationBase = z.infer<typeof AuthorizationBaseSchema>;
export type Authorization = z.infer<typeof AuthorizationSchema>;
export type RelatedIds = z.infer<typeof RelatedIdsSchema>;
export type SupplementaryData = z.infer<typeof SupplementaryDataSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type AccountId = z.infer<typeof AccountIdSchema>;
export type PayeeBase = z.infer<typeof PayeeBaseSchema>;
export type Authorization2 = z.infer<typeof Authorization2Schema>;
export type SupplementaryPurchaseData = z.infer<typeof SupplementaryPurchaseDataSchema>;
export type PlatformFee = z.infer<typeof PlatformFeeSchema>;
export type PaymentInstruction = z.infer<typeof PaymentInstructionSchema>;
export type CaptureRequest = z.infer<typeof CaptureRequestSchema>;
export type CaptureStatusDetails = z.infer<typeof CaptureStatusDetailsSchema>;
export type CaptureStatus = z.infer<typeof CaptureStatusSchema>;
export type ExchangeRate = z.infer<typeof ExchangeRateSchema>;
export type SellerReceivableBreakdown = z.infer<typeof SellerReceivableBreakdownSchema>;
export type ProcessorResponse = z.infer<typeof ProcessorResponseSchema>;
export type CaptureBase = z.infer<typeof CaptureBaseSchema>;
export type Capture = z.infer<typeof CaptureSchema>;
export type Capture2 = z.infer<typeof Capture2Schema>;
export type ReauthorizeRequest = z.infer<typeof ReauthorizeRequestSchema>;
export type AuthorizationsReauthorize400DetailsItem = z.infer<typeof AuthorizationsReauthorize400DetailsItemSchema>;
export type AuthorizationsReauthorize400 = z.infer<typeof AuthorizationsReauthorize400Schema>;
export type AuthorizationsReauthorize422DetailsItem = z.infer<typeof AuthorizationsReauthorize422DetailsItemSchema>;
export type AuthorizationsReauthorize422 = z.infer<typeof AuthorizationsReauthorize422Schema>;
export type AuthorizationsVoid422DetailsItem = z.infer<typeof AuthorizationsVoid422DetailsItemSchema>;
export type AuthorizationsVoid422 = z.infer<typeof AuthorizationsVoid422Schema>;
export type PaymentInstruction2 = z.infer<typeof PaymentInstruction2Schema>;
export type RefundRequest = z.infer<typeof RefundRequestSchema>;
export type RefundStatusDetails = z.infer<typeof RefundStatusDetailsSchema>;
export type RefundStatus = z.infer<typeof RefundStatusSchema>;
export type NetAmountBreakdownItem = z.infer<typeof NetAmountBreakdownItemSchema>;
export type Refund = z.infer<typeof RefundSchema>;
export type CapturesRefund400DetailsItem = z.infer<typeof CapturesRefund400DetailsItemSchema>;
export type CapturesRefund400 = z.infer<typeof CapturesRefund400Schema>;
export type CapturesRefund422DetailsItem = z.infer<typeof CapturesRefund422DetailsItemSchema>;
export type CapturesRefund422 = z.infer<typeof CapturesRefund422Schema>;

//Parameter Types
export type AuthorizationIdParameter = z.infer<typeof AuthorizationIdParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type PreferParameter = z.infer<typeof PreferParameterSchema>;
export type PaypalAuthAssertionParameter = z.infer<typeof PaypalAuthAssertionParameterSchema>;
export type CaptureIdParameter = z.infer<typeof CaptureIdParameterSchema>;
export type RefundIdParameter = z.infer<typeof RefundIdParameterSchema>;