import React, { useContext, useState } from "react";
import sublinks from "../helpers/data";
import { AppContextT, AppProviderProps, SubLink } from "../entities/entities";

export const AppContext = React.createContext<AppContextT | null>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
  const [page, setPage] = useState<SubLink>({ page: "", links: [] });
  const [location, setLocation] = useState<number>(0);

  const handleMobileMenuOpen = (): void => {
    setMobileMenu(true);
  };

  const handleMobileMenuClose = (): void => {
    setMobileMenu(false);
  };

  const handleDesktopMenuOpen = (text: string, centerBtn: number): void => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page!);
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
        page,
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
