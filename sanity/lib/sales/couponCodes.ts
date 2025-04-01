export const COUPON_CODES = {
    SSALE2025: "SSALE2025",
    SSALE2026: "SSALE2026",
    SSALE2027: "SSALE2027",
} as const

export type CouponCode = keyof typeof COUPON_CODES;