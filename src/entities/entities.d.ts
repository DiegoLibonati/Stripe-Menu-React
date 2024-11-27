// Types

export type SubLink = {
  page: string;
  links: Link[];
};

export type Link = {
  label: string;
  url: string;
};

export type AppContext = {
  mobileMenu: boolean;
  desktopMenu: boolean;
  location: number;
  subLink: SubLink;
  handleMobileMenuClose: () => void;
  handleMobileMenuOpen: () => void;
  handleDesktopMenuClose: () => void;
  handleDesktopMenuOpen: (text: string, centerBtn: number) => void;
};

// Interfaces

export interface AppProviderProps {
  children: React.ReactNode;
}
