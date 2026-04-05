import type { StripeState } from "@/types/states";

export interface StripeContext {
  stripeState: StripeState;
  handleMobileMenuClose: () => void;
  handleMobileMenuOpen: () => void;
  handleDesktopMenuClose: () => void;
  handleDesktopMenuOpen: (text: string, centerBtn: number) => void;
}
