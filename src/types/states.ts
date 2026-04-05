import type { SubLink } from "@/types/app";

export interface StripeState extends Record<string, unknown> {
  mobileMenu: boolean;
  desktopMenu: boolean;
  subLink: SubLink;
  location: number;
}
