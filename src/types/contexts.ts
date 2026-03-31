import { StripeState } from "@/types/states";

export type StripeContext = {
  stripeState: StripeState;
  handleMobileMenuClose: () => void;
  handleMobileMenuOpen: () => void;
  handleDesktopMenuClose: () => void;
  handleDesktopMenuOpen: (text: string, centerBtn: number) => void;
};
