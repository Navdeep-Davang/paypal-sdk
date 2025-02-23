// invoicing_v1 ts types 

// Total 55 ts types

import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLinkDescriptionSchema,
  CurrencySchema,
  PhoneSchema,
  AddressSchema,
  ParticipantSchema,
  TaxSchema,
  DiscountSchema,
  InvoiceItemSchema,
  PaymentTermSchema,
  ShippingCostSchema,
  CustomAmountSchema,
  LinkDescriptionSchema,
  FileAttachmentSchema,
  PaymentSummarySchema,
  MetadataSchema,
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
  ErrorDetails2Schema,
  ErrorSchema,
  MerchantInfoSchema,
  BillingInfoSchema,
  ShippingInfoSchema,
  PaymentDetailSchema,
  RefundDetailSchema,
  InvoiceSchema,
  InvoicesSchema,
  SearchSchema,
  NotificationSchema,
  CancelNotificationSchema,
  QrCodeSchema,
  InvoiceNumberSchema,
  TemplateDataSchema,
  TemplateSettingsMetadataSchema,
  TemplateSettingsSchema,
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
} from '../schema/invoicing_v1';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type Discount = z.infer<typeof DiscountSchema>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export type PaymentTerm = z.infer<typeof PaymentTermSchema>;
export type ShippingCost = z.infer<typeof ShippingCostSchema>;
export type CustomAmount = z.infer<typeof CustomAmountSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type FileAttachment = z.infer<typeof FileAttachmentSchema>;
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
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
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type Error = z.infer<typeof ErrorSchema>;
export type MerchantInfo = z.infer<typeof MerchantInfoSchema>;
export type BillingInfo = z.infer<typeof BillingInfoSchema>;
export type ShippingInfo = z.infer<typeof ShippingInfoSchema>;
export type PaymentDetail = z.infer<typeof PaymentDetailSchema>;
export type RefundDetail = z.infer<typeof RefundDetailSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type Invoices = z.infer<typeof InvoicesSchema>;
export type Search = z.infer<typeof SearchSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type CancelNotification = z.infer<typeof CancelNotificationSchema>;
export type QrCode = z.infer<typeof QrCodeSchema>;
export type InvoiceNumber = z.infer<typeof InvoiceNumberSchema>;
export type TemplateData = z.infer<typeof TemplateDataSchema>;
export type TemplateSettingsMetadata = z.infer<typeof TemplateSettingsMetadataSchema>;
export type TemplateSettings = z.infer<typeof TemplateSettingsSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type Templates = z.infer<typeof TemplatesSchema>;

// Parameter Types
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type TotalCountRequiredParameter = z.infer<typeof TotalCountRequiredParameterSchema>;
export type InvoiceIdParameter = z.infer<typeof InvoiceIdParameterSchema>;
export type NotifyMerchantParameter = z.infer<typeof NotifyMerchantParameterSchema>;
export type TransactionIdParameter = z.infer<typeof TransactionIdParameterSchema>;
export type WidthParameter = z.infer<typeof WidthParameterSchema>;
export type HeightParameter = z.infer<typeof HeightParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type TemplateIdParameter = z.infer<typeof TemplateIdParameterSchema>;