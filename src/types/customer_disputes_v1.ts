// customer_disputes_v1 ts types 

// Total 93 ts types 

import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  LinkDescriptionSchema,
  DateTimeSchema,
  DisputeReasonSchema,
  StatusSchema,
  DisputeStateSchema,
  CurrencyCodeSchema,
  MoneySchema,
  CryptocurrencySymbolSchema,
  CryptocurrencySchema,
  DisputeLifecycleStageSchema,
  DisputeChannelSchema,
  ItemTypeSchema,
  PaymentProcessorSchema,
  FeePolicySchema,
  DisputeOutcomeSchema,
  MoneyMovementReasonSchema,
  DocumentSchema,
  MerchantContactedOutcomeSchema,
  MerchantContactedModeSchema,
  CountryCodeSchema,
  ActionInfoSchema,
  OfferTypeSchema,
  DisputeInfoSchema,
  DisputeSearchSchema,
  BuyerSchema,
  EmailAddressSchema,
  SellerSchema,
  ItemInfoSchema,
  TransactionInfoSchema,
  carrierNameSchema,
  TrackingInfoSchema,
  EvidenceInfoSchema,
  EvidenceSchema,
  AcknowledgeReturnItemResponseOptionsSchema,
  AcceptClaimTypeSchema,
  AcceptClaimResponseOptionsSchema,
  MakeOfferResponseOptionsSchema,
  AllowedResponseOptionsSchema,
  OfferHistorySchema,
  OfferSchema,
  RefundDetailsSchema,
  CommunicationDetailsSchema,
  SupportingInfoSchema,
  AdjudicationTypeSchema,
  AdjudicationReasonSchema,
  AdjudicationSchema,
  MoneyMovementSchema,
  AddressPortableSchema,
  ProductDetailsSchema,
  ServiceDetailsSchema,
  CancellationDetailsSchema,
  ReturnDetailsSchema,
  AgreedRefundDetailsSchema,
  CreditNotProcessedSchema,
  CanceledRecurringBillingSchema,
  DuplicateTransactionSchema,
  IncorrectTransactionAmountSchema,
  PaymentByOtherMeansSchema,
  BillingDisputesPropertiesSchema,
  MerchandizeDisputePropertiesSchema,
  ExtensionsSchema,
  BuyerEscalationReasonSchema,
  PatchSchema,
  PatchRequestSchema,
  SubsequentActionSchema,
  AdjudicateSchema,
  RequireEvidenceSchema,
  EscalateSchema,
  MakeOfferSchema,
  AcceptOfferSchema,
  DenyOfferSchema,
  StartTimeParameterSchema,
  DisputedTransactionIdParameterSchema,
  PageSizeParameterSchema,
  NextPageTokenParameterSchema,
  DisputeStateParameterSchema,
  UpdateTimeBeforeParameterSchema,
  UpdateTimeAfterParameterSchema,
  IdParameterSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  CryptocurrencyQuantitySchema,
  MessageSchema
} from '../schema/customer_disputes_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type DisputeReason = z.infer<typeof DisputeReasonSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type DisputeState = z.infer<typeof DisputeStateSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type CryptocurrencySymbol = z.infer<typeof CryptocurrencySymbolSchema>;
export type Cryptocurrency = z.infer<typeof CryptocurrencySchema>;
export type DisputeLifecycleStage = z.infer<typeof DisputeLifecycleStageSchema>;
export type DisputeChannel = z.infer<typeof DisputeChannelSchema>;
export type ItemType = z.infer<typeof ItemTypeSchema>;
export type PaymentProcessor = z.infer<typeof PaymentProcessorSchema>;
export type FeePolicy = z.infer<typeof FeePolicySchema>;
export type DisputeOutcome = z.infer<typeof DisputeOutcomeSchema>;
export type MoneyMovementReason = z.infer<typeof MoneyMovementReasonSchema>;
export type Document = z.infer<typeof DocumentSchema>;
export type MerchantContactedOutcome = z.infer<typeof MerchantContactedOutcomeSchema>;
export type MerchantContactedMode = z.infer<typeof MerchantContactedModeSchema>;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type ActionInfo = z.infer<typeof ActionInfoSchema>;
export type OfferType = z.infer<typeof OfferTypeSchema>;
export type DisputeInfo = z.infer<typeof DisputeInfoSchema>;
export type DisputeSearch = z.infer<typeof DisputeSearchSchema>;
export type Buyer = z.infer<typeof BuyerSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type Seller = z.infer<typeof SellerSchema>;
export type ItemInfo = z.infer<typeof ItemInfoSchema>;
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;
export type carrierName = z.infer<typeof carrierNameSchema>;
export type TrackingInfo = z.infer<typeof TrackingInfoSchema>;
export type EvidenceInfo = z.infer<typeof EvidenceInfoSchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export type AcknowledgeReturnItemResponseOptions = z.infer<typeof AcknowledgeReturnItemResponseOptionsSchema>;
export type AcceptClaimType = z.infer<typeof AcceptClaimTypeSchema>;
export type AcceptClaimResponseOptions = z.infer<typeof AcceptClaimResponseOptionsSchema>;
export type MakeOfferResponseOptions = z.infer<typeof MakeOfferResponseOptionsSchema>;
export type AllowedResponseOptions = z.infer<typeof AllowedResponseOptionsSchema>;
export type OfferHistory = z.infer<typeof OfferHistorySchema>;
export type Offer = z.infer<typeof OfferSchema>;
export type RefundDetails = z.infer<typeof RefundDetailsSchema>;
export type CommunicationDetails = z.infer<typeof CommunicationDetailsSchema>;
export type SupportingInfo = z.infer<typeof SupportingInfoSchema>;
export type AdjudicationType = z.infer<typeof AdjudicationTypeSchema>;
export type AdjudicationReason = z.infer<typeof AdjudicationReasonSchema>;
export type Adjudication = z.infer<typeof AdjudicationSchema>;
export type MoneyMovement = z.infer<typeof MoneyMovementSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type ProductDetails = z.infer<typeof ProductDetailsSchema>;
export type ServiceDetails = z.infer<typeof ServiceDetailsSchema>;
export type CancellationDetails = z.infer<typeof CancellationDetailsSchema>;
export type ReturnDetails = z.infer<typeof ReturnDetailsSchema>;
export type AgreedRefundDetails = z.infer<typeof AgreedRefundDetailsSchema>;
export type CreditNotProcessed = z.infer<typeof CreditNotProcessedSchema>;
export type CanceledRecurringBilling = z.infer<typeof CanceledRecurringBillingSchema>;
export type DuplicateTransaction = z.infer<typeof DuplicateTransactionSchema>;
export type IncorrectTransactionAmount = z.infer<typeof IncorrectTransactionAmountSchema>;
export type PaymentByOtherMeans = z.infer<typeof PaymentByOtherMeansSchema>;
export type BillingDisputesProperties = z.infer<typeof BillingDisputesPropertiesSchema>;
export type MerchandizeDisputeProperties = z.infer<typeof MerchandizeDisputePropertiesSchema>;
export type Extensions = z.infer<typeof ExtensionsSchema>;
export type BuyerEscalationReason = z.infer<typeof BuyerEscalationReasonSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type PatchRequest = z.infer<typeof PatchRequestSchema>;
export type SubsequentAction = z.infer<typeof SubsequentActionSchema>;
export type Adjudicate = z.infer<typeof AdjudicateSchema>;
export type RequireEvidence = z.infer<typeof RequireEvidenceSchema>;
export type Escalate = z.infer<typeof EscalateSchema>;
export type MakeOffer = z.infer<typeof MakeOfferSchema>;
export type AcceptOffer = z.infer<typeof AcceptOfferSchema>;
export type DenyOffer = z.infer<typeof DenyOfferSchema>;

export type StartTimeParameter = z.infer<typeof StartTimeParameterSchema>;
export type DisputedTransactionIdParameter = z.infer<typeof DisputedTransactionIdParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type NextPageTokenParameter = z.infer<typeof NextPageTokenParameterSchema>;
export type DisputeStateParameter = z.infer<typeof DisputeStateParameterSchema>;
export type UpdateTimeBeforeParameter = z.infer<typeof UpdateTimeBeforeParameterSchema>;
export type UpdateTimeAfterParameter = z.infer<typeof UpdateTimeAfterParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;

export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error409 = z.infer<typeof Error409Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;

export type CryptocurrencyQuantity = z.infer<typeof CryptocurrencyQuantitySchema>;
export type Message = z.infer<typeof MessageSchema>;