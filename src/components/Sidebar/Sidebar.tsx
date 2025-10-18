import { FaTimes, FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import { useStripeContext } from "@src/hooks/useStripeContext";

import subLinks from "@src/constants/subLinks";

import "@src/components/Sidebar/Sidebar.css";

const Sidebar = () => {
  const { mobileMenu, handleMobileMenuClose } = useStripeContext()!;

  return (
    <div
      className={
        mobileMenu ? "sidebar-wrapper sidebar-wrapper--show" : "sidebar-wrapper"
      }
    >
      <aside className="sidebar">
        <button
          onClick={handleMobileMenuClose}
          type="button"
          aria-label="close menu"
          className="sidebar__close"
        >
          <FaTimes id="close" className="sidebar__close-icon"></FaTimes>
        </button>

        <ul className="sidebar__list">
          {subLinks.map((item, index) => {
            const { page, links } = item;

            return (
              <li key={index} className="sidebar__list-item">
                <h4 className="sidebar__subtitle">{page}</h4>

                <div className="sidebar__sublinks">
                  {links.map((link, index) => {
                    const { label, url } = link;

                    return (
                      <a
                        key={index}
                        href={url}
                        aria-label={`link ${label}`}
                        className="sidebar__sublinks-link"
                      >
                        {page === "Products" ? (
                          <FaCreditCard
                            style={{ marginRight: "1rem" }}
                            className="sidebar__sublinks-link-icon"
                          />
                        ) : page === "Developers" ? (
                          <FaBook
                            style={{ marginRight: "1rem" }}
                            className="sidebar__sublinks-link-icon"
                          />
                        ) : (
                          <FaBriefcase
                            style={{ marginRight: "1rem" }}
                            className="sidebar__sublinks-link-icon"
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
