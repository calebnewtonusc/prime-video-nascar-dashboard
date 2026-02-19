/**
 * Design token constants — mirror of globals.css :root variables.
 * Use these instead of raw hex strings so colors stay consistent.
 */

// Backgrounds
export const BG_BASE    = "#060A12";
export const BG_SURFACE = "#0C1220";
export const BG_RAISED  = "#111827";
export const BG_OVERLAY = "#162032";

// Borders
export const BORDER_SUBTLE  = "#1A2437";
export const BORDER_DEFAULT = "#243044";
export const BORDER_STRONG  = "#2E3F56";

// Text
export const TEXT_PRIMARY   = "#E8ECF4";
export const TEXT_SECONDARY = "#8B97AA";
export const TEXT_TERTIARY  = "#4E5E74";

// Brand
export const PRIME_BLUE   = "#00A8FF";
export const PRIME_BLUE_D = "#0076CC";
export const AMZ_ORANGE   = "#FF9900";

// Semantic
export const GREEN  = "#00C896";
export const RED    = "#FF4F5B";
export const YELLOW = "#F59E0B";
export const PURPLE = "#7C6FFF";

// Utility: rgba helpers for common alpha combinations
export const alpha = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

// Common token presets
export const BLUE_BG     = alpha(PRIME_BLUE, 0.08);
export const BLUE_BORDER = alpha(PRIME_BLUE, 0.18);
export const GREEN_BG    = alpha(GREEN, 0.10);
export const GREEN_BORDER = alpha(GREEN, 0.20);
export const RED_BG      = alpha(RED, 0.08);
export const RED_BORDER  = alpha(RED, 0.18);
export const ORANGE_BG   = alpha(AMZ_ORANGE, 0.08);
export const ORANGE_BORDER = alpha(AMZ_ORANGE, 0.18);
