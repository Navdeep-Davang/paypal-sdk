

// catalogs_products_v1 zod

// Its json has 30 types (as per ai)
// Total Exported ZodSchemas 35


import { z } from 'zod';

const ProductCategorySchema = z.enum([
  "AC_REFRIGERATION_REPAIR", "ACADEMIC_SOFTWARE", "ACCESSORIES", "ACCOUNTING", "ADULT", "ADVERTISING",
  "AFFILIATED_AUTO_RENTAL", "AGENCIES", "AGGREGATORS", "AGRICULTURAL_COOPERATIVE_FOR_MAIL_ORDER", "AIR_CARRIERS_AIRLINES", "AIRLINES",
  "AIRPORTS_FLYING_FIELDS", "ALCOHOLIC_BEVERAGES", "AMUSEMENT_PARKS_CARNIVALS", "ANIMATION", "ANTIQUES", "APPLIANCES",
  "AQUARIAMS_SEAQUARIUMS_DOLPHINARIUMS", "ARCHITECTURAL_ENGINEERING_AND_SURVEYING_SERVICES", "ART_AND_CRAFT_SUPPLIES", "ART_DEALERS_AND_GALLERIES", "ARTIFACTS_GRAVE_RELATED_AND_NATIVE_AMERICAN_CRAFTS",
  "ARTS_AND_CRAFTS", "ARTS_CRAFTS_AND_COLLECTIBLES", "AUDIO_BOOKS", "AUTO_ASSOCIATIONS_CLUBS", "AUTO_DEALER_USED_ONLY", "AUTO_RENTALS",
  "AUTO_SERVICE", "AUTOMATED_FUEL_DISPENSERS", "AUTOMOBILE_ASSOCIATIONS", "AUTOMOTIVE", "AUTOMOTIVE_REPAIR_SHOPS_NON_DEALER", "AUTOMOTIVE_TOP_AND_BODY_SHOPS",
  "AVIATION", "BABIES_CLOTHING_AND_SUPPLIES", "BABY", "BANDS_ORCHESTRAS_ENTERTAINERS", "BARBIES", "BATH_AND_BODY",
  "BATTERIES", "BEAN_BABIES", "BEAUTY", "BEAUTY_AND_FRAGRANCES", "BED_AND_BATH", "BICYCLE_SHOPS_SALES_AND_SERVICE",
  "BICYCLES_AND_ACCESSORIES", "BILLIARD_POOL_ESTABLISHMENTS", "BOAT_DEALERS", "BOAT_RENTALS_AND_LEASING", "BOATING_SAILING_AND_ACCESSORIES", "BOOKS",
  "BOOKS_AND_MAGAZINES", "BOOKS_MANUSCRIPTS", "BOOKS_PERIODICALS_AND_NEWSPAPERS", "BOWLING_ALLEYS", "BULLETIN_BOARD", "BUS_LINE",
  "BUS_LINES_CHARTERS_TOUR_BUSES", "BUSINESS", "BUSINESS_AND_SECRETARIAL_SCHOOLS", "BUYING_AND_SHOPPING_SERVICES_AND_CLUBS", "CABLE_SATELLITE_AND_OTHER_PAY_TELEVISION_AND_RADIO_SERVICES", "CABLE_SATELLITE_AND_OTHER_PAY_TV_AND_RADIO",
  "CAMERA_AND_PHOTOGRAPHIC_SUPPLIES", "CAMERAS", "CAMERAS_AND_PHOTOGRAPHY", "CAMPER_RECREATIONAL_AND_UTILITY_TRAILER_DEALERS", "CAMPING_AND_OUTDOORS", "CAMPING_AND_SURVIVAL",
  "CAR_AND_TRUCK_DEALERS", "CAR_AND_TRUCK_DEALERS_USED_ONLY", "CAR_AUDIO_AND_ELECTRONICS", "CAR_RENTAL_AGENCY", "CATALOG_MERCHANT", "CATALOG_RETAIL_MERCHANT",
  "CATERING_SERVICES", "CHARITY", "CHECK_CASHIER", "CHILD_CARE_SERVICES", "CHILDREN_BOOKS", "CHIROPODISTS_PODIATRISTS",
  "CHIROPRACTORS", "CIGAR_STORES_AND_STANDS", "CIVIC_SOCIAL_FRATERNAL_ASSOCIATIONS", "CIVIL_SOCIAL_FRAT_ASSOCIATIONS", "CLOTHING", "CLOTHING_ACCESSORIES_AND_SHOES",
  "CLOTHING_RENTAL", "COFFEE_AND_TEA", "COIN_OPERATED_BANKS_AND_CASINOS", "COLLECTIBLES", "COLLECTION_AGENCY", "COLLEGES_AND_UNIVERSITIES",
  "COMMERCIAL_EQUIPMENT", "COMMERCIAL_FOOTWEAR", "COMMERCIAL_PHOTOGRAPHY", "COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS", "COMMERCIAL_SPORTS_PROFESSIONA", "COMMODITIES_AND_FUTURES_EXCHANGE",
  "COMPUTER_AND_DATA_PROCESSING_SERVICES", "COMPUTER_HARDWARE_AND_SOFTWARE", "COMPUTER_MAINTENANCE_REPAIR_AND_SERVICES_NOT_ELSEWHERE_CLAS", "CONSTRUCTION", "CONSTRUCTION_MATERIALS_NOT_ELSEWHERE_CLASSIFIED", "CONSULTING_SERVICES",
  "CONSUMER_CREDIT_REPORTING_AGENCIES", "CONVALESCENT_HOMES", "COSMETIC_STORES", "COUNSELING_SERVICES_DEBT_MARRIAGE_PERSONAL", "COUNTERFEIT_CURRENCY_AND_STAMPS", "COUNTERFEIT_ITEMS",
  "COUNTRY_CLUBS", "COURIER_SERVICES", "COURIER_SERVICES_AIR_AND_GROUND_AND_FREIGHT_FORWARDERS", "COURT_COSTS_ALIMNY_CHILD_SUPT", "COURT_COSTS_INCLUDING_ALIMONY_AND_CHILD_SUPPORT_COURTS_OF_LAW", "CREDIT_CARDS",
  "CREDIT_UNION", "CULTURE_AND_RELIGION", "DAIRY_PRODUCTS_STORES", "DANCE_HALLS_STUDIOS_AND_SCHOOLS", "DECORATIVE", "DENTAL",
  "DENTISTS_AND_ORTHODONTISTS", "DEPARTMENT_STORES", "DESKTOP_PCS", "DEVICES", "DIECAST_TOYS_VEHICLES", "DIGITAL_GAMES",
  "DIGITAL_MEDIA_BOOKS_MOVIES_MUSIC", "DIRECT_MARKETING", "DIRECT_MARKETING_CATALOG_MERCHANT", "DIRECT_MARKETING_INBOUND_TELE", "DIRECT_MARKETING_OUTBOUND_TELE", "DIRECT_MARKETING_SUBSCRIPTION",
  "DISCOUNT_STORES", "DOOR_TO_DOOR_SALES", "DRAPERY_WINDOW_COVERING_AND_UPHOLSTERY", "DRINKING_PLACES", "DRUGSTORE", "DURABLE_GOODS",
  "ECOMMERCE_DEVELOPMENT", "ECOMMERCE_SERVICES", "EDUCATIONAL_AND_TEXTBOOKS", "ELECTRIC_RAZOR_STORES", "ELECTRICAL_AND_SMALL_APPLIANCE_REPAIR", "ELECTRICAL_CONTRACTORS",
  "ELECTRICAL_PARTS_AND_EQUIPMENT", "ELECTRONIC_CASH", "ELEMENTARY_AND_SECONDARY_SCHOOLS", "EMPLOYMENT", "ENTERTAINERS", "ENTERTAINMENT_AND_MEDIA",
  "EQUIP_TOOL_FURNITURE_AND_APPLIANCE_RENTAL_AND_LEASING", "ESCROW", "EVENT_AND_WEDDING_PLANNING", "EXERCISE_AND_FITNESS", "EXERCISE_EQUIPMENT", "EXTERMINATING_AND_DISINFECTING_SERVICES",
  "FABRICS_AND_SEWING", "FAMILY_CLOTHING_STORES", "FASHION_JEWELRY", "FAST_FOOD_RESTAURANTS", "FICTION_AND_NONFICTION", "FINANCE_COMPANY",
  "FINANCIAL_AND_INVESTMENT_ADVICE", "FINANCIAL_INSTITUTIONS_MERCHANDISE_AND_SERVICES", "FIREARM_ACCESSORIES", "FIREARMS_WEAPONS_AND_KNIVES", "FIREPLACE_AND_FIREPLACE_SCREENS", "FIREWORKS",
  "FISHING", "FLORISTS", "FLOWERS", "FOOD_DRINK_AND_NUTRITION", "FOOD_PRODUCTS", "FOOD_RETAIL_AND_SERVICE",
  "FRAGRANCES_AND_PERFUMES", "FREEZER_AND_LOCKER_MEAT_PROVISIONERS", "FUEL_DEALERS_FUEL_OIL_WOOD_AND_COAL", "FUEL_DEALERS_NON_AUTOMOTIVE", "FUNERAL_SERVICES_AND_CREMATORIES", "FURNISHING_AND_DECORATING",
  "FURNITURE", "FURRIERS_AND_FUR_SHOPS", "GADGETS_AND_OTHER_ELECTRONICS", "GAMBLING", "GAME_SOFTWARE", "GAMES",
  "GARDEN_SUPPLIES", "GENERAL", "GENERAL_CONTRACTORS", "GENERAL_GOVERNMENT", "GENERAL_SOFTWARE", "GENERAL_TELECOM",
  "GIFTS_AND_FLOWERS", "GLASS_PAINT_AND_WALLPAPER_STORES", "GLASSWARE_CRYSTAL_STORES", "GOVERNMENT", "GOVERNMENT_IDS_AND_LICENSES", "GOVERNMENT_LICENSED_ON_LINE_CASINOS_ON_LINE_GAMBLING",
  "GOVERNMENT_OWNED_LOTTERIES", "GOVERNMENT_SERVICES", "GRAPHIC_AND_COMMERCIAL_DESIGN", "GREETING_CARDS", "GROCERY_STORES_AND_SUPERMARKETS", "HARDWARE_AND_TOOLS",
  "HARDWARE_EQUIPMENT_AND_SUPPLIES", "HAZARDOUS_RESTRICTED_AND_PERISHABLE_ITEMS", "HEALTH_AND_BEAUTY_SPAS", "HEALTH_AND_NUTRITION", "HEALTH_AND_PERSONAL_CARE", "HEARING_AIDS_SALES_AND_SUPPLIES",
  "HEATING_PLUMBING_AC", "HIGH_RISK_MERCHANT", "HIRING_SERVICES", "HOBBIES_TOYS_AND_GAMES", "HOME_AND_GARDEN", "HOME_AUDIO",
  "HOME_DECOR", "HOME_ELECTRONICS", "HOSPITALS", "HOTELS_MOTELS_INNS_RESORTS", "HOUSEWARES", "HUMAN_PARTS_AND_REMAINS",
  "HUMOROUS_GIFTS_AND_NOVELTIES", "HUNTING", "IDS_LICENSES_AND_PASSPORTS", "ILLEGAL_DRUGS_AND_PARAPHERNALIA", "INDUSTRIAL", "INDUSTRIAL_AND_MANUFACTURING_SUPPLIES",
  "INSURANCE_AUTO_AND_HOME", "INSURANCE_DIRECT", "INSURANCE_LIFE_AND_ANNUITY", "INSURANCE_SALES_UNDERWRITING", "INSURANCE_UNDERWRITING_PREMIUMS", "INTERNET_AND_NETWORK_SERVICES",
  "INTRA_COMPANY_PURCHASES", "LABORATORIES_DENTAL_MEDICAL", "LANDSCAPING", "LANDSCAPING_AND_HORTICULTURAL_SERVICES", "LAUNDRY_CLEANING_SERVICES", "LEGAL",
  "LEGAL_SERVICES_AND_ATTORNEYS", "LOCAL_DELIVERY_SERVICE", "LOCKSMITH", "LODGING_AND_ACCOMMODATIONS", "LOTTERY_AND_CONTESTS", "LUGGAGE_AND_LEATHER_GOODS",
  "LUMBER_AND_BUILDING_MATERIALS", "MAGAZINES", "MAINTENANCE_AND_REPAIR_SERVICES", "MAKEUP_AND_COSMETICS", "MANUAL_CASH_DISBURSEMENTS", "MASSAGE_PARLORS",
  "MEDICAL", "MEDICAL_AND_PHARMACEUTICAL", "MEDICAL_CARE", "MEDICAL_EQUIPMENT_AND_SUPPLIES", "MEDICAL_SERVICES", "MEETING_PLANNERS",
  "MEMBERSHIP_CLUBS_AND_ORGANIZATIONS", "MEMBERSHIP_COUNTRY_CLUBS_GOLF", "MEMORABILIA", "MEN_AND_BOY_CLOTHING_AND_ACCESSORY_STORES", "MEN_CLOTHING", "MERCHANDISE",
  "METAPHYSICAL", "MILITARIA", "MILITARY_AND_CIVIL_SERVICE_UNIFORMS", "MISC._AUTOMOTIVE_AIRCRAFT_AND_FARM_EQUIPMENT_DEALERS", "MISC._GENERAL_MERCHANDISE", "MISCELLANEOUS_GENERAL_SERVICES",
  "MISCELLANEOUS_REPAIR_SHOPS_AND_RELATED_SERVICES", "MODEL_KITS", "MONEY_TRANSFER_MEMBER_FINANCIAL_INSTITUTION", "MONEY_TRANSFER_MERCHANT", "MOTION_PICTURE_THEATERS", "MOTOR_FREIGHT_CARRIERS_AND_TRUCKING",
  "MOTOR_HOME_AND_RECREATIONAL_VEHICLE_RENTAL", "MOTOR_HOMES_DEALERS", "MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS", "MOTORCYCLE_DEALERS", "MOTORCYCLES", "MOVIE",
  "MOVIE_TICKETS", "MOVING_AND_STORAGE", "MULTI_LEVEL_MARKETING", "MUSIC_CDS_CASSETTES_AND_ALBUMS", "MUSIC_STORE_INSTRUMENTS_AND_SHEET_MUSIC", "NETWORKING", "NEW_AGE",
  "NEW_PARTS_AND_SUPPLIES_MOTOR_VEHICLE", "NEWS_DEALERS_AND_NEWSTANDS", "NON_DURABLE_GOODS", "NON_FICTION", "NON_PROFIT_POLITICAL_AND_RELIGION", "NONPROFIT",
  "NOVELTIES", "OEM_SOFTWARE", "OFFICE_SUPPLIES_AND_EQUIPMENT", "ONLINE_DATING", "ONLINE_GAMING", "ONLINE_GAMING_CURRENCY", "ONLINE_SERVICES",
  "OOUTBOUND_TELEMARKETING_MERCH", "OPHTHALMOLOGISTS_OPTOMETRIST", "OPTICIANS_AND_DISPENSING", "ORTHOPEDIC_GOODS_PROSTHETICS", "OSTEOPATHS",
  "OTHER", "PACKAGE_TOUR_OPERATORS", "PAINTBALL", "PAINTS_VARNISHES_AND_SUPPLIES", "PARKING_LOTS_AND_GARAGES", "PARTS_AND_ACCESSORIES",
  "PAWN_SHOPS", "PAYCHECK_LENDER_OR_CASH_ADVANCE", "PERIPHERALS", "PERSONALIZED_GIFTS", "PET_SHOPS_PET_FOOD_AND_SUPPLIES", "PETROLEUM_AND_PETROLEUM_PRODUCTS",
  "PETS_AND_ANIMALS", "PHOTOFINISHING_LABORATORIES_PHOTO_DEVELOPING", "PHOTOGRAPHIC_STUDIOS_PORTRAITS", "PHOTOGRAPHY", "PHYSICAL_GOOD", "PICTURE_VIDEO_PRODUCTION",
  "PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS", "PLANTS_AND_SEEDS", "PLUMBING_AND_HEATING_EQUIPMENTS_AND_SUPPLIES", "POLICE_RELATED_ITEMS", "POLITICAL_ORGANIZATIONS", "POSTAL_SERVICES_GOVERNMENT_ONLY",
  "POSTERS", "PREPAID_AND_STORED_VALUE_CARDS", "PRESCRIPTION_DRUGS", "PROMOTIONAL_ITEMS", "PUBLIC_WAREHOUSING_AND_STORAGE", "PUBLISHING_AND_PRINTING",
  "PUBLISHING_SERVICES", "RADAR_DECTORS", "RADIO_TELEVISION_AND_STEREO_REPAIR", "REAL_ESTATE", "REAL_ESTATE_AGENT", "REAL_ESTATE_AGENTS_AND_MANAGERS_RENTALS",
  "RELIGION_AND_SPIRITUALITY_FOR_PROFIT", "RELIGIOUS", "RELIGIOUS_ORGANIZATIONS", "REMITTANCE", "RENTAL_PROPERTY_MANAGEMENT", "RESIDENTIAL",
  "RETAIL", "RETAIL_FINE_JEWELRY_AND_WATCHES", "REUPHOLSTERY_AND_FURNITURE_REPAIR", "RINGS", "ROOFING_SIDING_SHEET_METAL",
  "RUGS_AND_CARPETS", "SCHOOLS_AND_COLLEGES", "SCIENCE_FICTION", "SCRAPBOOKING", "SCULPTURES", "SECURITIES_BROKERS_AND_DEALERS",
  "SECURITY_AND_SURVEILLANCE", "SECURITY_AND_SURVEILLANCE_EQUIPMENT", "SECURITY_BROKERS_AND_DEALERS", "SEMINARS", "SERVICE_STATIONS",
  "SERVICES", "SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_STORES", "SHIPPING_AND_PACKING", "SHOE_REPAIR_HAT_CLEANING", "SHOE_STORES",
  "SHOES", "SNOWMOBILE_DEALERS", "SOFTWARE", "SPECIALTY_AND_MISC._FOOD_STORES", "SPECIALTY_CLEANING_POLISHING_AND_SANITATION_PREPARATIONS",
  "SPECIALTY_OR_RARE_PETS", "SPORT_GAMES_AND_TOYS", "SPORTING_AND_RECREATIONAL_CAMPS", "SPORTING_GOODS", "SPORTS_AND_OUTDOORS",
  "SPORTS_AND_RECREATION", "STAMP_AND_COIN", "STATIONARY_PRINTING_AND_WRITING_PAPER", "STENOGRAPHIC_AND_SECRETARIAL_SUPPORT_SERVICES", "STOCKS_BONDS_SECURITIES_AND_RELATED_CERTIFICATES",
  "STORED_VALUE_CARDS", "SUPPLIES", "SUPPLIES_AND_TOYS", "SURVEILLANCE_EQUIPMENT", "SWIMMING_POOLS_AND_SPAS",
  "SWIMMING_POOLS_SALES_SUPPLIES_SERVICES", "TAILORS_AND_ALTERATIONS", "TAX_PAYMENTS", "TAX_PAYMENTS_GOVERNMENT_AGENCIES", "TAXICABS_AND_LIMOUSINES",
  "TELECOMMUNICATION_SERVICES", "TELEPHONE_CARDS", "TELEPHONE_EQUIPMENT", "TELEPHONE_SERVICES", "THEATER", "TIRE_RETREADING_AND_REPAIR",
  "TOLL_OR_BRIDGE_FEES", "TOOLS_AND_EQUIPMENT", "TOURIST_ATTRACTIONS_AND_EXHIBITS", "TOWING_SERVICE", "TOYS_AND_GAMES",
  "TRADE_AND_VOCATIONAL_SCHOOLS", "TRADEMARK_INFRINGEMENT", "TRAILER_PARKS_AND_CAMPGROUNDS", "TRAINING_SERVICES", "TRANSPORTATION_SERVICES",
  "TRAVEL", "TRUCK_AND_UTILITY_TRAILER_RENTALS", "TRUCK_STOP", "TYPESETTING_PLATE_MAKING_AND_RELATED_SERVICES", "USED_MERCHANDISE_AND_SECONDHAND_STORES",
  "USED_PARTS_MOTOR_VEHICLE", "UTILITIES", "UTILITIES_ELECTRIC_GAS_WATER_SANITARY", "VARIETY_STORES", "VEHICLE_SALES",
  "VEHICLE_SERVICE_AND_ACCESSORIES", "VIDEO_EQUIPMENT", "VIDEO_GAME_ARCADES_ESTABLISH", "VIDEO_GAMES_AND_SYSTEMS", "VIDEO_TAPE_RENTAL_STORES",
  "VINTAGE_AND_COLLECTIBLE_VEHICLES", "VINTAGE_AND_COLLECTIBLES", "VITAMINS_AND_SUPPLEMENTS", "VOCATIONAL_AND_TRADE_SCHOOLS", "WATCH_CLOCK_AND_JEWELRY_REPAIR",
  "WEB_HOSTING_AND_DESIGN", "WELDING_REPAIR", "WHOLESALE_CLUBS", "WHOLESALE_FLORIST_SUPPLIERS", "WHOLESALE_PRESCRIPTION_DRUGS",
  "WILDLIFE_PRODUCTS", "WIRE_TRANSFER", "WIRE_TRANSFER_AND_MONEY_ORDER", "WOMEN_ACCESSORY_SPECIALITY", "WOMEN_CLOTHING"
]);

const ErrorDetailsSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  location: z.enum(['body', 'path', 'query']).default('body').optional(),
  issue: z.string(),
});

const ErrorLinkDescriptionSchema = z.object({
  href: z.string().min(0).max(20000).regex(/^.*$/),
  rel: z.string().min(0).max(100).regex(/^.*$/),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

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
  Error400Schema,
  Error401Schema,
  Error403Schema,
  Error404Schema,
  Error409Schema,
  Error415Schema,
  Error422Schema,
  Error500Schema,
  Error503Schema,
]);

const DateTimeSchema = z.string().min(20).max(64).regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$/);

const LinkDescriptionSchema = z.object({
  href: z.string(),
  rel: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']).optional(),
});

const ProductCollectionElementSchema = z.object({
  id: z.string().min(6).max(50).readonly().optional(),
  name: z.string().min(1).max(127).optional(),
  description: z.string().min(1).max(256).optional(),
  create_time: DateTimeSchema.readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const ProductCollectionSchema = z.object({
  products: z.array(ProductCollectionElementSchema).min(1).max(32767).optional(),
  total_items: z.number().int().min(0).max(500000000).optional(),
  total_pages: z.number().int().min(0).max(100000000).optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const ProductRequestPOSTSchema = z.object({
  id: z.string().min(6).max(50).optional(),
  name: z.string().min(1).max(127),
  description: z.string().min(1).max(256),
  type: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE']).default('PHYSICAL'),
  category: ProductCategorySchema.optional(),
  image_url: z.string().url().min(1).max(2000).optional(),
  home_url: z.string().url().min(1).max(2000).optional(),
});

const ProductSchema = z.object({
  id: z.string().min(6).max(50).optional(),
  name: z.string().min(1).max(127).optional(),
  description: z.string().min(1).max(256).optional(),
  type: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE']).default('PHYSICAL').optional(),
  category: ProductCategorySchema.optional(),
  image_url: z.string().url().min(1).max(2000).optional(),
  home_url: z.string().url().min(1).max(2000).optional(),
  create_time: DateTimeSchema.readonly().optional(),
  update_time: DateTimeSchema.readonly().optional(),
  links: z.array(LinkDescriptionSchema).readonly().optional(),
});

const ProductsCreate400Schema = z.object({
  details: z.array(z.union([
    z.object({
      issue: z.enum(['INVALID_PARAMETER_SYNTAX']),
    }),
    z.object({
      issue: z.enum(['INVALID_PARAMETER_VALUE']),
    }),
    z.object({
      issue: z.enum(['MISSING_REQUIRED_PARAMETER']),
    }),
    z.object({
      issue: z.enum(['INVALID_STRING_MIN_LENGTH']),
    }),
    z.object({
      issue: z.enum(['INVALID_STRING_MAX_LENGTH']),
    }),
  ])).optional(),
});

const PatchSchema = z.object({
  op: z.enum(['add', 'remove', 'replace', 'move', 'copy', 'test']),
  path: z.string(),
  value: z.any().optional(), 
  from: z.string().optional(),
});

const PatchRequestSchema = z.array(PatchSchema);

const ProductsPatch400Schema = z.object({
  details: z.array(z.union([
    z.object({
      issue: z.enum(['MISSING_REQUIRED_PARAMETER']),
    }),
    z.object({
      issue: z.enum(['UNSUPPORTED_PATCH_OPERATION']),
    }),
    z.object({
      issue: z.enum(['INVALID_PATCH_PATH']),
    }),
    z.object({
      issue: z.enum(['INVALID_PARAMETER_SYNTAX']),
    }),
    z.object({
      issue: z.enum(['INVALID_PARAMETER_VALUE']),
    }),
  ])).optional(),
});

const ProductsPatch422Schema = z.object({
  details: z.array(z.union([
    z.object({
      issue: z.enum(['USER_ACCOUNT_CLOSED']),
    }),
    z.object({
      issue: z.enum(['DUPLICATE_RESOURCE_IDENTIFIER']),
    }),
  ])).optional(),
});

const PreferParameterSchema = z.enum(['return=minimal', 'return=representation']).default('return=minimal').optional();
const PaypalRequestIdParameterSchema = z.string().optional();
const PageSizeParameterSchema = z.number().int().min(1).max(20).default(10).optional();
const PageParameterSchema = z.number().int().min(1).max(100000).default(1).optional();
const TotalRequiredParameterSchema = z.boolean().default(false).optional();
const ProductIdParameterSchema = z.string();


//  --- Remaining Types --- 

// General Error Types (Reusable)
const ErrorTypes = {
INVALID_PARAMETER_VALUE: z.object({
    issue: z.literal("INVALID_PARAMETER_VALUE"),
}),
INVALID_ACCOUNT_STATUS: z.object({
    issue: z.literal("INVALID_ACCOUNT_STATUS"),
}),
PERMISSION_DENIED: z.object({
    issue: z.literal("PERMISSION_DENIED"),
}),
INVALID_RESOURCE_ID: z.object({
    issue: z.literal("INVALID_RESOURCE_ID"),
}),
USER_ACCOUNT_CLOSED: z.object({
    issue: z.literal("USER_ACCOUNT_CLOSED"),
}),
DUPLICATE_RESOURCE_IDENTIFIER: z.object({
    issue: z.literal("DUPLICATE_RESOURCE_IDENTIFIER"),
}),
COUNTRY_NOT_SUPPORTED: z.object({
    issue: z.literal("COUNTRY_NOT_SUPPORTED"),
}),
};


// Schemas for each error code that uses the error types
const Error400DetailsSchema = z.discriminatedUnion("issue", [
ErrorTypes.INVALID_PARAMETER_VALUE,
]);

const Error401DetailsSchema = z.discriminatedUnion("issue", [
ErrorTypes.INVALID_ACCOUNT_STATUS,
]);

const Error403DetailsSchema = z.discriminatedUnion("issue", [
ErrorTypes.PERMISSION_DENIED,
]);

const Error404DetailsSchema = z.discriminatedUnion("issue", [
ErrorTypes.INVALID_RESOURCE_ID,
]);

const Error422DetailsSchema = z.discriminatedUnion("issue", [
ErrorTypes.USER_ACCOUNT_CLOSED,
ErrorTypes.DUPLICATE_RESOURCE_IDENTIFIER,
ErrorTypes.COUNTRY_NOT_SUPPORTED,
]);

// Main Error Schemas
const _400Schema = z.object({
  details: z.array(Error400DetailsSchema).optional(),
});

const _401Schema = z.object({
  details: z.array(Error401DetailsSchema).optional(),
});

const _403Schema = z.object({
  details: z.array(Error403DetailsSchema).optional(),
});

const _404Schema = z.object({
  details: z.array(Error404DetailsSchema).optional(),
});

const _422Schema = z.object({
  details: z.array(Error422DetailsSchema).optional(),
});

export {
  ErrorDetailsSchema,
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
  LinkDescriptionSchema,
  ProductCollectionElementSchema,
  ProductCollectionSchema,
  ProductCategorySchema,
  ProductRequestPOSTSchema,
  ProductSchema,
  ProductsCreate400Schema,
  PatchSchema,
  PatchRequestSchema,
  ProductsPatch400Schema,
  ProductsPatch422Schema,
  PreferParameterSchema,
  PaypalRequestIdParameterSchema,
  PageSizeParameterSchema,
  PageParameterSchema,
  TotalRequiredParameterSchema,
  ProductIdParameterSchema,
  _400Schema,
  _401Schema,
  _403Schema,
  _404Schema,
  _422Schema,
}