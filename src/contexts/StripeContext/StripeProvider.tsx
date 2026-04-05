import { useState } from "react";

import type { JSX } from "react";
import type { StripeState } from "@/types/states";
import type { StripeProviderProps } from "@/types/props";

import { StripeContext } from "@/contexts/StripeContext/StripeContext";

import subLinks from "@/constants/subLinks";

export const StripeProvider = ({ children }: StripeProviderProps): JSX.Element => {
  const [stripeState, setStripeState] = useState<StripeState>({
    mobileMenu: false,
    desktopMenu: false,
    subLink: { page: "", links: [] },
    location: 0,
  });

  const handleMobileMenuOpen = (): void => {
    setStripeState((state) => ({ ...state, mobileMenu: true }));
  };

  const handleMobileMenuClose = (): void => {
    setStripeState((state) => ({ ...state, mobileMenu: false }));
  };

  const handleDesktopMenuOpen = (text: string, centerBtn: number): void => {
    const subLink = subLinks.find((link) => link.page === text);

    setStripeState((state) => ({
      ...state,
      subLink: subLink!,
      location: centerBtn,
      desktopMenu: true,
    }));
  };

  const handleDesktopMenuClose = (): void => {
    setStripeState((state) => ({ ...state, desktopMenu: false }));
  };

  return (
    <StripeContext.Provider
      value={{
        stripeState: stripeState,
        handleMobileMenuOpen: handleMobileMenuOpen,
        handleMobileMenuClose: handleMobileMenuClose,
        handleDesktopMenuOpen: handleDesktopMenuOpen,
        handleDesktopMenuClose: handleDesktopMenuClose,
      }}
    >
      {children}
    </StripeContext.Provider>
  );
};
