// src/clients/catalogs_products_v1.ts


import { request } from '../utils/request';
import {
    Product,
    ProductCollection,
    ProductRequestPOST,
    PatchRequest,
    PreferParameter,
    PaypalRequestIdParameter,
    PageSizeParameter,
    PageParameter,
    TotalRequiredParameter,
    ProductIdParameter,
    ProductsCreate400,
    ProductsPatch400,
    ProductsPatch422,
    _400,
    _401,
    _403,
    _404,
    _422,
    ErrorDefault,
    Error404,
    Error409,
    Error415,
    Error500,
    Error503,
} from '../types/catalogs_products_v1';
import {
    ProductSchema,
    ProductCollectionSchema,
    ProductRequestPOSTSchema,
    PatchRequestSchema,
    PreferParameterSchema,
    PaypalRequestIdParameterSchema,
    PageSizeParameterSchema,
    PageParameterSchema,
    TotalRequiredParameterSchema,
    ProductIdParameterSchema,
    ProductsCreate400Schema,
    ProductsPatch400Schema,
    ProductsPatch422Schema,
    _400Schema,
    _401Schema,
    _403Schema,
    _404Schema,
    _422Schema,
    ErrorDefaultSchema,
    Error404Schema,
    Error409Schema,
    Error415Schema,
    Error500Schema,
    Error503Schema,
} from '../schema/catalogs_products_v1';
import { SDKConfiguration } from '../index';

export class CatalogsProductsClient {
    private baseUrl: string = "https://api-m.sandbox.paypal.com"; // Default Base URL

    constructor(private config: SDKConfiguration) {
        if (config.baseUrl) {
            this.baseUrl = config.baseUrl; // Allow overriding in config
        }
    }

    /**
     * Create product
     * Creates a product.
     */
    async createProduct(
        requestBody: ProductRequestPOST,
        params: {
            prefer?: PreferParameter;
            paypalRequestId?: PaypalRequestIdParameter;
        } = {}
    ): Promise<Product> {
        // Validate request body
        ProductRequestPOSTSchema.parse(requestBody);

        // Validate parameters
        if (params.prefer) PreferParameterSchema.parse(params.prefer);
        if (params.paypalRequestId) PaypalRequestIdParameterSchema.parse(params.paypalRequestId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(params.prefer ? { 'Prefer': params.prefer } : {}),
            ...(params.paypalRequestId ? { 'PayPal-Request-Id': params.paypalRequestId } : {}),
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/catalogs/products`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Response Validation
        const parsedResponse = ProductSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * List products
     * Lists products.
     */
    async listProducts(
        params: {
            pageSize?: PageSizeParameter;
            page?: PageParameter;
            totalRequired?: TotalRequiredParameter;
        } = {}
    ): Promise<ProductCollection> {
        // Validate parameters
        if (params.pageSize) PageSizeParameterSchema.parse(params.pageSize);
        if (params.page) PageParameterSchema.parse(params.page);
        if (params.totalRequired) TotalRequiredParameterSchema.parse(params.totalRequired);

        const queryParams = new URLSearchParams();
        if (params.pageSize) queryParams.append('page_size', String(params.pageSize));
        if (params.page) queryParams.append('page', String(params.page));
        if (params.totalRequired) queryParams.append('total_required', String(params.totalRequired));

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/catalogs/products?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = ProductCollectionSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Show product details
     * Shows details for a product, by ID.
     */
    async getProduct(
        productId: ProductIdParameter
    ): Promise<Product> {
        // Validate parameters
        ProductIdParameterSchema.parse(productId);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        const response = await request(`${this.baseUrl}/v1/catalogs/products/${productId}`, {
            method: 'GET',
            headers: headers,
        });

        // Response Validation
        const parsedResponse = ProductSchema.parse(await response.json());
        return parsedResponse;
    }

    /**
     * Update product
     * Updates a product, by ID. You can patch these attributes and objects:<table><thead><tr><th>Attribute or object</th><th>Operations</th></tr></thead><tbody><tr><td><code>description</code></td><td>add, replace, remove</td></tr><tr><td><code>category</code></td><td>add, replace, remove</td></tr><tr><td><code>image_url</code></td><td>add, replace, remove</td></tr><tr><td><code>home_url</code></td><td>add, replace, remove</td></tr></tbody></table>
     */
    async patchProduct(
        productId: ProductIdParameter,
        requestBody: PatchRequest
    ): Promise<void> {
        // Validate parameters
        ProductIdParameterSchema.parse(productId);

        // Validate request body
        PatchRequestSchema.parse(requestBody);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}` // Example: API key auth
        };

        await request(`${this.baseUrl}/v1/catalogs/products/${productId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(requestBody),
        });
    }
}