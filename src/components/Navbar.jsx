import logo from "../svgs/logo.svg";
import { FaBars } from "react-icons/fa";
import "../Navbar.css";
import { useGlobalContext } from "../helpers/context";

const Navbar = () => {
  const {
    handleMobileMenuOpen,
    handleDesktopMenuOpen,
    handleDesktopMenuClose,
  } = useGlobalContext();

  const openMenu = (e) => {
    const page = e.target.textContent;
    const location = e.target.getBoundingClientRect();
    const centerBtn = (location.left + location.right) / 2;
    handleDesktopMenuOpen(page, centerBtn);
  };

  const handleDesktopClose = (e) => {
    if (!e.target.classList.contains("btn")) {
      handleDesktopMenuClose();
    }
  };

  return (
    <>
      <header
        className="header_container"
        onMouseOver={(e) => handleDesktopClose(e)}
      >
        <div className="header_container_logo">
          <img src={logo} alt="logo"></img>
          <FaBars id="bars" onClick={() => handleMobileMenuOpen()}></FaBars>
        </div>

        <nav className="header_container_nav">
          <ul className="header_container_nav_list">
            <li>
              <button
                type="button"
                className="btn"
                onMouseOver={(e) => openMenu(e)}
              >
                Products
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn"
                onMouseOver={(e) => openMenu(e)}
              >
                Developers
              </button>
            </li>

            <li>
              <button
                type="button"
                className="btn"
                onMouseOver={(e) => openMenu(e)}
              >
                Company
              </button>
            </li>
          </ul>
        </nav>

        <button type="button" className="sign-in">
          Sign in
        </button>
      </header>
    </>
  );
};

export default Navbar;
