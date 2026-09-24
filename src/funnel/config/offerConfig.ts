/**
 * MPN - Centralized Offer Configuration
 * Central source of truth for S08-B offer pricing, guarantees, and checkout destination.
 */

export const OFFER_CONFIG = {
  PRODUCT_NAME: "CONTEXTO™",
  FOUNDER_PRICE: "$9,99 USD",
  PAYMENT_MODEL: "Pago único",
  GUARANTEE_DAYS: 7,
  CHECKOUT_URL: "https://pay.hotmart.com/S107279344E",
} as const;
