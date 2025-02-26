// src/clients/customer_partner_referrals_v2.ts

import { request } from '../utils/request';
import {
    ReferralData,
    CreateReferralDataResponse,
    ReferralDataResponse,
    PartnerReferralIdParameter,
} from '../types/customer_partner_referrals_v2';
import {
    ReferralDataSchema,
    CreateReferralDataResponseSchema,
    ReferralDataResponseSchema,
    PartnerReferralIdParameterSchema,
    _400Schema,
    _401Schema,
    _403Schema,
    _422Schema,
    ErrorDefaultSchema,
    Error500Schema
} from '../schema/customer_partner_referrals_v2';
import { SDKConfiguration } from '../index';

export class CustomerPartnerReferralsV2Client {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create partner referral
     * Creates a partner referral that is shared by the partner or API caller. The partner referral is used to onboard the seller, and contains the seller's personal, business, financial and operations.
     */
    async createPartnerReferral(
        requestBody: ReferralData
    ): Promise<CreateReferralDataResponse> {
        // Validate request body
        ReferralDataSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/customer/partner-referrals`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = CreateReferralDataResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show referral data
     * Shows details by ID for referral data that was shared by the partner or API caller.
     */
    async getPartnerReferral(
        partnerReferralId: string
    ): Promise<ReferralDataResponse> {
        // Validate parameters
        PartnerReferralIdParameterSchema.parse(partnerReferralId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v2/customer/partner-referrals/${partnerReferralId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = ReferralDataResponseSchema.parse(await response.json());
        return parsedResponse;
    }
}