import { FaBars } from "react-icons/fa";

import { useStripeContext } from "@src/hooks/useStripeContext";

import subLinks from "@src/constants/sublinks";

import assets from "@src/assets/export";

import "@src/components/Navbar/Navbar.css";

const Navbar = (): JSX.Element => {
  const {
    handleMobileMenuOpen,
    handleDesktopMenuOpen,
    handleDesktopMenuClose,
  } = useStripeContext()!;

  const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const page = target.textContent;
    const location = target.getBoundingClientRect();
    const centerBtn = (location.left + location.right) / 2;
    handleDesktopMenuOpen(page!, centerBtn);
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
      onMouseOver={(e) => handleDesktopClose(e)}
    >
      <div className="header__mobile">
        <img
          src={assets.svgs.LogoSvg}
          alt="logo"
          className="header__logo"
        ></img>
        <button
          className="header__mobile-btn-open-menu"
          type="button"
          aria-label="open menu"
          onClick={handleMobileMenuOpen}
        >
          <FaBars
            id="bars"
            className="header__mobile-btn-open-menu-icon"
          ></FaBars>
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
                  aria-label={`button ${subLink.page}`}
                  onMouseOver={(e) => openMenu(e)}
                >
                  {subLink.page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <button type="button" className="header__sign-in" aria-label="sign in">
        Sign in
      </button>
    </header>
  );
};

export default Navbar;
