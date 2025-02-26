// src/clients/customer_disputes_v1.ts

import { request } from '../utils/request';
import {
    DisputeSearch,
    Dispute,
    PatchRequest,
    SubsequentAction,
    Adjudicate,
    RequireEvidence,
    Escalate,
    MakeOffer,
    AcceptOffer,
    DenyOffer,
    StartTimeParameter,
    DisputedTransactionIdParameter,
    PageSizeParameter,
    NextPageTokenParameter,
    DisputeStateParameter,
    UpdateTimeBeforeParameter,
    UpdateTimeAfterParameter,
    IdParameter,
    Error400,
    Error500,
} from '../types/customer_disputes_v1';
import {
    DisputeSearchSchema,
    DisputeSchema,
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
    Error500Schema,
} from '../schema/customer_disputes_v1';
import { SDKConfiguration } from '../index';

export class CustomerDisputesClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * List disputes
     * Lists disputes with a summary set of details, which shows the `dispute_id`, `reason`, `status`, `dispute_state`, `dispute_life_cycle_stage`, `dispute_channel`, `dispute_amount`, `create_time` and `update_time` fields.
     *
     * To filter the disputes in the response, specify one or more optional query parameters. To limit the number of disputes in the response, specify the `page_size` query parameter.
     *
     * To list multiple disputes, set these query parameters in the request:
     *   * `page_size=2`
     *   * `start_time` instead of `disputed_transaction_id`
     *
     * If the response contains more than two disputes, it lists two disputes and includes a HATEOAS link to the next page of results.
     */
    async listDisputes(
        params: {
            startTime?: StartTimeParameter;
            disputedTransactionId?: DisputedTransactionIdParameter;
            pageSize?: PageSizeParameter;
            nextPageToken?: NextPageTokenParameter;
            disputeState?: DisputeStateParameter;
            updateTimeBefore?: UpdateTimeBeforeParameter;
            updateTimeAfter?: UpdateTimeAfterParameter;
        } = {}
    ): Promise<DisputeSearch> {
        // Validate parameters
        if (params.startTime) StartTimeParameterSchema.parse(params.startTime);
        if (params.disputedTransactionId) DisputedTransactionIdParameterSchema.parse(params.disputedTransactionId);
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.nextPageToken) NextPageTokenParameterSchema.parse(params.nextPageToken);
        if (params.disputeState) DisputeStateParameterSchema.parse(params.disputeState);
        if (params.updateTimeBefore) UpdateTimeBeforeParameterSchema.parse(params.updateTimeBefore);
        if (params.updateTimeAfter) UpdateTimeAfterParameterSchema.parse(params.updateTimeAfter);

        const queryParams = new URLSearchParams();
        if (params.startTime) queryParams.append('start_time', params.startTime);
        if (params.disputedTransactionId) queryParams.append('disputed_transaction_id', params.disputedTransactionId);
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.nextPageToken) queryParams.append('next_page_token', params.nextPageToken);
        if (params.disputeState) queryParams.append('dispute_state', params.disputeState);
        if (params.updateTimeBefore) queryParams.append('update_time_before', params.updateTimeBefore);
        if (params.updateTimeAfter) queryParams.append('update_time_after', params.updateTimeAfter);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = DisputeSearchSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show dispute details
     * Shows details for a dispute, by ID.
     *
     * Note: The fields that appear in the response depend on the access. For example, if the merchant requests shows dispute details, the customer's email ID does not appear.
     */
    async getDispute(
        id: IdParameter
    ): Promise<Dispute> {
        // Validate parameters
        IdParameterSchema.parse(id);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = DisputeSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Partially update dispute
     * Partially updates a dispute, by ID. Seller can update the `communication_detail` value or The partner can add the `partner action` information.
     */
    async patchDispute(
        id: IdParameter,
        requestBody: PatchRequest
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Provide evidence
     * Provides evidence for a dispute, by ID. A merchant can provide evidence for disputes with the `WAITING_FOR_SELLER_RESPONSE` status while customers can provide evidence for disputes with the `WAITING_FOR_BUYER_RESPONSE` status. Evidence can be a proof of delivery or proof of refund document or notes, which can include logs. A proof of delivery document includes a tracking number while a proof of refund document includes a refund ID. For other evidence type, notes and documents can be given. Evidences requested from you can be found by checking the type of evidence for the corresponding source under the evidence section of the show dispute details response. The source will be `REQUESTED_FROM_SELLER` for evidences requested from the merchant while it will be `REQUESTED_FROM_BUYER` for evidences requested from the customer. For constraints and rules regarding documents, see documents.
     * To make this request, specify the evidence in the JSON request body and use the `provide-evidence` link in the HATEOAS links of the show dispute details response. In case the link is not present in the response, you can't provide evidence for the dispute. For information about dispute reasons, see dispute reasons.
     */
    async provideEvidence(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/provide-evidence`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Appeal dispute
     * Appeals a dispute, by ID. To appeal a dispute, use the `appeal` link in the HATEOAS links from the show dispute details response. If this link does not appear, you cannot appeal the dispute. Submit new evidence as a document or notes in the JSON request body. For constraints and rules regarding documents, see documents.
     * To make this request, specify the dispute ID in the URI and specify the evidence in the JSON request body. For information about dispute reasons, see dispute reasons.
     */
    async appealDispute(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/appeal`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Accept claim
     * Accepts liability for a claim, by ID. When you accept liability for a claim, the dispute closes in the customer’s favor and PayPal automatically refunds money to the customer from the merchant's account. Allowed accept_claim_type values for the request is available in dispute details allowed response options object.
     */
    async acceptClaim(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/accept-claim`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Settle dispute
     * Important: This method is for sandbox use only.
     * Settles a dispute in either the customer's or merchant's favor. Merchants can make this call in the sandbox to complete end-to-end dispute resolution testing, which mimics the dispute resolution that PayPal agents normally complete. To make this call, the dispute `status` must be `UNDER_REVIEW` and `adjudicate` link  should be available in the HATEOAS links of the show dispute details response.
     */
    async adjudicateDispute(
        id: IdParameter,
        requestBody: Adjudicate
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        AdjudicateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/adjudicate`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update dispute status
     * Important: This method is for sandbox use only.
     * Updates the status of a dispute, by ID, from `UNDER_REVIEW` to either:
     *   * `WAITING_FOR_BUYER_RESPONSE`
     *   * `WAITING_FOR_SELLER_RESPONSE`
     * This status change enables either the customer or merchant to submit evidence for the dispute. To make this call, the dispute `status` must be `UNDER_REVIEW` and `require-evidence` link  should be available in the HATEOAS links of the show dispute details response. Specify an `action` value in the JSON request body to indicate whether the status change enables the customer or merchant to submit evidence:
     *
     * | If `action` is | The `status` updates to |
     * |---|---|
     * | `BUYER_EVIDENCE` | `WAITING_FOR_BUYER_RESPONSE` |
     * | `SELLER_EVIDENCE` | `WAITING_FOR_SELLER_RESPONSE` |
     */
    async requireEvidence(
        id: IdParameter,
        requestBody: RequireEvidence
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        RequireEvidenceSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/require-evidence`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Escalate dispute to claim
     * Escalates the dispute, by ID, to a PayPal claim. To make this call, the stage in the dispute lifecycle must be `INQUIRY`.
     */
    async escalateDispute(
        id: IdParameter,
        requestBody: Escalate
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        EscalateSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/escalate`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Send message about dispute to other party
     * Sends a message about a dispute, by ID, to the other party in the dispute. Merchants and customers can only send messages if the `dispute_life_cycle_stage` value is `INQUIRY`. For constraints and rules regarding documents that can be attached as part of the message, see documents. To send a message, use the `send-message` link in the HATEOAS links of the show dispute details response and specify the message in the JSON request body. In case the link is not present in the response you can't send a message on the dispute.
     */
    async sendMessage(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/send-message`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Make offer to resolve dispute
     * Makes an offer to the other party to resolve a dispute, by ID. To make this call, the stage in the dispute lifecycle must be `INQUIRY`. If the customer accepts the offer, PayPal automatically makes a refund. Allowed offer_type values for the request is available in dispute details allowed response options object.
     */
    async makeOffer(
        id: IdParameter,
        requestBody: MakeOffer
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        MakeOfferSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/make-offer`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Accept offer to resolve dispute
     * The customer accepts the offer from merchant to resolve a dispute, by ID. PayPal automatically refunds the amount proposed by merchant to the customer.
     */
    async acceptOffer(
        id: IdParameter,
        requestBody: AcceptOffer
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        AcceptOfferSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/accept-offer`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Deny offer to resolve dispute
     * Denies an offer that the merchant proposes for a dispute, by ID.
     */
    async denyOffer(
        id: IdParameter,
        requestBody: DenyOffer
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // Validate request body
        DenyOfferSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/deny-offer`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Acknowledge returned item
     * Acknowledges that the customer returned an item for a dispute, by ID. A merchant can make this request for disputes with the `MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED` reason. Allowed acknowledgement_type values for the request is available in dispute details allowed response options object. For constraints and rules regarding documents, see documents.
     */
    async acknowledgeReturnItem(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/acknowledge-return-item`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Provide supporting information for dispute
     * Provides supporting information for a dispute, by ID. A merchant or buyer can make this request for disputes if they find the `provide-supporting-info` link in the HATEOAS links in the list disputes response. The party can provide the supporting information to PayPal to defend themselves only when the `dispute_life_cycle_stage` is `CHARGEBACK`, `PRE_ARBITRATION`, or `ARBITRATION`. They can provide a note that describes their part with details or upload any supporting documents to support their side. For constraints and rules regarding documents, see documents.
     * To make this request, specify the dispute ID in the URI and specify the notes in the JSON request body. This method differs from the provide evidence method which supports only multipart request, where PayPal asks the concerned party for evidence.
     */
    async provideSupportingInfo(
        id: IdParameter,
        requestBody: any // TODO: Define the correct type for the request body
    ): Promise<SubsequentAction> {
        // Validate parameters
        IdParameterSchema.parse(id);

        // TODO: Validate request body - No schema provided in OpenAPI spec

        const headers: HeadersInit = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/customer/disputes/${id}/provide-supporting-info`, {
            method: 'POST',
            headers: headers,
            body: requestBody as any, // TODO: Properly format the multipart/form-data body
        });

        // Response Validation
        const parsedResponse = SubsequentActionSchema.parse(await response.json());
        return parsedResponse;
    }
}