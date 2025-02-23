// shipping_shipment_tracking_v1 ts types 

// Total 30 ts types

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
  TrackingNumberTypeSchema,
  TrackingStatusSchema,
  DateNoTimeSchema,
  CarrierSchema,
  DateTimeSchema,
  LinkDescriptionSchema,
  TrackerSchema,
  TrackerCollectionSchema,
  ErrorDetails2Schema,
  LinkDescription2Schema,
  ErrorSchema,
  TrackerIdentifierSchema,
  BatchTrackerCollectionSchema,
  TrackerIdentifierCollectionSchema,
  TransactionIdParameterSchema,
  TrackingNumberParameterSchema,
  AccountIdParameterSchema,
  IdParameterSchema,
} from '../schema/shipping_shipment_tracking_v1';

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
export type TrackingNumberType = z.infer<typeof TrackingNumberTypeSchema>;
export type TrackingStatus = z.infer<typeof TrackingStatusSchema>;
export type DateNoTime = z.infer<typeof DateNoTimeSchema>;
export type Carrier = z.infer<typeof CarrierSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type LinkDescription = z.infer<typeof LinkDescriptionSchema>;
export type Tracker = z.infer<typeof TrackerSchema>;
export type TrackerCollection = z.infer<typeof TrackerCollectionSchema>;
export type ErrorDetails2 = z.infer<typeof ErrorDetails2Schema>;
export type LinkDescription2 = z.infer<typeof LinkDescription2Schema>;
export type Error = z.infer<typeof ErrorSchema>;
export type TrackerIdentifier = z.infer<typeof TrackerIdentifierSchema>;
export type BatchTrackerCollection = z.infer<typeof BatchTrackerCollectionSchema>;
export type TrackerIdentifierCollection = z.infer<typeof TrackerIdentifierCollectionSchema>;
export type TransactionIdParameter = z.infer<typeof TransactionIdParameterSchema>;
export type TrackingNumberParameter = z.infer<typeof TrackingNumberParameterSchema>;
export type AccountIdParameter = z.infer<typeof AccountIdParameterSchema>;
export type IdParameter = z.infer<typeof IdParameterSchema>;