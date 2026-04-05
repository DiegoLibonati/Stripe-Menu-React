import { FaBars } from "react-icons/fa";

import type { JSX } from "react";

import { useStripeContext } from "@/hooks/useStripeContext";

import subLinks from "@/constants/subLinks";

import assets from "@/assets/export";

import "@/components/Navbar/Navbar.css";

const Navbar = (): JSX.Element => {
  const { stripeState, handleMobileMenuOpen, handleDesktopMenuOpen, handleDesktopMenuClose } =
    useStripeContext();
  const { mobileMenu, desktopMenu, subLink: activeSubLink } = stripeState;

  const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const page = target.textContent;
    const location = target.getBoundingClientRect();
    const centerBtn = (location.left + location.right) / 2;
    handleDesktopMenuOpen(page, centerBtn);
  };

  const handleDesktopClose: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("header__sublink-page")) {
      handleDesktopMenuClose();
    }
  };

  return (
    <header
      className="header-wrapper"
      onMouseOver={(e) => {
        handleDesktopClose(e);
      }}
    >
      <div className="header__mobile">
        <img src={assets.images.LogoSvg} alt="logo" className="header__logo"></img>
        <button
          className="header__mobile-btn-open-menu"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenu}
          aria-controls="sidebar-nav"
          onClick={handleMobileMenuOpen}
        >
          <FaBars id="bars" className="header__mobile-btn-open-menu-icon"></FaBars>
        </button>
      </div>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {subLinks.map((subLink) => {
            return (
              <li key={subLink.page} className="header__nav-list-item">
                <button
                  type="button"
                  className="header__sublink-page"
                  aria-label={`Open ${subLink.page} menu`}
                  aria-haspopup="true"
                  aria-expanded={desktopMenu && activeSubLink.page === subLink.page}
                  onMouseOver={(e) => {
                    openMenu(e);
                  }}
                >
                  {subLink.page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <button type="button" className="header__sign-in">
        Sign in
      </button>
    </header>
  );
};

export default Navbar;
