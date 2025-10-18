import React, { useState } from "react";

import { SubLink } from "@src/entities/app";
import { StripeContext as StripeContextT } from "@src/entities/contexts";
import { StripeProviderProps } from "@src/entities/props";

import subLinks from "@src/constants/subLinks";

export const StripeContext = React.createContext<StripeContextT | null>(null);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
  const [subLink, setSubLink] = useState<SubLink>({ page: "", links: [] });
  const [location, setLocation] = useState<number>(0);

  const handleMobileMenuOpen = (): void => {
    setMobileMenu(true);
  };

  const handleMobileMenuClose = (): void => {
    setMobileMenu(false);
  };

  const handleDesktopMenuOpen = (text: string, centerBtn: number): void => {
    const subLink = subLinks.find((link) => link.page === text);
    setSubLink(subLink!);
    setLocation(centerBtn);
    setDesktopMenu(true);
  };

  const handleDesktopMenuClose = (): void => {
    setDesktopMenu(false);
  };

  return (
    <StripeContext.Provider
      value={{
        mobileMenu,
        subLink,
        desktopMenu,
        location,
        handleMobileMenuClose,
        handleMobileMenuOpen,
        handleDesktopMenuClose,
        handleDesktopMenuOpen,
      }}
    >
      {children}
    </StripeContext.Provider>
  );
};
