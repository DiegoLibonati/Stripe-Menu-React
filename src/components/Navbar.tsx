import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../contexts/context";
import "../Navbar.css";

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
  );
};

export default Navbar;
