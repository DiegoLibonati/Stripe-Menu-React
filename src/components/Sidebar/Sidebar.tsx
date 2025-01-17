import { useGlobalContext } from "../../contexts/context";

import { subLinks } from "../../constants/data";

import { FaTimes } from "react-icons/fa";
import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  const { mobileMenu, handleMobileMenuClose } = useGlobalContext()!;

  return (
    <div
      className={
        mobileMenu ? "sidebar__wrapper sidebar__wrapper--show" : "sidebar__wrapper"
      }
    >
      <aside className="sidebar">
        <button
          onClick={handleMobileMenuClose}
          type="button"
          aria-label="close menu"
        >
          <FaTimes id="close"></FaTimes>
        </button>

        <ul className="sidebar__list">
          {subLinks.map((item, index) => {
            const { page, links } = item;

            return (
              <li key={index}>
                <h4>{page}</h4>

                <div className="sidebar__link">
                  {links.map((link, index) => {
                    const { label, url } = link;

                    return (
                      <a key={index} href={url} aria-label={`link ${label}`}>
                        {page === "Products" ? (
                          <FaCreditCard
                            style={{ marginRight: "1rem" }}
                            className="icon"
                          />
                        ) : page === "Developers" ? (
                          <FaBook
                            style={{ marginRight: "1rem" }}
                            className="icon"
                          />
                        ) : (
                          <FaBriefcase
                            style={{ marginRight: "1rem" }}
                            className="icon"
                          />
                        )}
                        {label}
                      </a>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
