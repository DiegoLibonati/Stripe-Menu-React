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
    if (!target.classList.contains("btn")) {
      handleDesktopMenuClose();
    }
  };

  return (
    <header
      className="header_container"
      onMouseOver={(e) => handleDesktopClose(e)}
    >
      <div className="header_container_logo">
        <img src={logo} alt="logo"></img>
        <button
          className="btn-open-menu"
          type="button"
          aria-label="open menu"
          onClick={handleMobileMenuOpen}
        >
          <FaBars id="bars"></FaBars>
        </button>
      </div>

      <nav className="header_container_nav">
        <ul className="header_container_nav_list">
          {subLinks.map((subLink) => {
            return (
              <li key={subLink.page}>
                <button
                  type="button"
                  className="btn"
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

      <button type="button" className="sign-in" aria-label="sign in">
        Sign in
      </button>
    </header>
  );
};

export default Navbar;
