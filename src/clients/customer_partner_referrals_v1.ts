// src/clients/customer_partner_referrals_v1.ts

import { request } from '../utils/request';
import {
    CreateReferralDataResponse,
    ReferralDataResponse,
    MerchantIntegration,
    Partner,
    MerchantIntegrationCredentials,
    ReferralData,
    PartnerReferralIdParameter,
    PartnerIdParameter,
    TrackingIdParameter,
    MerchantIdParameter,
    FieldsParameter,
    IdParameter,
    CountryCodeParameter,
    ProductParameter,
    ContentTypeParameter,
    XPaypalSecurityContextParameter,
} from '../types/customer_partner_referrals_v1';
import {
    CreateReferralDataResponseSchema,
    ReferralDataResponseSchema,
    MerchantIntegrationSchema,
    PartnerSchema,
    MerchantIntegrationCredentialsSchema,
    ReferralDataSchema,
    PartnerReferralIdParameterSchema,
    PartnerIdParameterSchema,
    TrackingIdParameterSchema,
    MerchantIdParameterSchema,
    FieldsParameterSchema,
    IdParameterSchema,
    CountryCodeParameterSchema,
    ProductParameterSchema,
    ContentTypeParameterSchema,
    XPaypalSecurityContextParameterSchema,
} from '../schema/customer_partner_referrals_v1';
import { SDKConfiguration } from '../index';

export class CustomerPartnerReferralsClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create partner referral
     * Creates a partner referral that is shared by the API caller. The referrals contains the client's personal, business, and financial data.
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

        const response = await request(`${this.baseUrl}/v1/customer/partner-referrals`, {
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
     * Shows details for referral data, by ID, that was shared by the API caller.
     */
    async getPartnerReferral(
        partnerReferralId: PartnerReferralIdParameter
    ): Promise<ReferralDataResponse> {
        // Validate parameters
        PartnerReferralIdParameterSchema.parse(partnerReferralId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/partner-referrals/${partnerReferralId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = ReferralDataResponseSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List seller tracking information
     * Lists sellers that a partner onboarded, by partner ID.
     */
    async listSellerTrackingInformation(
        partnerId: PartnerIdParameter,
        params: {
            trackingId: TrackingIdParameter;
        }
    ): Promise<void> {
        // Validate parameters
        PartnerIdParameterSchema.parse(partnerId);
        TrackingIdParameterSchema.parse(params.trackingId);

        const queryParams = new URLSearchParams();
        queryParams.append('tracking_id', params.trackingId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/customer/partners/${partnerId}/merchant-integrations?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });
    }

    /**
     * Show seller status
     * Shows status information for sellers that the partner on-boards, by partner ID.
     */
    async getSellerStatus(
        partnerId: PartnerIdParameter,
        merchantId: MerchantIdParameter,
        params: {
            fields?: FieldsParameter;
        } = {}
    ): Promise<MerchantIntegration> {
        // Validate parameters
        PartnerIdParameterSchema.parse(partnerId);
        MerchantIdParameterSchema.parse(merchantId);
        if (params.fields) FieldsParameterSchema.parse(params.fields);

        const queryParams = new URLSearchParams();
        if (params.fields) queryParams.append('fields', params.fields);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/partners/${partnerId}/merchant-integrations/${merchantId}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = MerchantIntegrationSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Fetch merchant credentials
     * Fetches merchant credentials for a merchant onboarded through downloadable cart flow.
     */
    async fetchMerchantCredentials(
        partnerId: PartnerIdParameter
    ): Promise<MerchantIntegrationCredentials> {
        // Validate parameters
        PartnerIdParameterSchema.parse(partnerId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/partners/${partnerId}/merchant-integrations/credentials`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = MerchantIntegrationCredentialsSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show partner information - agreements and preferences
     * Shows partner information - agreements and preferences - by partner ID.
     */
    async getPartnerInformation(
        id: IdParameter,
        params: {
            countryCode?: CountryCodeParameter;
            product?: ProductParameter;
            contentType?: ContentTypeParameter;
            xPaypalSecurityContext?: XPaypalSecurityContextParameter;
        } = {}
    ): Promise<Partner> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.countryCode) CountryCodeParameterSchema.parse(params.countryCode);
        if (params.product) ProductParameterSchema.parse(params.product);
        if (params.contentType) ContentTypeParameterSchema.parse(params.contentType);
        if (params.xPaypalSecurityContext) XPaypalSecurityContextParameterSchema.parse(params.xPaypalSecurityContext);

        const queryParams = new URLSearchParams();
        if (params.countryCode) queryParams.append('country_code', params.countryCode);
        if (params.product) queryParams.append('product', params.product);

        const headers: HeadersInit = {
            'Content-Type': params.contentType || 'application/json',
            ...(params.xPaypalSecurityContext ? { 'X-PAYPAL-SECURITY-CONTEXT': params.xPaypalSecurityContext } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/partners/${id}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = PartnerSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Create partner information - agreements and preferences
     * Creates partner information - agreements and preferences - for the given partner.
     */
    async createPartnerInformation(
        id: IdParameter,
        requestBody: Partner,
        params: {
            contentType?: ContentTypeParameter;
            xPaypalSecurityContext?: XPaypalSecurityContextParameter;
        } = {}
    ): Promise<Partner> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.contentType) ContentTypeParameterSchema.parse(params.contentType);
        if (params.xPaypalSecurityContext) XPaypalSecurityContextParameterSchema.parse(params.xPaypalSecurityContext);

        // Validate request body
        PartnerSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': params.contentType || 'application/json',
            ...(params.xPaypalSecurityContext ? { 'X-PAYPAL-SECURITY-CONTEXT': params.xPaypalSecurityContext } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/partners/${id}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = PartnerSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update partner information - agreements and preferences
     * Updates partner information - agreements and preferences - for the given partner.
     */
    async updatePartnerInformation(
        id: IdParameter,
        requestBody: Partner,
        params: {
            contentType?: ContentTypeParameter;
            xPaypalSecurityContext?: XPaypalSecurityContextParameter;
        } = {}
    ): Promise<void> {
        // Validate parameters
        IdParameterSchema.parse(id);
        if (params.contentType) ContentTypeParameterSchema.parse(params.contentType);
        if (params.xPaypalSecurityContext) XPaypalSecurityContextParameterSchema.parse(params.xPaypalSecurityContext);

        // Validate request body
        PartnerSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': params.contentType || 'application/json',
            ...(params.xPaypalSecurityContext ? { 'X-PAYPAL-SECURITY-CONTEXT': params.xPaypalSecurityContext } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/customer/partners/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }
}