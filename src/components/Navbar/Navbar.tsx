import { useGlobalContext } from "../../contexts/context";

import { subLinks } from "../../constants/data";

import { FaBars } from "react-icons/fa";
import logo from "../../assets/logo.svg";

import "./Navbar.css";

const Navbar = (): JSX.Element => {
  const {
    handleMobileMenuOpen,
    handleDesktopMenuOpen,
    handleDesktopMenuClose,
  } = useGlobalContext()!;

  const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const page = target.textContent;
    const location = target.getBoundingClientRect();
    const centerBtn = (location.left + location.right) / 2;
    handleDesktopMenuOpen(page!, centerBtn);
  };

  const handleDesktopClose: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("header__nav__list__btn")) {
      handleDesktopMenuClose();
    }
  };

  return (
    <header
      className="header"
      onMouseOver={(e) => handleDesktopClose(e)}
    >
      <div className="header__logo">
        <img src={logo} alt="logo"></img>
        <button
          className="header__logo__btn"
          type="button"
          aria-label="open menu"
          onClick={handleMobileMenuOpen}
        >
          <FaBars id="bars"></FaBars>
        </button>
      </div>

      <nav className="header__nav">
        <ul className="header__nav__list">
          {subLinks.map((subLink) => {
            return (
              <li key={subLink.page}>
                <button
                  type="button"
                  className="header__nav__list__btn"
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

      <button type="button" className="header__sign__in" aria-label="sign in">
        Sign in
      </button>
    </header>
  );
};

export default Navbar;
