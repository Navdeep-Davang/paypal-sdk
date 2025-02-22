// customer_disputes_v1 zod

// Its json has 90 types (as per ai)
// Total Exported ZodSchemas 93

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

const LinkDescriptionSchema = z.object({
    href: z.string(),
    rel: z.string(),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "HEAD", "CONNECT", "OPTIONS", "PATCH"]).optional(),
});

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const DisputeReasonSchema = z.enum([
  "MERCHANDISE_OR_SERVICE_NOT_RECEIVED",
  "MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED",
  "UNAUTHORISED",
  "CREDIT_NOT_PROCESSED",
  "DUPLICATE_TRANSACTION",
  "INCORRECT_AMOUNT",
  "PAYMENT_BY_OTHER_MEANS",
  "CANCELED_RECURRING_BILLING",
  "PROBLEM_WITH_REMITTANCE",
  "OTHER"
]);

const StatusSchema = z.enum([
  "OPEN",
  "WAITING_FOR_BUYER_RESPONSE",
  "WAITING_FOR_SELLER_RESPONSE",
  "UNDER_REVIEW",
  "RESOLVED",
  "OTHER"
]);

const DisputeStateSchema = z.enum([
  "OPEN_INQUIRIES",
  "REQUIRED_ACTION",
  "REQUIRED_OTHER_PARTY_ACTION",
  "UNDER_PAYPAL_REVIEW",
  "APPEALABLE",
  "RESOLVED"
]);

const CurrencyCodeSchema = z.string().length(3);

const MoneySchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().max(32).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const CryptocurrencySymbolSchema = z.enum(["BTC", "ETH", "BCH", "LTC"]);

const CryptocurrencySchema = z.object({
  asset_symbol: CryptocurrencySymbolSchema,
  quantity: z.string().min(1).max(40).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
});

const DisputeLifecycleStageSchema = z.enum(["INQUIRY", "CHARGEBACK", "PRE_ARBITRATION", "ARBITRATION"]);

const DisputeChannelSchema = z.enum(["INTERNAL", "EXTERNAL", "ALERT"]);

const ItemTypeSchema = z.enum(["PRODUCT", "SERVICE", "BOOKING", "DIGITAL_DOWNLOAD"]);

const PaymentProcessorSchema = z.any();

const FeePolicySchema = z.object({});

const DisputeOutcomeSchema = z.object({
  outcome_code: z.enum([
    "RESOLVED_BUYER_FAVOUR",
    "RESOLVED_SELLER_FAVOUR",
    "RESOLVED_WITH_PAYOUT",
    "CANCELED_BY_BUYER",
    "ACCEPTED",
    "DENIED",
    "NONE"
  ]),
  amount_refunded: MoneySchema.optional(),
  asset_refunded: CryptocurrencySchema.optional(),
});

const MoneyMovementReasonSchema = z.enum([
  "DISPUTE_SETTLEMENT_FEE",
  "DISPUTE_SETTLEMENT",
  "DISPUTE_FEE",
  "CHARGEBACK_FEE"
]);

const DocumentSchema = z.object({
  name: z.string().min(1).max(2000).regex(/^[A-Za-z0-9-_,\s]+[.]{1}[A-Za-z]+$/).optional(),
  url: z.string().url().readonly().optional(),
});

const MerchantContactedOutcomeSchema = z.enum(["NO_RESPONSE", "FIXED", "NOT_FIXED"]);

const MerchantContactedModeSchema = z.enum(["WEBSITE", "PHONE", "EMAIL", "WRITTEN", "IN_PERSON"]);

const CountryCodeSchema = z.string().length(2).regex(/^([A-Z]{2}|C2)$/);

const ActionInfoSchema = z.object({
  action: z.enum([
    "ACKNOWLEDGE_RETURN_ITEM",
    "ACCEPT_CLAIM",
    "PROVIDE_EVIDENCE",
    "APPEAL",
    "CANCEL",
    "CHANGE_REASON",
    "ESCALATE"
  ]).optional(),
  response_option: z.string().optional(),
  mandatory: z.boolean().optional(),
});

const OfferTypeSchema = z.enum([
  "REFUND",
  "REFUND_WITH_RETURN",
  "REFUND_WITH_REPLACEMENT",
  "REPLACEMENT_WITHOUT_REFUND"
]);

// --- Main Schemas ---

const DisputeInfoSchema = z.object({
  dispute_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9-]+$/).readonly().optional(),
  create_time: DateTimeSchema.readonly().optional(),
  update_time: DateTimeSchema.readonly().optional(),
  reason: DisputeReasonSchema.optional(),
  status: StatusSchema.readonly().optional(),
  dispute_state: DisputeStateSchema.readonly().optional(),
  dispute_amount: MoneySchema.optional(),
  dispute_asset: CryptocurrencySchema.optional(),
  dispute_life_cycle_stage: DisputeLifecycleStageSchema.readonly().optional(),
  dispute_channel: DisputeChannelSchema.readonly().optional(),
  buyer_response_due_date: DateTimeSchema.readonly().optional(),
  seller_response_due_date: DateTimeSchema.readonly().optional(),
  links: z.array(z.lazy(() => LinkDescriptionSchema)).min(1).max(10).readonly().optional(),
});

const DisputeSearchSchema = z.object({
  items: z.array(DisputeInfoSchema).min(1).max(100).optional(),
  links: z.array(z.lazy(() => LinkDescriptionSchema)).min(1).max(10).readonly().optional(),
});

const BuyerSchema = z.object({
  name: z.string().min(1).max(2000).regex(/^[^~!@#$%^*()_{}:|\t\n/]+$/).optional(),
});

const EmailAddressSchema = z.string().email().min(3).max(254);

const SellerSchema = z.object({
  email: EmailAddressSchema.optional(),
  merchant_id: z.string().min(1).max(255).regex(/^[0-9A-Za-z]+$/).optional(),
  name: z.string().min(1).max(2000).regex(/^[^~!@#$%^*()_{}:|\t\n/]+$/).optional(),
});


// Item Product Details Schema - Empty object, so no properties
const ItemProductDetailsSchema = z.object({});

// Item Service Details Schema - Empty object, so no properties
const ItemServiceDetailsSchema = z.object({});

// Item Booking Details Schema - Empty object, so no properties
const ItemBookingDetailsSchema = z.object({});

// Item Digital Download Details Schema - Empty object, so no properties
const ItemDigitalDownloadDetailsSchema = z.object({});

// Item Cancellation Details Schema - Empty object, so no properties
const ItemCancellationDetailsSchema = z.object({});

// Item Agreed Refund Details Schema - Empty object, so no properties
const ItemAgreedRefundDetailsSchema = z.object({});

const ItemInfoSchema = z.object({
  item_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9]+$/).optional(),
  item_name: z.string().min(1).max(2000).optional(),
  item_description: z.string().min(1).max(2000).optional(),
  item_quantity: z.string().min(1).max(10).regex(/^[1-9][0-9]{0,9}$/).optional(),
  partner_transaction_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9]+$/).optional(),
  reason: DisputeReasonSchema.optional(),
  dispute_amount: MoneySchema.readonly().optional(),
  notes: z.string().min(1).max(2000).optional(),
  item_type: ItemTypeSchema.optional(),
  product_details: ItemProductDetailsSchema.optional(), 
  service_details: ItemServiceDetailsSchema.optional(), 
  booking_details: ItemBookingDetailsSchema.optional(), 
  digital_download_details: ItemDigitalDownloadDetailsSchema.optional(), 
  cancellation_details: ItemCancellationDetailsSchema.optional(), 
  agreed_refund_details: ItemAgreedRefundDetailsSchema.optional(), 
});

const TransactionInfoSchema = z.object({
  buyer_transaction_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9-]+$/).optional(),
  seller_transaction_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9-]+$/).optional(),
  reference_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9-]+$/).optional(),
  create_time: DateTimeSchema.optional(),
  transaction_status: z.enum([
    "COMPLETED",
    "UNCLAIMED",
    "DENIED",
    "FAILED",
    "HELD",
    "PENDING",
    "PARTIALLY_REFUNDED",
    "REFUNDED",
    "REVERSED",
    "CANCELLED"
  ]).optional(),
  gross_amount: MoneySchema.optional(),
  gross_asset: CryptocurrencySchema.optional(),
  invoice_number: z.string().min(1).max(127).regex(/^[A-Za-z0-9:\\-|]+$/).optional(),
  custom: z.string().min(1).max(2000).optional(),
  buyer: BuyerSchema.optional(),
  seller: SellerSchema.optional(),
  items: z.array(ItemInfoSchema).min(1).max(100).readonly().optional(),
  payment_processor: PaymentProcessorSchema.optional(),
});

const carrierNameSchema= z.enum([
  "UPS", "USPS", "FEDEX", "AIRBORNE_EXPRESS", "DHL", "AIRSURE", "ROYAL_MAIL", "PARCELFORCE", "SWIFTAIR", "OTHER",
  "UK_PARCELFORCE", "UK_ROYALMAIL_SPECIAL", "UK_ROYALMAIL_RECORDED", "UK_ROYALMAIL_INT_SIGNED", "UK_ROYALMAIL_AIRSURE",
  "UK_UPS", "UK_FEDEX", "UK_AIRBORNE_EXPRESS", "UK_DHL", "UK_OTHER", "UK_CANNOT_PROV_TRACK", "UK_CANNOT_PROVIDE_TRACKING",
  "CA_CANADA_POST", "CA_PUROLATOR", "CA_CANPAR", "CA_LOOMIS", "CA_TNT", "TNT", "CA_OTHER", "CA_CANNOT_PROV_TRACK",
  "DE_DP_DHL_WITHIN_EUROPE", "DE_DP_DHL_T_AND_T_EXPRESS", "DE_DHL_DP_INTL_SHIPMENTS", "CA_CANNOT_PROVIDE_TRACKING",
  "DE_GLS", " DE_DPD_DELISTACK", "DE_HERMES", "DE_UPS", "DE_FEDEX", "DE_TNT", "DE_OTHER", "FR_CHRONOPOST",
  "FR_COLIPOSTE", "FR_DHL", "FR_UPS", "FR_FEDEX", "FR_TNT", "FR_GLS", "FR_OTHER", "IT_POSTE_ITALIA",
  "IT_DHL", "IT_UPS", "IT_FEDEX", "IT_TNT", "IT_GLS", "IT_OTHER", "AU_AUSTRALIA_POST_EP_PLAT",
  "AU_AUSTRALIA_POST_EPARCEL", "AU_AUSTRALIA_POST_EMS", "AU_DHL", "AU_STAR_TRACK_EXPRESS", "AU_UPS", "AU_FEDEX",
  "AU_TNT", "AU_TOLL_IPEC", "AU_OTHER", "FR_SUIVI", "IT_EBOOST_SDA", "ES_CORREOS_DE_ESPANA", "ES_DHL",
  "ES_UPS", "ES_FEDEX", "ES_TNT", "ES_OTHER", "AT_AUSTRIAN_POST_EMS", "AT_AUSTRIAN_POST_PPRIME", "BE_CHRONOPOST",
  "BE_TAXIPOST", "CH_SWISS_POST_EXPRES", "CH_SWISS_POST_PRIORITY", "CN_CHINA_POST", "HK_HONGKONG_POST",
  "IE_AN_POST_SDS_EMS", "IE_AN_POST_SDS_PRIORITY", "IE_AN_POST_REGISTERED", "IE_AN_POST_SWIFTPOST", "IN_INDIAPOST",
  "JP_JAPANPOST", "KR_KOREA_POST", "NL_TPG", "SG_SINGPOST", "TW_CHUNGHWA_POST", "CN_CHINA_POST_EMS",
  "CN_FEDEX", "CN_TNT", "CN_UPS", "CN_OTHER", "NL_TNT", "NL_DHL", "NL_UPS", "NL_FEDEX", "NL_KIALA",
  "BE_KIALA", "PL_POCZTA_POLSKA", "PL_POCZTEX", "PL_GLS", "PL_MASTERLINK", "PL_TNT", "PL_DHL", "PL_UPS",
  "PL_FEDEX", "JP_SAGAWA_KYUU_BIN", "JP_NITTSU_PELICAN_BIN", "JP_KURO_NEKO_YAMATO_UNYUU", "JP_TNT", "JP_DHL",
  "JP_UPS", "JP_FEDEX", "NL_PICKUP", "NL_INTANGIBLE", "NL_ABC_MAIL", "HK_FOUR_PX_EXPRESS", "HK_FLYT_EXPRESS",
  "US_ASCENDIA", "US_ENSENDA", "US_GLOBEGISTICS", "US_ONTRAC", "RRDONNELLEY", "ASENDIA_UK", "UK_COLLECTPLUS",
  "UK_DPD", "UK_HERMESWORLD", "UK_INTERLINK_EXPRESS", "UK_TNT", "UK_UK_MAIL", "UK_YODEL", "BUYLOGIC",
  "CN_EMS", "CHINA_POST", "CNEXPS", "CPACKET", "CUCKOOEXPRESS", "CN_EC", "CN_EMPS", "DE_ASENDIA",
  "UK_DELTEC", "DE_DEUTSCHE", "DE_DPD", "RABEN_GROUP", "GLOBAL_TNT", "ADSONE", "AU_AU_POST",
  "BONDSCOURIERS", "COURIERS_PLEASE", "DTDC_AU", "AU_FASTWAY", "HUNTER_EXPRESS", "SENDLE", "AUS_TOLL",
  "TOLL", "UBI_LOGISTICS", "OMNIPARCEL", "QUANTIUM", "CN_SF_EXPRESS", "SEKOLOGISTICS", "HK_TAQBIN",
  "GB_APC", "CA_CANPAR_COURIER", "GLOBAL_ESTES", "CA_GREYHOUND", "PUROLATOR", "US_RL", "IT_BRT",
  "DMM_NETWORK", "IT_FERCAM", "HERMES_IT", "IT_POSTE_ITALIANE", "IT_SDA", "IT_SGT", "GLOBAL_SKYNET",
  "FR_BERT", "FR_COLIS", "FR_GEODIS", "FR_LAPOSTE", "FR_TELIWAY", "DPD_POLAND", "INPOST_PACZKOMATY",
  "POL_POCZTA", "POL_SIODEMKA", "ESP_CORREOS", "ES_CORREOS", "ESP_NACEX", "ESP_ASM", "ESP_REDUR",
  "CBL_LOGISTICA", "EKART", "IND_DELHIVERY", "IND_BLUEDART", "IND_DTDC", "IND_PROFESSIONAL_COURIERS",
  "IND_REDEXPRESS", "IND_XPRESSBEES", "IND_DOTZOT", "THA_KERRY", "SENDIT", "ACOMMERCE", "NINJAVAN_THAI",
  "NIM_EXPRESS", "THA_THAILAND_POST", "THA_DYNAMIC_LOGISTICS", "ALPHAFAST", "FASTRAK_TH", "EPARCEL_KR",
  "CJ_KOREA_THAI", "RINCOS", "KOR_KOREA_POST", "KOR_CJ", "KOR_ECARGO", "SREKOREA", "ROCKETPARCEL",
  "BG_BULGARIAN_POST", "JPN_JAPAN_POST", "JPN_YAMATO", "JPN_SAGAWA", "TUR_PTT", "AUT_AUSTRIAN_POST",
  "AU_AUSTRIAN_POST", "RUSSIAN_POST", "BEL_DHL", "FR_MONDIAL", "EU_BPOST", "LANDMARK_GLOBAL", "IDN_POS",
  "IDN_POS_INT", "IDN_JNE", "IDN_PANDU", "RPX", "IDN_TIKI", "IDN_LION_PARCEL", "NINJAVAN_ID",
  "IDN_WAHANA", "IDN_FIRST_LOGISTICS", "UK_AN_POST", "DPD", "UK_FASTWAY", "UK_NIGHTLINE", "WISELOADS",
  "GR_ELTA", "GRC_ACS", "GR_GENIKI", "NINJAVAN_PHILIPPINES", "PHL_XEND_EXPRESS", "PHL_LBC", "PHL_JAMEXPRESS",
  "PHL_AIRSPEED", "PHL_RAF", "DIRECTLOG", "BRA_CORREIOS", "NLD_DHL", "NLD_POSTNL", "NLD_GLS",
  "NLD_TRANSMISSION", "CORREOS_DE_MEXICO", "MEX_ESTAFETA", "MEX_SENDA", "MEX_REDPACK", "MEX_AEROFLASH",
  "NATIONWIDE_MY", "MYS_MYS_POST", "MYS_TAQBIN", "MYS_SKYNET", "MYS_CITYLINK", "MYS_AIRPAK", "NINJAVAN_MY",
  "KANGAROO_MY", "VNM_VIETNAM_POST", "VNPOST_EMS", "PRT_INT_SEUR", "PRT_CTT", "PRT_CHRONOPOST", "PRT_SEUR",
  "ADICIONAL", "LTU_LIETUVOS", "DPEX", "LWE_HK", "SG_SG_POST", "SG_TAQBIN", "SG_NINJAVAN", "SG_ZALORA",
  "JET_SHIP", "SG_PARCELPOST", "CHE_SWISS_POST", "ASENDIA_HK", "HUN_MAGYAR", "POSTNORD_LOGISTICS",
  "SWE_DIRECTLINK", "SWE_POSTNORD", "SWE_DB", "CZE_CESKA", "NZ_NZ_POST", "NZ_COURIER_POST", "FASTWAY_NZ",
  "TW_TAIWAN_POST", "SPREADEL", "ARE_EMIRATES_POST", "AXL", "CYP_CYPRUS_POST", "HRV_HRVATSKA", "NOR_POSTEN",
  "RAM", "THECOURIERGUY", "ZA_FASTWAY", "DPE_EXPRESS", "POSTI", "MATKAHUOLTO", "GLOBAL_DHL", "ARG_CORREO",
  "ARG_OCA", "POST_SERBIA", "BH_POSTA", "CORREOS_CHILE", "APR_72", "CORREOS_DE_COSTA_RICA", "POSTUR_IS",
  "SPEEDEXCOURIER", "ROU_POSTA", "UKR_NOVA", "UKR_POSHTA", "NGA_NIPOST", "NG_COURIERPLUS", "ESHOPWORLD",
  "WEBINTERPRET", "HERMES", "ABC_MAIL", "ARAMEX", "YANWEN", "INTERNATIONAL_BRIDGE", "SFC_LOGISTICS",
  "BQC_EXPRESS", "ONE_WORLD", "IT_REGISTER_MAIL", "WINIT", "CONTINENTAL", "EFS", "PANTOS", "RELAIS_COLIS",
  "US_DHL_EXPRESS", "US_DHL_PARCEL", "US_DHL_ECOMMERCE", "US_DHL_GLOBALFORWARDING", "UK_DHL_EXPRESS",
  "UK_DHL_PARCEL", "UK_DHL_GLOBALFORWARDING", "CN_DHL_EXPRESS", "CN_DHL_ECOMMERCE", "CN_DHL_GLOBALFORWARDING",
  "DE_DHL_EXPRESS", "DE_DHL_PARCEL", "DE_DHL_PACKET", "DE_DHL_ECOMMERCE", "DE_DHL_GLOBALFORWARDING",
  "DE_DHL_DEUTSCHEPOST", "AU_DHL_EXPRESS", "AU_DHL_ECOMMERCE", "AU_DHL_GLOBALFORWARDING", "HK_DHL_EXPRESS",
  "HK_DHL_ECOMMERCE", "HK_DHL_GLOBALFORWARDING", "CA_DHL_EXPRESS", "CA_DHL_ECOMMERCE", "CA_DHL_GLOBALFORWARDING",
  "IT_DHL_EXPRESS", "IT_DHL_ECOMMERCE", "IT_DHL_GLOBALFORWARDING", "FR_DHL_EXPRESS", "FR_DHL_PARCEL",
  "FR_DHL_GLOBALFORWARDING", "PL_DHL_EXPRESS", "PL_DHL_PARCEL", "PL_DHL_GLOBALFORWARDING", "ABC_PACKAGE",
  "AN_POST", "APC_OVERNIGHT", "ASM_ES", "AUPOST_CN", "ACOMMMERCE", "ADICIONAL_PT", "AIR_21",
  "AIRBORNE_EXPRESS_UK", "AIRPAK_MY", "AIRSPEED", "ASENDIA_DE", "ASENDIA_US", "AUSTRALIA_POST",
  "TOLL_AU", "AUSTRIAN_POST_EXPRESS", "AUSTRIAN_POST", "B_TWO_C_EUROPE", "BERT", "BPOST", "BRT_IT",
  "BLUEDART", "BONDS_COURIERS", "BPOST_INT", "BULGARIAN_POST", "CJ_LOGISTICS", "CJ_INT_MY", "CJ_MY",
  "CJ_TH", "CANADA_POST", "CANPAR", "CESKA_CZ", "CHRONOPOST_FR", "CHRONOPOST_PT", "CHUNGHWA_POST",
  "CITYLINK_MY", "COLIPOSTE", "COLIS", "COLLECTPLUS", "CORREOS_AG", "CORREOS_BR", "CORREOS_CL",
  "CORREOS_CR", "CORREOS_MX", "CORREOS_ES", "CORREOS_EXPRESS", "COURIERPLUS", "COURIER_POST",
  "CYPRUS_POST_CYP", "DBSCHENKER_SE", "DHL_ES", "DHL_ACTIVE_TRACING", "DHL_AU", "DHL_BENELUX",
  "DHL_DEUTSCHE_POST", "DHL_FR", "DHL_GLOBAL_ECOMMERCE", "DHL_HK", "DHL_IT", "DHL_JP", "DHL_NL",
  "DHL_PACKET", "DHL_PARCEL_NL", "DHL_PARCEL_ES", "DHL_PL", "DHL_SG", "DHL_UK", "DHL_GLOBAL_MAIL_ASIA",
  "DHL_GLOBAL_MAIL", "DHL_AT", "DPD_DELISTRACK", "DPD_FR", "DPD_DE", "DPD_HK", "DPD_IR",
  "DPD_LOCAL_REF", "DPD_LOCAL", "DPD_PL", "DPD_RO", "DPD_RU", "DPD_UK", "DTDC_EXPRESS",
  "DTDC_IN", "DAWN_WING", "DELHIVERY_IN", "DELTEC_DE", "DELTEC_UK", "DEUTSCHE_DE", "DIRECTLINK_SE",
  "DIRECTLOG_BR", "DOTZOT", "EC_CN", "ELTA_GR", "EMPS_CN", "EMS_CN", "ECARGO", "EMIRATES_POST",
  "ENSENDA", "ESTAFETA", "ESTES", "FERCAM_IT", "FLYT_EXPRESS", "FASTRACK", "FASTWAY_US",
  "FASTWAY_ZA", "FASTWAY_UK", "FASTWAY_AU", "FIRST_LOGISITCS", "FOUR_PX_EXPRESS", "GEODIS",
  "GLS_CZ", "GLS_FR", "GLS_DE", "GLS_IT", "GLS_NL", "GLS_ES", "GLS", "ACS_GR", "GENIKI_GR",
  "GLOBEGISTICS", "GREYHOUND", "HERMES_DE", "HERMESWORLD_UK", "HK_POST", "HRVATSKA_HR", "HUAHAN_EXPRESS",
  "IMX", "ITIS", "INDIA_POST", "INTERLINK", "INT_SEUR", "INT_SUER", "ISRAEL_POST", "JNE_IDN",
  "JAMEXPRESS_PH", "JAPAN_POST", "JP_POST", "JETSHIP_MY", "JETSHIP_SG", "KERRY_EXPRESS_VN",
  "KERRY_EXPRESS_HK", "KERRY_EXPRESS_TH", "KIALA", "KOREA_POST", "CJ_KR", "LAPOSTE", "LBC_PH",
  "LIETUVOS_LT", "LION_PARCEL", "LOGISTICSWORLDWIDE_HK", "LOGISTICSWORLDWIDE_KR", "LOGISTICSWORLDWIDE_MY",
  "LOOMIS", "MONDIAL", "MAGYAR_HU", "MALAYSIA_POST", "MASTERLINK", "AEROFLASH", "REDPACK",
  "SENDA_MX", "MONDIAL_BE", "MYHERMES", "NACEX_ES", "NATIONWIDE", "NZ_POST", "NIPOST_NG",
  "NIGHTLINE_UK", "NINJAVAN_PH", "NINJAVAN_SG", "NOVA_POSHTA_INT", "NOVA_POSHTA", "OCA_AR",
  "ONTRAC", "PTT_POST", "PANDU", "PARCELPOST_SG", "POCZTA_POLSKA", "POCZTEX", "CTT_PT",
  "SEUR_PT", "POS_ID", "POS_INT", "POSTNL_INT_3_S", "POSTNL", "POSTNL_INT", "POSTNORD_LOGISTICS_DK",
  "POSTNORD_LOGISTICS_SE", "POSTNORD_LOGISTICS_GLOBAL", "POSTA_RO", "POSTE_ITALIANE", "POSTEN_NORGE",
  "PROFESSIONAL_COURIERS", "RAF_PH", "RL_US", "RPD_2_MAN", "RPX_ID", "REDEXPRESS", "REDUR_ES",
  "REGISTER_MAIL_IT", "RELAIS_COLIS_FR", "ROCKET_PARCEL", "SDA_IT", "SF_EXPRESS", "SFC_EXPRESS",
  "SGT_IT", "SRE_KOREA", "SAGAWA", "SAGAWA_JP", "POST_SERBIA_CS", "SINGPOST", "SIODEMKA",
  "SKYNET_WORLDWIDE", "SKYNET_MY", "SKYNET_UAE", "SKYNET_UK", "SEUR_ES", "STARTRACK_EXPRESS",
  "STARTRACK", "SWISS_POST", "TNT_AU", "TNT_CN", "TNT_CLICK_IT", "TNT_FR", "TNT_DE",
  "TNT_IT", "TNT_JP", "TNT_NL", "TNT_PL", "TNT_ES", "TNT_UK", "TPG", "TAIWAN_POST_TW",
  "TAQBIN_HK", "TAQBIN_MY", "TAQBIN_SG", "TAXIPOST", "TELIWAY", "THAILAND_POST", "THE_COURIER_GUY",
  "TIKI_ID", "TOLL_IPEC", "TWO_GO", "TRANSMISSION", "UK_MAIL", "UPS_MI", "VIETNAM_POST",
  "WAHANA_ID", "XEND_EXPRESS_PH", "XPRESSBEES", "YAMATO", "YANWEN_CN", "YODEL", "UPS_CANADA",
  "UPS_MAIL_INNOVATIONS", "DE_DELTEC", "DE_INTERNATIONALSEUR", "FR_DPD", "FR_IMX", "IT_IMX",
  "AU_DTDC", "AU_SENDLE", "AU_SKYNET", "ES_GLS", "ES_INTERNATIONALSEUR", "ES_IMX", "CN_HUAHANEXPRESS",
  "LOCAL_PICKUP", "HK_DPEX", "HK_KERRYEXPRESS", "HK_LOGISTICSWORLDWIDEEXPRESS", "HK_RPX", "HK_SPREADEL",
  "IN_SPREADEL", "TH_CJ", "KR_LOGISTICSWORLDWIDE", "AT_DHL", "BE_IMX", "MY_LOGISTICSWORLDWIDE",
  "MY_JETSHIP", "SG_DHL", "SG_SPREADEL", "POSTAROMANA", "US_PUROLATOR", "US_FASTWAY", "CHRONOPOST",
  "CORREOS_DE_ESPANA", "DEUTSCHE_POST_DHL", "EBOOST_SDA", "HONGKONG_POST", "INTANGIBLE_DIGITAL_SERVICES",
  "LA_POSTE", "LA_POSTE_SUIVI", "NEKO_YAMATO_UNYUU", "NITTSU_PELICAN_BIN", "POSTE_ITALIA",
  "SAGAWA_KYUU_BIN", "STAR_TRACK_EXPRESS", "US_DTDC", "US_STARTRACK", "ISR_ISRAEL_POST", "BE_MONDIAL",
  "B_2_CEUROPE", "PHL_2_GO", "PHL_AIR_21", "PT_SPANISH_SEUR", "ES_SPANISH_SEUR", "SG_DPEX",
  "CH_IMX", "DHLG", "RUSTON", "MIKROPAKKET", "XPOST", "PAN_ASIA", "PARCELONE", "SPEEDEE",
  "VENIPAK", "CROSHOT", "SHREENANDANCOURIER", "EPST_GLBL", "NEWGISTICS", "POST_SLOVENIA",
  "JERSEY_POST", "WMG", "BOMBINOEXP", "XQ_EXPRESS", "FURDECO", "LEGION_EXPRESS", "YDH_EXPRESS",
  "LHT_EXPRESS", "SOUTH_AFRICAN_POST_OFFICE", "GRUPO", "SPOTON", "DIMERCO", "INTERPARCEL_UK",
  "ABCUSTOM", "IND_DELIVREE", "GLOBAL_ABF", "CN_BESTEXPRESS", "DX_SFTP", "PICKUPP_MYS",
  "XPERT_DELIVERY", "FMX", "HELLMANN", "DHL_REFR", "DHL_HK", "SHIP_IT_ASIA", "KERRY_ECOMMERCE",
  "GOJEK", "FRETERAPIDO", "YODEL_INTNL", "CFL_LOGISTICS", "PITNEY_BOWES", "ZA_SPECIALISED_FREIGHT",
  "JANCO", "XPRESSEN_DK", "YTO", "RPD2MAN", "SEUR_SP_API", "DELIVERYONTIME", "WISE_EXPRESS",
  "JINSUNG", "JTEXPRESS_VN", "CHUKOU1", "TRANS_KARGO", "FEDEX_INTL_MLSERV", "SWISHIP_DE",
  "IVOY_WEBHOOK", "AIRMEE_WEBHOOK", "VAMOX", "FIRSTMILE", "AMS_GRP", "FASTWAY_IR", "HH_EXP",
  "HRPARCEL", "MYS_MYPOST_ONLINE", "GESWL", "BLUESTAR", "TIPSA", "CDEK_TR", "KGMHUB",
  "INTEXPRESS", "DESCARTES", "OVERSE_EXP", "ONECLICK", "ROADRUNNER_FREIGHT", "GLS_CROTIA",
  "TOURLINE", "MRW_FTP", "BH_WORLDWIDE", "BLUEX", "DYLT", "OCS", "YINGNUO_LOGISTICS",
  "SIN_GLBL", "TUFFNELLS_REFERENCE", "CJPACKET", "MILKMAN", "FIEGE_NL", "ASIGNA", "ONEWORLDEXPRESS",
  "LTIANEXP", "KWE_GLOBAL", "CTC_EXPRESS", "LAO_POST", "EU_IMX", "GLS_SLOV", "AMAZON",
  "MORE_LINK", "JX", "MYS_EMS", "EASY_MAIL", "ADUIEPYLE", "GB_PANTHER", "SG_DETRACK",
  "EXPRESSSALE", "DICOM", "MATDESPATCH", "TRUNKRS_WEBHOOK", "WESTBANK_COURIER", "MBW",
  "KHM_CAMBODIA_POST", "FEDEX_CROSSBORDER", "JANIO", "SINOTRANS", "BRT_IT_PARCELID", "A1POST",
  "DHL_SUPPLY_CHAIN", "TAZMANIAN_FREIGHT", "TOPYOU", "PALEXPRESS", "SAIA_FREIGHT", "CN_WEDO",
  "FULFILLME", "SG_QXPRESS", "UPS_REFERENCE", "NHANS_SOLUTIONS", "CARIBOU", "LOCUS_WEBHOOK",
  "DSV", "CN_GOFLY", "COORDINADORA", "P2P_TRC", "ANDREANI", "DIRECTPARCELS", "DOORA",
  "FEDEX_POLAND", "INTERPARCEL_NZ", "XDP_UK_REFERENCE", "ETOMARS", "CN_JCEX", "IND_ECOM",
  "FAR_INTERNATIONAL", "ESP_ENVIALIA", "IDEXPRESS", "GANGBAO", "SMSA_EXPRESS", "NEWAY",
  "DEX_I", "DESIGNERTRANSPORT_WEBHOOK", "BUDBEE_WEBHOOK", "GLS_SLOVEN", "PARCELLED_IN",
  "COPA_COURIER", "GSI_EXPRESS", "CON_WAY", "BROUWER_TRANSPORT", "TOLL_NZ", "CPEX", "ECHO",
  "FEDEX_FR", "XDE_WEBHOOK", "TOLOS", "BORDEREXPRESS", "GIAO_HANG", "MAILPLUS_JPN",
  "GEODIS_ESPACE", "TNT_UK_REFR", "DOORDASH_WEBHOOK", "KEC", "CJ_HK_INTERNATIONAL", "HELTHJEM",
  "ZA_COURIERIT", "SFB2C", "FREIGHTQUOTE", "FR_EXAPAQ", "LANDMARK_GLOBAL_REFERENCE", "PARCEL2GO",
  "DELNEXT", "TCK_EXPRESS", "ENDEAVOUR_DELIVERY", "NANJINGWOYUAN", "HEPPNER_FR", "PICKRR",
  "FONSEN", "APC_OVERNIGHT_CONNUM", "STAR_TRACK_NEXT_FLIGHT", "UPS_FREIGHT", "DAJIN",
  "POSTA_PLUS", "CEVA", "ORANGE_DS", "ANSERX", "JS_EXPRESS", "PADTF", "GAC", "EZSHIP",
  "GEIS", "SYPOST", "AMAZON_SHIP_MCF", "SF_EX", "YUSEN", "ESP_MRW", "BRING", "PAGO",
  "AO_COURIER", "GBA", "DIAMOND_EUROGISTICS", "NEWEGGEXPRESS", "LALAMOVE", "SPEEDCOURIERS_GR",
  "CORPORATECOURIERS_WEBHOOK", "FORRUN", "PICKUP", "BOND", "ECMS", "INTELIPOST", "SK_POSTA",
  "FLASHEXPRESS", "FETCHR_WEBHOOK", "CN_STO", "SEKO_SFTP", "THEDELIVERYGROUP", "CELLO_SQUARE",
  "HOME_DELIVERY_SOLUTIONS", "DPD_HGRY", "KERRYTTC_VN", "TARRIVE", "JOYING_BOX", "COLLIVERY",
  "TOTAL_EXPRESS", "ZJS_EXPRESS", "STARKEN", "MAINFREIGHT", "IND_FIRSTFLIGHT", "BE_BPOST",
  "DEMANDSHIP", "CN_DPEX", "ACSWORLDWIDE", "LOGISTERS", "GOGLOBALPOST", "AMSTAN", "OKAYPARCEL",
  "I_DIKA", "ENVIALIA_REFERENCE", "PAACK_WEBHOOK", "GRAB_WEBHOOK", "PARCELPOINT", "ICUMULUS",
  "FDSEXPRESS", "DAIGLOBALTRACK", "CNDEXPRESS", "GLOBAL_IPARCEL", "AMAZON_FBA_SWISHIP", "WYNGS",
  "YURTICI_KARGO", "CN_PAYPAL_PACKAGE", "PARCEL_2_POST", "ZYLLEM", "VIA_EXPRESS", "WIZMO",
  "TIGFREIGHT", "PIL_LOGISTICS", "ZTO_EXPRESS", "HEPPNER", "GENERAL_OVERNIGHT", "HAPPY2POINT",
  "ARCO_SPEDIZIONI", "CHITCHATS", "IML", "SMOOTH", "INTEL_VALLEY", "CLE_LOGISTICS", "FIEGE",
  "MX_CARGO", "ZIINGFINALMILE", "TCS", "DAYTON_FREIGHT", "ROADBULL", "YODEL_DIR", "STONE3PL",
  "PARCELPAL_WEBHOOK", "DHL_ECOMERCE_ASA", "SIMPLYPOST", "KY_EXPRESS", "SHENZHEN", "UC_EXPRE",
  "US_LASERSHIP", "DIDADI", "DYNALOGIC", "DBSCHENKER_B2B", "MXE", "PFCEXPRESS", "WHISTL",
  "CAE_DELIVERS", "WEPOST", "ALLIEDEXPRESS", "SHIPPIT", "DDEXPRESS", "ARAMEX_AU", "TFM",
  "BNEED", "M_XPRESS", "HK_TGX", "LATVIJAS_PASTS", "HDB_BOX", "VIAEUROPE", "CORREO_UY",
  "CLEVY_LINKS", "IBEONE", "J_NET", "RCL", "6LS", "CGS_EXPRESS", "BLR_BELPOST", "BIRDSYSTEM",
  "DOBROPOST", "SAP_EXPRESS", "WEASHIP", "SONICTL", "KWT", "AFLLOG_FTP", "IND_SAFEEXPRESS",
  "TOPHATTEREXPRESS", "SEINO", "MGLOBAL", "SZENDEX", "AVERITT", "DBSCHENKER_SV", "LEADER",
  "AO_DEUTSCHLAND", "2EBOX", "EU_FLEET_SOLUTIONS", "SG_SPEEDPOST", "PCFCORP", "AERONET",
  "LINKBRIDGE", "DE_DEUTSCHE_POST_DHL_WITHIN_EUROPE_TRACKNET", "PRIMAMULTICIPTA", "ISR_POST_DOMESTIC",
  "COUREX", "ZAJIL_EXPRESS", "BESTWAYPARCEL", "COLLECTCO", "AEX", "JTEXPRESS", "FEDEX_UK",
  "USHIP", "ROUTIFIC_WEBHOOK", "GLOBAL_EXPRESS", "BRT_IT_SENDER_REF", "GLOBAVEND", "PIXSELL",
  "SHIPTOR", "CDEK", "VNM_VIETTELPOST", "PHL_AIR21", "PALLET_NETWORK", "CJ_CENTURY", "UK_XDP",
  "GSO", "VIWO", "SKYBOX", "PAPER_EXPRESS", "KERRYTJ", "NTLOGISTICS_VN", "SDH_SCM", "PALLETWAYS",
  "NOX_NACHTEXPRESS", "ZINC", "DPE_SOUTH_AFRC", "LOGISTIKA", "CELERITAS", "PRESSIODE",
  "SHREE_MARUTI", "PARCELINKLOGISTICS", "EFEX", "LOTTE", "LONESTAR", "GB_NORSK", "APRISAEXPRESS",
  "BEL_RS", "OSM_WORLDWIDE", "SAILPOST", "MAILAMERICAS", "WESTGATE_GL", "DTD_EXPR", "ALFATREX",
  "THABIT_LOGISTICS", "PROMEDDELIVERY", "PAQUETEXPRESS", "NEWZEALAND_COURIERS", "LIEFERY",
  "JOOM_LOGIS", "STRECK_TRANSPORT", "HCT_LOGISTICS", "ZA_FASTWAY", "CARRY_FLAP", "PONY_EXPRESS",
  "US_OLD_DOMINION", "ANICAM_BOX", "ALWAYS_EXPRESS", "WANBEXPRESS", "AUS_STARTRACK", "GBS_BROKER",
  "STALLIONEXPRESS", "RAIDEREX", "ALLJOY", "SHOPFANS", "KYUNGDONG_PARCEL", "CHAMPION_LOGISTICS",
  "PICKUPP_SGP", "DEALERSEND", "MORNING_EXPRESS", "NACEX", "THENILE_WEBHOOK", "JOCOM", "HOLISOL",
  "LBCEXPRESS_FTP", "CSE", "TFORCE_FINALMILE", "KURASI", "GEMWORLDWIDE", "SHIP_GATE", "USF_REDDAWAY",
  "SHIPTER", "NATIONAL_SAMEDAY", "APG", "CN_BOXC", "YUNEXPRESS", "INTEGRA2_FTP", "CAINIAO",
  "ECOSCOOTING", "DMS_MATRIX", "MAINWAY", "ASENDIA_USA", "PAPERFLY", "HOUNDEXPRESS", "3JMSLOGISTICS",
  "EP_BOX", "BOX_BERRY", "LICCARDI_EXPRESS", "PLUS_LOG_UK", "FULFILLA", "SKY_POSTAL", "ASE",
  "CNWANGTONG", "PITTOHIO", "MAIL_PLUS", "XPO_LOGISTICS", "WNDIRECT", "CLOUDWISH_ASIA", "ZELERIS",
  "MARA_XPRESS", "GIO_EXPRESS", "OCS_WORLDWIDE", "DESTINY", "ARK_LOGISTICS", "DE_DPD_DELISTRACK",
  "COMET_TECH", "DHL_PARCEL_RU", "AQUILINE", "PILOT_FREIGHT", "TNT_REFR", "QWINTRY", "DANSKE_FRAGT",
  "SHREE_ANJANI_COURIER", "CARRIERS", "AIR_CANADA_GLOBAL", "PRESIDENT_TRANS", "STEPFORWARDFS",
  "ESHIPPING", "SHREETIRUPATI", "HX_EXPRESS", "INDOPAKET", "CN_17POST", "K1_EXPRESS", "CJ_GLS",
  "MYS_GDEX", "NATIONEX", "CN_EQUICK", "ANJUN", "VIRTRANSPORT", "FARGOOD", "SMG_EXPRESS",
  "RZYEXPRESS", "SEFL", "HIPSHIPPER", "HDB", "RPXLOGISTICS", "MIKROPAKKET_BE", "KUEHNE",
  "IT_NEXIVE", "PTS", "ETS_EXPRESS", "SWISS_POST_FTP", "COLIS_PRIVE", "FASTRK_SERV", "4_72",
  "US_YRC", "CN_YUNDA", "POSTNL_INTL_3S", "AAA_COOPER", "ELIAN_POST", "CUBYN", "SAU_SAUDI_POST",
  "360LION", "ABXEXPRESS_MY", "NINJAVAN_WB", "ESP_PACKLINK", "IND_JAYONEXPRESS", "GB_ARROW",
  "ZES_EXPRESS", "IND_GOJAVAS", "ZEPTO_EXPRESS", "SKYNET_ZA", "KPOST", "ZEEK_2_DOOR",
  "DHL_FREIGHT", "BLUECARE", "BLINKLASTMILE", "POSTA_UKR", "LOGISTYX_TRANSGROUP", "JINDOUYUN",
  "CHROBINSON", "TRACKON", "CN_POST56", "GB_TUFFNELLS", "COURANT_PLUS", "SCUDEX_EXPRESS",
  "SHIPENTEGRA", "TRUMPCARD", "CHOIR_EXP", "ETOTAL", "COPE", "SFPLUS_WEBHOOK", "IND_GATI",
  "HERMES_2MANN_HANDLING", "CN_WISHPOST", "GLOBALTRANZ", "HKD", "UDS", "BJSHOMEDELIVERY",
  "YAKIT", "LEXSHIP", "OMNIVA", "SUTTON", "COSTMETICSNOW", "PANTHER_REFERENCE",
  "SFCSERVICE", "PFLOGISTICS", "LTL", "LOOMIS_EXPRESS", "PARKNPARCEL", "SPRING_GDS",
  "GLS_ITALY", "ECEXPRESS", "LINE", "INTERPARCEL_AU", "GEL_EXPRESS", "AGILITY",
  "XL_EXPRESS", "ADERONLINE", "DIRECTCOURIERS", "PLANZER", "NOX_NIGHT_TIME_EXPRESS", "SENDING", 
  "HUODULL"
])  

const TrackingInfoSchema = z.object({
  carrier_name: carrierNameSchema,
  carrier_name_other: z.string().min(1).max(2000).optional(),
  tracking_url: z.string().url().optional(),
  tracking_number: z.string().min(1).max(255),
});

const EvidenceInfoSchema = z.object({
  tracking_info: z.array(TrackingInfoSchema).min(1).max(10).optional(),
  refund_ids: z.array(z.string().min(1).max(255)).min(1).max(100).optional(),
});

const EvidenceSchema = z.object({
  evidence_type: z.enum([
    "PROOF_OF_FULFILLMENT",
    "PROOF_OF_REFUND",
    "PROOF_OF_DELIVERY_SIGNATURE",
    "PROOF_OF_RECEIPT_COPY",
    "RETURN_POLICY",
    "BILLING_AGREEMENT",
    "PROOF_OF_RESHIPMENT",
    "ITEM_DESCRIPTION",
    "POLICE_REPORT",
    "AFFIDAVIT",
    "PAID_WITH_OTHER_METHOD",
    "COPY_OF_CONTRACT",
    "TERMINAL_ATM_RECEIPT",
    "PRICE_DIFFERENCE_REASON",
    "SOURCE_CONVERSION_RATE",
    "BANK_STATEMENT",
    "CREDIT_DUE_REASON",
    "REQUEST_CREDIT_RECEIPT",
    "PROOF_OF_RETURN",
    "CREATE",
    "CHANGE_REASON",
    "PROOF_OF_REFUND_OUTSIDE_PAYPAL",
    "RECEIPT_OF_MERCHANDISE",
    "CUSTOMS_DOCUMENT",
    "CUSTOMS_FEE_RECEIPT",
    "INFORMATION_ON_RESOLUTION",
    "ADDITIONAL_INFORMATION_OF_ITEM",
    "DETAILS_OF_PURCHASE",
    "PROOF_OF_SIGNIFICANT_DIFFERENCE",
    "PROOF_OF_SOFTWARE_OR_SERVICE_NOT_AS_DESCRIBED",
    "PROOF_OF_CONFISCATION",
    "PROOF_OF_DAMAGE",
    "COPY_OF_LAW_ENFORCEMENT_AGENCY_REPORT",
    "ADDITIONAL_PROOF_OF_SHIPMENT",
    "PROOF_OF_DENIAL_BY_CARRIER",
    "THIRDPARTY_PROOF_FOR_DAMAGE_OR_SIGNIFICANT_DIFFERENCE",
    "VALID_SUPPORTING_DOCUMENT",
    "LEGIBLE_SUPPORTING_DOCUMENT",
    "RETURN_TRACKING_INFORMATION",
    "DELIVERY_RECEIPT",
    "PROOF_OF_INSTORE_RECEIPT",
    "ADDITIONAL_TRACKING_INFORMATION",
    "PROOF_OF_SHIPMENT_POSTAGE",
    "ONLINE_TRACKING_INFORMATION",
    "PROOF_OF_INSTORE_REFUND",
    "PROOF_FOR_SOFTWARE_OR_SERVICE_DELIVERED",
    "RETURN_ADDRESS_FOR_SHIPPING",
    "COPY_OF_THE_EPARCEL_MANIFEST",
    "COPY_OF_SHIPPING_MANIFEST",
    "APPEAL_AFFIDAVIT",
    "RECEIPT_OF_REPLACEMENT",
    "COPY_OF_DRIVERS_LICENSE",
    "ACCOUNT_CHANGE_INFORMATION",
    "DELIVERY_ADDRESS",
    "CONFIRMATION_OF_RESOLUTION",
    "MERCHANT_RESPONSE",
    "PERMISSION_DESCRIPTION",
    "STATUS_OF_MERCHANDISE",
    "LOST_CARD_DETAILS",
    "LAST_VALID_TRANSACTION_DETAILS",
    "ADDITIONAL_PROOF_OF_RETURN",
    "DECLARATION",
    "PROOF_OF_MISSING_ITEMS",
    "PROOF_OF_EMPTY_PACKAGE_OR_DIFFERENT_ITEM",
    "PROOF_OF_ITEM_NOT_RECEIVED",
    "ORDER_DETAILS",
    "LISTING_URL",
    "SHIPPING_INSURANCE",
    "BUYER_RESPONSE",
    "PHOTOS_OF_SHIPPED_ITEM",
    "OTHER"
  ]),
  evidence_info: EvidenceInfoSchema.optional(),
  documents: z.array(DocumentSchema).min(1).max(100).optional(),
  notes: z.string().optional(),
  source: z.enum([
    "REQUESTED_FROM_BUYER",
    "REQUESTED_FROM_SELLER",
    "SUBMITTED_BY_BUYER",
    "SUBMITTED_BY_SELLER",
    "SUBMITTED_BY_PARTNER"
  ]).readonly().optional(),
  date: DateTimeSchema.readonly().optional(),
  item_id: z.string().min(1).max(255).regex(/^[A-Za-z0-9]+$/).optional(),
  item_type: ItemTypeSchema.readonly().optional(),
  action_info: z.lazy(() => ActionInfoSchema).readonly().optional(),
  dispute_life_cycle_stage: DisputeLifecycleStageSchema.readonly().optional(),
});

const AcknowledgeReturnItemResponseOptionsSchema = z.object({
  acknowledgement_types: z.array(z.enum([
    "ITEM_RECEIVED",
    "ITEM_NOT_RECEIVED",
    "DAMAGED",
    "EMPTY_PACKAGE_OR_DIFFERENT",
    "MISSING_ITEMS"
  ])).min(1).max(10).optional(),
});

const AcceptClaimTypeSchema = z.enum([
  "REFUND",
  "REFUND_WITH_RETURN",
  "PARTIAL_REFUND",
  "REFUND_WITH_RETURN_SHIPMENT_LABEL"
]);

const AcceptClaimResponseOptionsSchema = z.object({
  accept_claim_types: z.array(AcceptClaimTypeSchema).min(1).max(10).optional(),
});

const MakeOfferResponseOptionsSchema = z.object({
  offer_types: z.array(OfferTypeSchema).min(1).max(10).optional(),
});

const AllowedResponseOptionsSchema = z.object({
  acknowledge_return_item: AcknowledgeReturnItemResponseOptionsSchema.optional(),
  accept_claim: AcceptClaimResponseOptionsSchema.optional(),
  make_offer: MakeOfferResponseOptionsSchema.optional(),
});

const OfferHistorySchema = z.object({
  offer_time: DateTimeSchema.optional(),
  actor: z.enum(["BUYER", "SELLER"]).optional(),
  event_type: z.enum(["PROPOSED", "ACCEPTED", "DENIED"]).optional(),
  offer_type: OfferTypeSchema.optional(),
  offer_amount: MoneySchema.optional(),
  notes: z.string().readonly().optional(),
  dispute_life_cycle_stage: DisputeLifecycleStageSchema.readonly().optional(),
});

const OfferSchema = z.object({
  buyer_requested_amount: MoneySchema.optional(),
  seller_offered_amount: MoneySchema.optional(),
  offer_type: OfferTypeSchema.optional(),
  history: z.array(OfferHistorySchema).min(1).max(1000).optional(),
});

const RefundDetailsSchema = z.object({
  allowed_refund_amount: MoneySchema.optional(),
});

const CommunicationDetailsSchema = z.object({
  email: EmailAddressSchema.optional(),
  note: z.string().min(1).max(2000).optional(),
  time_posted: DateTimeSchema.readonly().optional(),
});

const SupportingInfoSchema = z.object({
  notes: z.string().readonly().optional(),
  documents: z.array(DocumentSchema).min(1).max(100).readonly().optional(),
  source: z.enum(["SUBMITTED_BY_BUYER", "SUBMITTED_BY_SELLER", "SUBMITTED_BY_PARTNER"]).readonly().optional(),
  provided_time: DateTimeSchema.readonly().optional(),
  dispute_life_cycle_stage: DisputeLifecycleStageSchema.readonly().optional(),
});

const AdjudicationTypeSchema = z.enum(["DENY_BUYER", "PAYOUT_TO_BUYER", "PAYOUT_TO_SELLER", "RECOVER_FROM_SELLER"])

const AdjudicationReasonSchema = z.enum([
  "AMOUNT_DIFFERENCE_EXPECTED_DUE_TO_FEES",
  "BILLING_AGREEMENT_CHANGE_DISCLOSED",
  "BILLING_AGREEMENT_CHANGE_NOT_DISCLOSED",
  "BILLING_AGREEMENT_DATE_CHANGE_DISCLOSED",
  "BILLING_AGREEMENT_DATE_CHANGE_NOT_DISCLOSED",
  "BUYER_ATTEMPTED_RETURN",
  "BUYER_BILLED_ONLY_ONCE",
  "BUYER_CANCELLED_CASE",
  "BUYER_CANCELLED_SERVICE",
  "BUYER_FAILED_TO_DESCRIBE_ISSUE",
  "BUYER_HAS_POSSESSION_OF_THE_MERCHANDISE_OR_SERVICE",
  "BUYER_MADE_NO_ATTEMPT_TO_RESOLVE_WITH_SELLER",
  "BUYER_NOT_IN_POSSESSION_OF_ITEM_TO_RETURN",
  "BUYER_PROVIDED_CREDIT_RECEIPT",
  "BUYER_RECEIVED_DUPLICATE_REFUND",
  "CANCELLED_PER_TERMS_OF_BILLING_AGREEMENT",
  "CARD_NOT_STOLEN",
  "CARD_NOT_STOLEN_BEFORE_AUTH",
  "CUSTOMER_RECOGNIZES_TRANSACTION",
  "DECISION_BASED_ON_AVAILABLE_INFORMATION",
  "DELIVERY_AFTER_EXPECTED_DELIVERY_DATE",
  "DELIVERY_DUE_WITHIN_EXPECTED_DELIVERY_DATE",
  "DELIVERY_OR_SERVICE_REFUSED",
  "DOCUMENTATION_MATCHES_AMOUNT_CHARGED",
  "DOCUMENTATION_MATCHES_AMOUNT_IN_PAYPAL_ACCOUNT",
  "DUPLICATE_ADD_FUNDS",
  "EFFORTLESS_SELLER_PROTECTION",
  "IN_PERSON_DELIVERY",
  "INELIGIBLE_BUYER_PROTECTION_POLICY",
  "INELIGIBLE_SELLER_PROTECTION_POLICY",
  "INQUIRY_OFFER_ITEM_REPLACED",
  "INQUIRY_OFFER_PARTIAL_REFUND",
  "INQUIRY_OFFER_REFUND_WITH_ITEM_RETURN",
  "INQUIRY_OFFER_REFUND_WITH_REPLACEMENT",
  "INVALID_APPEAL_REASON",
  "INVALID_CHARGEBACK_SELLER_FAVOUR",
  "INVALID_DELIVERY_PROOF",
  "INVALID_DELIVERY_PROOF_SIGNATURE",
  "INVALID_DOCUMENTATION",
  "INVALID_PROOF_OF_SHIPMENT",
  "INVALID_REFUND_PROOF",
  "INVALID_RETURN_DELIVERY_NO_SIGNATURE_PROOF",
  "INVALID_RETURN_DELIVERY_PROOF",
  "INVALID_TRACKING",
  "ITEM_ALTERED_REPAIRED",
  "ITEM_NOT_AS_ADVERTISED",
  "ITEM_NOT_AS_DESCRIBED",
  "ITEM_NOT_DAMAGED",
  "ITEM_NOT_DELIVERED",
  "ITEM_NOT_RETURNED_TO_SELLER",
  "ITEM_NOT_SHIPPED",
  "ITEM_OF_DIFFERENT_QUALITY_OR_QUANTITY",
  "ITEM_OUT_OF_STOCK_AND_NOT_DELIVERED",
  "ITEM_RETURNED_TO_SELLER",
  "ITEM_SERVICE_MISREPRESENTED",
  "ITEM_SERVICE_NOT_MISREPRESENTED",
  "ITEM_SERVICE_RECEIVED_BY_BUYER",
  "ITEM_SOLD_AS_DESCRIBED",
  "ITEM_VALUE_UNAFFECTED",
  "MULTIPLE_APPEALS_WITH_SAME_REASON",
  "NO_DOCUMENTATION_FROM_BUYER",
  "NO_DOCUMENTATION_SUPPORTING_DUE_OF_CREDIT",
  "NO_PROOF_OF_DELIVERY",
  "NO_PROOF_OF_DELIVERY_INTANGIBLE",
  "NO_PROTECTION_FOR_DIGITAL_GOODS_SERVICE",
  "NO_RESPONSE_FROM_BUYER",
  "NO_RESPONSE_FROM_BUYER_FOR_ADDITIONAL_INFO_REQUEST",
  "NO_SELLER_RESPONSE",
  "NO_SELLER_RESPONSE_FOR_ADDITIONAL_INFO_REQUEST",
  "NO_VALID_SHIPMENT_PROOF",
  "NOT_A_BILLING_ERROR",
  "NOT_AN_UNAUTHORIZED_TRANSACTION",
  "NOT_DUPLICATE_FUNDS_ADDED_ONCE",
  "NOT_DUPLICATE_FUNDS_WITHDRAWN_ONCE",
  "NOT_SHIPPED_TO_CORRECT_ADDRESS",
  "PARTIAL_REFUND_ISSUED_FOR_MISSING_ITEMS",
  "PARTIAL_REFUND_OFFER_ACCEPTED",
  "PAYMENT_REVERSED_ALREADY",
  "POS_SUBMITTED_INSTEAD_OF_POD",
  "PREAUTH_INSTALLMENT_DUE",
  "PROOF_OF_BILLING_AFTER_CANCELLATION_ACCEPTED",
  "PROOF_OF_DUPLICATE_DENIED_OR_INSUFFICIENT",
  "PROOF_OF_INCORRECT_TRANSACTION_AMOUNT_ACCEPTED",
  "PROOF_OF_PAID_BY_OTHER_MEANS_NOT_SUBMITTED",
  "PROOF_OF_TRACKING_NOT_SUBMITTED",
  "PROTECTED_BY_PAYPAL",
  "REPRESENTED_BY_PAYPAL",
  "SELLER_ACCEPTED_MULTIPLE_PAYMENTS",
  "SELLER_AGREED_REFUND_WITHOUT_RETURN",
  "SELLER_AGREED_TO_ISSUE_CREDIT",
  "SELLER_ISSUED_CREDIT_TO_BUYER",
  "SELLER_NOT_REACHABLE",
  "SELLER_RECEIVED_PAYMENT_TWICE_OR_FOR_REPLACEMENT",
  "SELLER_REFUSED_REFUND",
  "SELLER_REFUSED_RETURN",
  "SELLER_SURCHARGED_BUYER",
  "SERVICE_NOT_COMPLETED_AS_AGREED",
  "SHIPPING_COMPANY_WONT_SHIP",
  "TRACKING_PROOF_NOT_ENOUGH",
  "TRANSACTION_AUTHORIZED_BY_CARDHOLDER",
  "TRANSACTION_CANCELLED_AFTER_AUTHORIZATION_DATE",
  "TRANSACTION_CANCELLED_BEFORE_SHIPMENT_SERVICE_DATE",
  "TRANSACTION_MATCHES_BUYER_SPENDING_PATTERN",
  "TRANSACTION_PROCESSED_CORRECTLY",
  "TRUSTED_BUYER_PAYOUT",
  "UNUSED_SHIPPING_LABEL",
  "VALID_PROOF_OF_DELIVERY",
  "VALID_PROOF_OF_DELIVERY_WITH_SIGNATURE",
  "VALID_PROOF_OF_REFUND",
  "VALID_PROOF_SUPPORTING_CLAIM",
  "VALID_RETURN_DELIVERY_PROOF",
  "VALID_RETURN_DELIVERY_PROOF_WITH_SIGNATURE",
  "VALID_SHIPMENT_PROOF",
  "VALUE_AFFECTED_SIGNIFICANTLY",
  "PROTECTION_POLICY_APPLIES"
]);

const AdjudicationSchema = z.object({
  type: AdjudicationTypeSchema,
  adjudication_time: DateTimeSchema,
  reason: AdjudicationReasonSchema.optional(),
  dispute_life_cycle_stage: DisputeLifecycleStageSchema.optional()
})

const MoneyMovementSchema = z.object({
  affected_party: z.enum(["SELLER", "BUYER", "PAYMENT_PROCESSOR"]).optional(),
  amount: MoneySchema.optional(),
  asset: CryptocurrencySchema.optional(),
  initiated_time: DateTimeSchema.optional(),
  type: z.enum(["DEBIT", "CREDIT"]).optional(),
  reason: MoneyMovementReasonSchema.optional()
})

const AddressPortableSchema = z.object({
  address_line_1: z.string().max(300).optional(),
  address_line_2: z.string().max(300).optional(),
  address_line_3: z.string().max(100).optional(),
  admin_area_4: z.string().max(100).optional(),
  admin_area_3: z.string().max(100).optional(),
  admin_area_2: z.string().max(120).optional(),
  admin_area_1: z.string().max(300).optional(),
  postal_code: z.string().max(60).optional(),
  country_code: CountryCodeSchema,
  address_details: z.object({
    street_number: z.string().max(100).optional(),
    street_name: z.string().max(100).optional(),
    street_type: z.string().max(100).optional(),
    delivery_service: z.string().max(100).optional(),
    building_name: z.string().max(100).optional(),
    sub_building: z.string().max(100).optional(),
  }).optional()
})

const ProductDetailsSchema = z.object({
  description: z.string().min(1).max(2000).optional(),
  product_received: z.enum(["YES", "NO", "RETURNED"]).optional(),
  product_received_time: DateTimeSchema.optional(),
  expected_delivery_date: DateTimeSchema.optional(),
  sub_reasons: z.array(z.enum(["DAMAGED", "DIFFERENT", "MISSING_PARTS", "OTHER"])).optional(),
  purchase_url: z.string().url().optional(),
  return_details: z.lazy(() => ReturnDetailsSchema).optional()
})

const ServiceDetailsSchema = z.object({
  description: z.string().min(1).max(2000).optional(),
  service_started: z.enum(["YES", "NO", "CANCELLED"]).optional(),
  note: z.string().min(1).max(2000).optional(),
  sub_reasons: z.array(z.enum(["DAMAGED", "DIFFERENT", "INCOMPLETE", "OTHER"])).optional(),
  purchase_url: z.string().url().optional()
})

const CancellationDetailsSchema = z.object({
  cancellation_date: DateTimeSchema.optional(),
  cancellation_number: z.string().min(1).max(127).regex(/^[A-Za-z0-9]+$/).optional(),
  cancelled: z.boolean().optional(),
  cancellation_mode: z.enum(["CANCELLED_PAYPAL_BILLING_AGREEMENT", "WEBSITE", "PHONE", "EMAIL", "WRITTEN", "IN_PERSON"]).optional()
})

const ReturnDetailsSchema = z.object({
  return_time: DateTimeSchema.optional(),
  mode: z.enum(["SHIPPED", "IN_PERSON"]).optional(),
  receipt: z.boolean().optional(),
  return_confirmation_number: z.string().min(1).max(255).regex(/^[A-Za-z0-9:\\-]+$/).optional(),
  returned: z.boolean().optional()
})

const AgreedRefundDetailsSchema = z.object({
  merchant_agreed_refund: z.boolean().optional(),
  merchant_agreed_refund_time: DateTimeSchema.optional()
})

const CreditNotProcessedSchema = z.object({
  issue_type: z.enum(["PRODUCT", "SERVICE"]).optional(),
  expected_refund: MoneySchema.optional(),
  cancellation_details: CancellationDetailsSchema.optional(),
  product_details: ProductDetailsSchema.optional(),
  service_details: ServiceDetailsSchema.optional(),
  agreed_refund_details: AgreedRefundDetailsSchema.optional()
})

const CanceledRecurringBillingSchema = z.object({
  expected_refund: MoneySchema.optional(),
  cancellation_details: CancellationDetailsSchema.optional()
})

const DuplicateTransactionSchema = z.object({
  received_duplicate: z.boolean().optional(),
  original_transaction: z.lazy(() => TransactionInfoSchema).optional()
})

const IncorrectTransactionAmountSchema = z.object({
  correct_transaction_amount: MoneySchema.optional(),
  correct_transaction_asset: CryptocurrencySchema.optional(),
  correct_transaction_time: DateTimeSchema.optional()
})

const PaymentByOtherMeansSchema = z.object({
  charge_different_from_original: z.boolean().optional(),
  received_duplicate: z.boolean().optional(),
  payment_method: z.enum(["CASH", "CREDIT_CARD", "CHECK", "PAYPAL", "DEBIT_CARD", "GIFT_CARD", "BANK_TRANSFER"]).optional(),
  payment_instrument_suffix: z.string().min(2).max(4).optional()
})

const BillingDisputesPropertiesSchema = z.object({
  duplicate_transaction: DuplicateTransactionSchema.optional(),
  incorrect_transaction_amount: IncorrectTransactionAmountSchema.optional(),
  payment_by_other_means: PaymentByOtherMeansSchema.optional(),
  credit_not_processed: CreditNotProcessedSchema.optional(),
  canceled_recurring_billing: CanceledRecurringBillingSchema.optional()
})

const MerchandizeDisputePropertiesSchema = z.object({
  issue_type: z.enum(["PRODUCT", "SERVICE"]).optional(),
  product_details: ProductDetailsSchema.optional(),
  service_details: ServiceDetailsSchema.optional(),
  cancellation_details: CancellationDetailsSchema.optional(),
  return_shipping_address: AddressPortableSchema.optional()
})

const ExtensionsSchema = z.object({
  merchant_contacted: z.boolean().optional(),
  merchant_contacted_outcome: MerchantContactedOutcomeSchema.optional(),
  merchant_contacted_time: DateTimeSchema.optional(),
  merchant_contacted_mode: MerchantContactedModeSchema.optional(),
  buyer_contacted_time: DateTimeSchema.optional(),
  buyer_contacted_channel: z.string().optional(),
  billing_dispute_properties: BillingDisputesPropertiesSchema.optional(),
  merchandize_dispute_properties: MerchandizeDisputePropertiesSchema.optional()
})

const BuyerEscalationReasonSchema = z.any()

const PatchSchema = z.object({
  op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
  path: z.string().optional(),
  value: z.any().optional(),
  from: z.string().optional()
})

const PatchRequestSchema = z.array(PatchSchema)

const SubsequentActionSchema = z.object({
  links: z.array(LinkDescriptionSchema).min(1).max(10).readonly().optional()
})

const AdjudicateSchema = z.object({
  adjudication_outcome: z.enum(["BUYER_FAVOR", "SELLER_FAVOR"]),
})

const RequireEvidenceSchema = z.object({
  action: z.enum(["BUYER_EVIDENCE", "SELLER_EVIDENCE"]),
})

const EscalateSchema = z.object({
  note: z.string().min(1).max(2000),
  buyer_escalation_reason: BuyerEscalationReasonSchema.optional()
})

const MakeOfferSchema = z.object({
  note: z.string().min(1).max(2000),
  offer_amount: MoneySchema.optional(),
  return_shipping_address: AddressPortableSchema.optional(),
  invoice_id: z.string().min(1).max(127).regex(/^[A-Za-z0-9:\\-|]+$/).optional(),
  offer_type: OfferTypeSchema
})

const AcceptOfferSchema = z.object({
  note: z.string().min(1).max(2000).optional()
})

const DenyOfferSchema = z.object({
  note: z.string().min(1).max(2000)
})

// --- Parameters Schemas ---

const StartTimeParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/).optional();
const DisputedTransactionIdParameterSchema = z.string().min(1).max(255).regex(/^[0-9A-Z_]+$/).optional();
const PageSizeParameterSchema = z.number().int().min(1).max(50).default(10).optional();
const NextPageTokenParameterSchema = z.string().min(1).max(255).regex(/^[A-Za-z0-9+\/=]+$/).optional().describe("deprecated");
const DisputeStateParameterSchema = z.string().min(1).max(2000).regex(/^[0-9A-Z_]+$/).optional();
const UpdateTimeBeforeParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/).optional();
const UpdateTimeAfterParameterSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/).optional();
const IdParameterSchema = z.string().min(1).max(255).regex(/^[A-Za-z0-9-]+$/);


// --- Remaining Schemas ---


//Error Schemas
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

const CryptocurrencyQuantitySchema = z.string().min(1).max(40).regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/);

const MessageSchema = z.object({
  posted_by: z.enum(["BUYER", "SELLER", "ARBITER"]).optional(),
  time_posted: z.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/).optional(),
  content: z.string().max(2000).optional(),
  documents: z.array(DocumentSchema).optional(),
});


// --- Exports ---
export {
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
};