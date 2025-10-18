import { SubLink } from "@src/entities/app";

export type StripeContext = {
  mobileMenu: boolean;
  desktopMenu: boolean;
  location: number;
  subLink: SubLink;
  handleMobileMenuClose: () => void;
  handleMobileMenuOpen: () => void;
  handleDesktopMenuClose: () => void;
  handleDesktopMenuOpen: (text: string, centerBtn: number) => void;
};
