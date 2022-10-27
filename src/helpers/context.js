import React, { useContext, useState } from "react";
import sublinks from "./data.js";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);
  const [page, setPage] = useState({ page: "", links: [] });
  const [location, setLocation] = useState(0);

  const handleMobileMenuOpen = () => {
    setMobileMenu(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenu(false);
  };

  const handleDesktopMenuOpen = (text, centerBtn) => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page);
    setLocation(centerBtn);
    setDesktopMenu(true);
  };

  const handleDesktopMenuClose = () => {
    setDesktopMenu(false);
  };

  return (
    <AppContext.Provider
      value={{
        mobileMenu,
        handleMobileMenuClose,
        handleMobileMenuOpen,
        desktopMenu,
        handleDesktopMenuClose,
        handleDesktopMenuOpen,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
