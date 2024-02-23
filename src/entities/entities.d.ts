// Types

import { FaCreditCard } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export type SubLink = {
  page: string;
  links: Link[];
};

export type Link = {
  label: string;
  url: string;
};

export type AppContextT = {
  mobileMenu: boolean;
  desktopMenu: boolean;
  location: number;
  page: SubLink;
  handleMobileMenuClose: () => void;
  handleMobileMenuOpen: () => void;
  handleDesktopMenuClose: () => void;
  handleDesktopMenuOpen: (text: string, centerBtn: number) => void;
};

// Interfaces

export interface AppProviderProps {
  children: React.ReactNode;
}
