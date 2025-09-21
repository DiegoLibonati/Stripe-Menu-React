import React, { useContext, useState } from "react";

import {
  AppContext as AppContextT,
  AppProviderProps,
  SubLink,
} from "@src/entities/entities";

import { subLinks } from "@src/constants/data";

export const AppContext = React.createContext<AppContextT | null>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
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
    <AppContext.Provider
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
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
