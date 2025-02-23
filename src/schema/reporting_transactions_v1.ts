// reporting_transactions_v1 zod 

// Its json has 54 types(as per ai)
// Total Exported ZodSchemas 55

import { z } from 'zod';

// --- Shared Schemas ---

const ErrorDetailsSchema = z.object({
    field: z.string().optional(),
    value: z.string().optional(),
    location: z.enum(['body', 'path', 'query']).default('body').optional(),
    issue: z.string(),
    description: z.string().optional(),
});

const ErrorLocationSchema = z.enum(['body', 'path', 'query']).default('body');

const ErrorLinkDescriptionSchema = z.object({
    href: z.string().min(0).max(20000).regex(/^.*$/),
    rel: z.string().min(0).max(100).regex(/^.*$/),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const CurrencyCodeSchema = z.string().min(3).max(3);

const MoneySchema = z.object({
    currency_code: CurrencyCodeSchema,
    value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const PercentageSchema = z.string().max(10).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/).optional()

// --- Main Schemas ---

const Error400Schema = z.object({
    name: z.enum(['INVALID_REQUEST']).optional(),
    message: z.enum(['Request is not well-formed, syntactically incorrect, or violates schema.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error401Schema = z.object({
    name: z.enum(['AUTHENTICATION_FAILURE']).optional(),
    message: z.enum(['Authentication failed due to missing authorization header, or invalid authentication credentials.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error403Schema = z.object({
    name: z.enum(['NOT_AUTHORIZED']).optional(),
    message: z.enum(['Authorization failed due to insufficient permissions.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error404Schema = z.object({
    name: z.enum(['RESOURCE_NOT_FOUND']).optional(),
    message: z.enum(['The specified resource does not exist.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error409Schema = z.object({
    name: z.enum(['RESOURCE_CONFLICT']).optional(),
    message: z.enum(['The server has detected a conflict while processing this request.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error415Schema = z.object({
    name: z.enum(['UNSUPPORTED_MEDIA_TYPE']).optional(),
    message: z.enum(['The server does not support the request payload\'s media type.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error422Schema = z.object({
    name: z.enum(['UNPROCESSABLE_ENTITY']).optional(),
    message: z.enum(['The requested action could not be performed, semantically incorrect, or failed business validation.']).optional(),
    details: z.array(ErrorDetailsSchema).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error500Schema = z.object({
    name: z.enum(['INTERNAL_SERVER_ERROR']).optional(),
    message: z.enum(['An internal server error occurred.']).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const Error503Schema = z.object({
    name: z.enum(['SERVICE_UNAVAILABLE']).optional(),
    message: z.enum(['Service Unavailable.']).optional(),
    debug_id: z.string().optional(),
    links: z.array(ErrorLinkDescriptionSchema).optional(),
});

const ErrorDefaultSchema = z.union([
    z.lazy(() => Error400Schema),
    z.lazy(() => Error401Schema),
    z.lazy(() => Error403Schema),
    z.lazy(() => Error404Schema),
    z.lazy(() => Error409Schema),
    z.lazy(() => Error415Schema),
    z.lazy(() => Error422Schema),
    z.lazy(() => Error500Schema),
    z.lazy(() => Error503Schema)
]);

const TransactionInfoSchema = z.object({
    paypal_account_id: z.string().min(1).max(24).regex(/^[a-zA-Z0-9]*$/).optional(),
    transaction_id: z.string().min(1).max(24).regex(/^[a-zA-Z0-9]*$/).readonly().optional(),
    paypal_reference_id: z.string().min(1).max(24).regex(/^[a-zA-Z0-9]*$/).optional(),
    paypal_reference_id_type: z.enum(['ODR', 'TXN', 'SUB', 'PAP']).optional(),
    transaction_event_code: z.string().min(1).max(5).regex(/^[a-zA-Z0-9]*$/).optional(),
    transaction_initiation_date: DateTimeSchema.optional(),
    transaction_updated_date: DateTimeSchema.optional(),
    transaction_amount: MoneySchema.optional(),
    fee_amount: MoneySchema.optional(),
    discount_amount: MoneySchema.optional(),
    insurance_amount: MoneySchema.optional(),
    sales_tax_amount: MoneySchema.optional(),
    shipping_amount: MoneySchema.optional(),
    shipping_discount_amount: MoneySchema.optional(),
    shipping_tax_amount: MoneySchema.optional(),
    other_amount: MoneySchema.optional(),
    tip_amount: MoneySchema.optional(),
    transaction_status: z.string().min(1).max(1).regex(/^[a-zA-Z0-9]*$/).optional(),
    transaction_subject: z.string().min(1).max(256).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    transaction_note: z.string().min(1).max(4000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    payment_tracking_id: z.string().min(1).max(127).regex(/^[a-zA-Z0-9]*$/).optional(),
    bank_reference_id: z.string().min(1).max(127).regex(/^[a-zA-Z0-9]*$/).optional(),
    ending_balance: MoneySchema.optional(),
    available_balance: MoneySchema.optional(),
    invoice_id: z.string().min(1).max(127).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    custom_field: z.string().min(1).max(127).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    protection_eligibility: z.string().min(1).max(2).regex(/^[a-zA-Z0-9]*$/).optional(),
    credit_term: z.string().min(1).max(25).regex(/^[a-zA-Z0-9.]*$/).optional(),
    credit_transactional_fee: MoneySchema.optional(),
    credit_promotional_fee: MoneySchema.optional(),
    annual_percentage_rate: PercentageSchema.optional(),
    payment_method_type: z.string().min(1).max(20).regex(/^[a-zA-Z0-9-]*$/).optional(),
    instrument_type: z.string().min(1).max(64).optional(),
    instrument_sub_type: z.string().min(1).max(64).optional(),
});

const EmailAddressSchema = z.string().email().min(3).max(254);

const PhoneSchema = z.object({
    country_code: z.string().min(1).max(3).regex(/^[0-9]{1,3}?$/),
    national_number: z.string().min(1).max(14).regex(/^[0-9]{1,14}?$/),
    extension_number: z.string().min(1).max(15).regex(/^[0-9]{1,15}?$/).optional(),
});

const NameSchema = z.object({
    prefix: z.string().max(140).optional(),
    given_name: z.string().max(140).optional(),
    surname: z.string().max(140).optional(),
    middle_name: z.string().max(140).optional(),
    suffix: z.string().max(140).optional(),
    alternate_full_name: z.string().max(300).optional(),
    full_name: z.string().max(300).optional(),
});

const CountryCodeSchema = z.string().min(2).max(2).regex(/^([A-Z]{2}|C2)$/);

const AddressSchema = z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    country_code: CountryCodeSchema,
    postal_code: z.string().optional(),
});

const PayerInfoSchema = z.object({
    account_id: z.string().min(1).max(13).regex(/^[a-zA-Z0-9]*$/).optional(),
    email_address: EmailAddressSchema.optional(),
    phone_number: PhoneSchema.optional(),
    address_status: z.string().min(1).max(1).regex(/^[N|Y]$/).optional(),
    payer_status: z.string().min(1).max(1).regex(/^[N|Y]$/).optional(),
    payer_name: NameSchema.optional(),
    country_code: CountryCodeSchema.optional(),
    address: AddressSchema.optional(),
});

const ShippingInfoSchema = z.object({
    name: z.string().min(1).max(500).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    method: z.string().min(1).max(500).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    address: AddressSchema.optional(),
    secondary_shipping_address: AddressSchema.optional(),
});

const ItemDetailTaxAmountSchema = z.object({
    tax_amount: MoneySchema.optional(),
});

const CheckoutOptionSchema = z.object({
    checkout_option_name: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    checkout_option_value: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
});

const ItemDetailSchema = z.object({
    item_code: z.string().min(1).max(1000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    item_name: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    item_description: z.string().min(1).max(2000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    item_options: z.string().min(1).max(4000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    item_quantity: z.string().min(1).max(4000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    item_unit_price: MoneySchema.optional(),
    item_amount: MoneySchema.optional(),
    discount_amount: MoneySchema.optional(),
    adjustment_amount: MoneySchema.optional(),
    gift_wrap_amount: MoneySchema.optional(),
    tax_percentage: PercentageSchema.optional(),
    tax_amounts: z.array(ItemDetailTaxAmountSchema).min(1).max(32767).optional(),
    basic_shipping_amount: MoneySchema.optional(),
    extra_shipping_amount: MoneySchema.optional(),
    handling_amount: MoneySchema.optional(),
    insurance_amount: MoneySchema.optional(),
    total_item_amount: MoneySchema.optional(),
    invoice_number: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    checkout_options: z.array(CheckoutOptionSchema).min(1).max(32767).optional(),
});

const CartInfoSchema = z.object({
    item_details: z.array(ItemDetailSchema).min(1).max(32767).optional(),
    tax_inclusive: z.boolean().default(false).optional(),
    paypal_invoice_id: z.string().min(1).max(127).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
});

const StoreInfoSchema = z.object({
    store_id: z.string().min(1).max(100).regex(/^[a-zA-Z0-9]*$/).optional(),
    terminal_id: z.string().min(1).max(60).regex(/^[a-zA-Z0-9]*$/).optional(),
});

const AuctionInfoSchema = z.object({
    auction_site: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    auction_item_site: z.string().min(1).max(4000).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    auction_buyer_id: z.string().min(1).max(500).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    auction_closing_date: DateTimeSchema.optional(),
});

const IncentiveDetailSchema = z.object({
    incentive_type: z.string().min(1).max(500).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    incentive_code: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
    incentive_amount: MoneySchema.optional(),
    incentive_program_code: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_'\\\-., ":;\\!?]*$/).optional(),
});

const IncentiveInfoSchema = z.object({
    incentive_details: z.array(IncentiveDetailSchema).min(1).max(32767).optional(),
});

const TransactionDetailSchema = z.object({
    transaction_info: TransactionInfoSchema.optional(),
    payer_info: PayerInfoSchema.optional(),
    shipping_info: ShippingInfoSchema.optional(),
    cart_info: CartInfoSchema.optional(),
    store_info: StoreInfoSchema.optional(),
    auction_info: AuctionInfoSchema.optional(),
    incentive_info: IncentiveInfoSchema.optional(),
});

const LinkDescriptionSchema2 = z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const SearchResponseSchema = z.object({
    transaction_details: z.array(TransactionDetailSchema).min(1).max(2147483647).optional(),
    account_number: z.string().min(1).max(255).regex(/^[a-zA-Z0-9]*$/).optional(),
    start_date: DateTimeSchema.optional(),
    end_date: DateTimeSchema.optional(),
    last_refreshed_datetime: DateTimeSchema.optional(),
    page: z.number().int().min(0).max(2147483647).optional(),
    total_items: z.number().int().min(0).max(2147483647).optional(),
    total_pages: z.number().int().min(0).max(2147483647).optional(),
    links: z.array(LinkDescriptionSchema2).min(1).max(32767).readonly().optional()
});

const BalanceDetailSchema = z.object({
    currency: CurrencyCodeSchema,
    primary: z.boolean().optional(),
    total_balance: MoneySchema,
    available_balance: MoneySchema.optional(),
    withheld_balance: MoneySchema.optional()
});

const AccountIdSchema2 = z.string().min(13).max(13).regex(/^[2-9A-HJ-NP-Z]{13}$/);

const BalancesResponseSchema = z.object({
    balances: z.array(BalanceDetailSchema).min(0).max(200).optional(),
    account_id: AccountIdSchema2.optional(),
    as_of_time: DateTimeSchema.optional(),
    last_refresh_time: DateTimeSchema.optional()
});

// --- Parameters Schemas ---

const TransactionIdParameterSchema = z.string().min(17).max(19).optional()

const TransactionTypeParameterSchema = z.string().optional()

const TransactionStatusParameterSchema = z.string().optional()

const TransactionAmountParameterSchema = z.string().optional()

const TransactionCurrencyParameterSchema = z.string().optional()

const StartDateParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/)

const EndDateParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/)

const PaymentInstrumentTypeParameterSchema = z.string().optional()

const StoreIdParameterSchema = z.string().optional()

const TerminalIdParameterSchema = z.string().optional()

const FieldsParameterSchema = z.string().default("transaction_info").optional()

const BalanceAffectingRecordsOnlyParameterSchema = z.string().default("Y").optional()

const PageSizeParameterSchema = z.number().int().min(1).max(500).default(100).optional()

const PageParameterSchema = z.number().int().min(1).max(2147483647).default(1).optional()

const AsOfTimeParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/).optional()

const CurrencyCodeParameterSchema = z.string().min(3).max(3).optional()

// --- Exports ---

export {
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
    ErrorDefaultSchema,
    DateTimeSchema,
    CurrencyCodeSchema,
    MoneySchema,
    PercentageSchema,
    TransactionInfoSchema,
    EmailAddressSchema,
    PhoneSchema,
    NameSchema,
    CountryCodeSchema,
    AddressSchema,
    PayerInfoSchema,
    ShippingInfoSchema,
    ItemDetailTaxAmountSchema,
    CheckoutOptionSchema,
    ItemDetailSchema,
    CartInfoSchema,
    StoreInfoSchema,
    AuctionInfoSchema,
    IncentiveDetailSchema,
    IncentiveInfoSchema,
    TransactionDetailSchema,
    LinkDescriptionSchema2,
    SearchResponseSchema,
    BalanceDetailSchema,
    AccountIdSchema2,
    BalancesResponseSchema,
    TransactionIdParameterSchema,
    TransactionTypeParameterSchema,
    TransactionStatusParameterSchema,
    TransactionAmountParameterSchema,
    TransactionCurrencyParameterSchema,
    StartDateParameterSchema,
    EndDateParameterSchema,
    PaymentInstrumentTypeParameterSchema,
    StoreIdParameterSchema,
    TerminalIdParameterSchema,
    FieldsParameterSchema,
    BalanceAffectingRecordsOnlyParameterSchema,
    PageSizeParameterSchema,
    PageParameterSchema,
    AsOfTimeParameterSchema,
    CurrencyCodeParameterSchema
};