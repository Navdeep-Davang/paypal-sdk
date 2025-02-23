// invoicing_v2 ts types 

// Total 107 ts types

import { z } from 'zod';
import {
  ErrorDetailsSchema,
  ErrorLocationSchema,
  ErrorLinkDescriptionSchema,
  LinkDescriptionSchema,
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
  AmountSchema,
  BusinessNameSchema,
  NameSchema,
  ContactNameAddressSchema,
  AddressPortableSchema,
  EmailAddressSchema,
  PhoneSchema,
  PhoneTypeSchema,
  PhoneDetailSchema,
  FileReferenceSchema,
  InvoiceStatusSchema,
  DetailSchema,
  DateNoTimeSchema,
  PaymentTermTypeSchema,
  PaymentTermSchema,
  InvoicePaymentTermSchema,
  TemplateMetadataSchema,
  InvoiceCreationFlowSchema,
  MetadataSchema,
  InvoiceDetailSchema,
  AmountRangeSchema,
  DateRangeSchema,
  DateTimeRangeSchema,
  ItemSchema,
  TaxSchema,
  PartialPaymentSchema,
  TemplateConfigurationSchema,
  ConfigurationSchema,
  AggregatedDiscountSchema,
  ShippingCostSchema,
  CustomAmountSchema,
  AmountWithBreakdownSchema,
  PaymentTypeSchema,
  PaymentMethodSchema,
  PaymentDetailSchema,
  PaymentsSchema,
  RefundDetailSchema,
  RefundsSchema,
  InvoicerInfoSchema,
  BillingInfoSchema,
  RecipientInfoSchema,
  InvoicesSchema,
  InvoiceSchema,
  InvoicesCreate400Schema,
  NotificationSchema,
  InvoicesRemind400Schema,
  InvoicesRemind422Schema,
  InvoicesCancel400Schema,
  InvoicesCancel422Schema,
  PaymentReferenceSchema,
  InvoicesPayments400Schema,
  InvoicesPayments422Schema,
  InvoicesPaymentsDelete422Schema,
  InvoicesRefunds400Schema,
  InvoicesRefunds422Schema,
  InvoicesUpdate400Schema,
  QrConfigSchema,
  InvoicesGenerateQrCode400Schema,
  InvoiceNumberSchema,
  TemplateSubtotalFieldSchema,
  TemplateDisplayPreferenceSchema,
  TemplateItemSettingSchema,
  TemplateSubtotalSettingSchema,
  TemplateSettingsSchema,
  TemplateInfoSchema,
  TemplateDetailSchema,
  PageParameterSchema,
  PageSizeParameterSchema,
  TotalRequiredParameterSchema,
  FieldsParameterSchema,
  InvoiceIdParameterSchema,
  TransactionIdParameterSchema,
  SendToRecipientParameterSchema,
  SendToInvoicerParameterSchema,
  PaypalRequestIdParameterSchema,
  TemplateIdParameterSchema,
  _400Schema,
  _403Schema,
  _422Schema,
  PercentageSchema,
  SearchDataSchema,
  InvoicesSearchInvoices400Schema,
  TemplateItemFieldSchema,
  TemplateSchema,
  TemplatesSchema,
  TemplatesCreate400Schema,
  TemplatesCreate422Schema,
  TemplatesGet403Schema,
  TemplatesUpdate400Schema,
  TemplatesUpdate422Schema,
  TemplatesDelete403Schema,
  RefundReferenceSchema,
  CorrectEmailAddressSchema,
  DiscountSchema,
  MoneySchema
} from '../schema/invoicing_v2';

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
export type ErrorLocation = z.infer<typeof ErrorLocationSchema>;
export type ErrorLinkDescription = z.infer<typeof ErrorLinkDescriptionSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type Error400 = z.infer<typeof Error400Schema>;
export type Error401 = z.infer<typeof Error401Schema>;
export type Error403 = z.infer<typeof Error403Schema>;
export type Error404 = z.infer<typeof Error404Schema>;
export type Error415 = z.infer<typeof Error415Schema>;
export type Error422 = z.infer<typeof Error422Schema>;
export type Error500 = z.infer<typeof Error500Schema>;
export type Error503 = z.infer<typeof Error503Schema>;
export type Amount = z.infer<typeof AmountSchema>;
export type Discount = z.infer<typeof DiscountSchema>;
export type BusinessName = z.infer<typeof BusinessNameSchema>;
export type Name = z.infer<typeof NameSchema>;
export type AddressPortable = z.infer<typeof AddressPortableSchema>;
export type ContactNameAddress = z.infer<typeof ContactNameAddressSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneType = z.infer<typeof PhoneTypeSchema>;
export type PhoneDetail = z.infer<typeof PhoneDetailSchema>;
export type FileReference = z.infer<typeof FileReferenceSchema>;
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
export type Detail = z.infer<typeof DetailSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type PaymentTermType = z.infer<typeof PaymentTermTypeSchema>;
export type PaymentTerm = z.infer<typeof PaymentTermSchema>;
export type InvoicePaymentTerm = z.infer<typeof InvoicePaymentTermSchema>;
export type TemplateMetadata = z.infer<typeof TemplateMetadataSchema>;
export type InvoiceCreationFlow = z.infer<typeof InvoiceCreationFlowSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type InvoiceDetail = z.infer<typeof InvoiceDetailSchema>;
export type AmountRange = z.infer<typeof AmountRangeSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type DateTimeRange = z.infer<typeof DateTimeRangeSchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type PartialPayment = z.infer<typeof PartialPaymentSchema>;
export type TemplateConfiguration = z.infer<typeof TemplateConfigurationSchema>;
export type Configuration = z.infer<typeof ConfigurationSchema>;
export type AggregatedDiscount = z.infer<typeof AggregatedDiscountSchema>;
export type ShippingCost = z.infer<typeof ShippingCostSchema>;
export type CustomAmount = z.infer<typeof CustomAmountSchema>;
export type AmountWithBreakdown = z.infer<typeof AmountWithBreakdownSchema>;
export type PaymentType = z.infer<typeof PaymentTypeSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type PaymentDetail = z.infer<typeof PaymentDetailSchema>;
export type Payments = z.infer<typeof PaymentsSchema>;
export type RefundDetail = z.infer<typeof RefundDetailSchema>;
export type Refunds = z.infer<typeof RefundsSchema>;
export type InvoicerInfo = z.infer<typeof InvoicerInfoSchema>;
export type BillingInfo = z.infer<typeof BillingInfoSchema>;
export type RecipientInfo = z.infer<typeof RecipientInfoSchema>;
export type Invoices = z.infer<typeof InvoicesSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoicesCreate400 = z.infer<typeof InvoicesCreate400Schema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type InvoicesRemind400 = z.infer<typeof InvoicesRemind400Schema>;
export type InvoicesRemind422 = z.infer<typeof InvoicesRemind422Schema>;
export type InvoicesCancel400 = z.infer<typeof InvoicesCancel400Schema>;
export type InvoicesCancel422 = z.infer<typeof InvoicesCancel422Schema>;
export type PaymentReference = z.infer<typeof PaymentReferenceSchema>;
export type InvoicesPayments400 = z.infer<typeof InvoicesPayments400Schema>;
export type InvoicesPayments422 = z.infer<typeof InvoicesPayments422Schema>;
export type InvoicesPaymentsDelete422 = z.infer<typeof InvoicesPaymentsDelete422Schema>;
export type InvoicesRefunds400 = z.infer<typeof InvoicesRefunds400Schema>;
export type InvoicesRefunds422 = z.infer<typeof InvoicesRefunds422Schema>;
export type InvoicesUpdate400 = z.infer<typeof InvoicesUpdate400Schema>;
export type QrConfig = z.infer<typeof QrConfigSchema>;
export type InvoicesGenerateQrCode400 = z.infer<typeof InvoicesGenerateQrCode400Schema>;
export type InvoiceNumber = z.infer<typeof InvoiceNumberSchema>;
export type TemplateSubtotalField = z.infer<typeof TemplateSubtotalFieldSchema>;
export type TemplateDisplayPreference = z.infer<typeof TemplateDisplayPreferenceSchema>;
export type TemplateItemSetting = z.infer<typeof TemplateItemSettingSchema>;
export type TemplateSubtotalSetting = z.infer<typeof TemplateSubtotalSettingSchema>;
export type TemplateSettings = z.infer<typeof TemplateSettingsSchema>;
export type TemplateInfo = z.infer<typeof TemplateInfoSchema>;
export type TemplateDetail = z.infer<typeof TemplateDetailSchema>;
export type PageParameter = z.infer<typeof PageParameterSchema>;
export type PageSizeParameter = z.infer<typeof PageSizeParameterSchema>;
export type TotalRequiredParameter = z.infer<typeof TotalRequiredParameterSchema>;
export type FieldsParameter = z.infer<typeof FieldsParameterSchema>;
export type InvoiceIdParameter = z.infer<typeof InvoiceIdParameterSchema>;
export type TransactionIdParameter = z.infer<typeof TransactionIdParameterSchema>;
export type SendToRecipientParameter = z.infer<typeof SendToRecipientParameterSchema>;
export type SendToInvoicerParameter = z.infer<typeof SendToInvoicerParameterSchema>;
export type PaypalRequestIdParameter = z.infer<typeof PaypalRequestIdParameterSchema>;
export type TemplateIdParameter = z.infer<typeof TemplateIdParameterSchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type SearchData = z.infer<typeof SearchDataSchema>;
export type InvoicesSearchInvoices400 = z.infer<typeof InvoicesSearchInvoices400Schema>;
export type TemplateItemField = z.infer<typeof TemplateItemFieldSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type Templates = z.infer<typeof TemplatesSchema>;
export type TemplatesCreate400 = z.infer<typeof TemplatesCreate400Schema>;
export type TemplatesCreate422 = z.infer<typeof TemplatesCreate422Schema>;
export type TemplatesGet403 = z.infer<typeof TemplatesGet403Schema>;
export type TemplatesUpdate400 = z.infer<typeof TemplatesUpdate400Schema>;
export type TemplatesUpdate422 = z.infer<typeof TemplatesUpdate422Schema>;
export type TemplatesDelete403 = z.infer<typeof TemplatesDelete403Schema>;
export type RefundReference = z.infer<typeof RefundReferenceSchema>;
export type CorrectEmailAddress = z.infer<typeof CorrectEmailAddressSchema>;