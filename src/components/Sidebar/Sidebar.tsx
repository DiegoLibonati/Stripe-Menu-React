import { FaTimes, FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import { useStripeContext } from "@/hooks/useStripeContext";

import subLinks from "@/constants/subLinks";

import "@/components/Sidebar/Sidebar.css";

const Sidebar = () => {
  const { stripeState, handleMobileMenuClose } = useStripeContext()!;
  const { mobileMenu } = stripeState;

  return (
    <div className={mobileMenu ? "sidebar-wrapper sidebar-wrapper--show" : "sidebar-wrapper"}>
      <aside
        id="sidebar-nav"
        className="sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          onClick={handleMobileMenuClose}
          type="button"
          aria-label="Close navigation menu"
          className="sidebar__close"
        >
          <FaTimes id="close" className="sidebar__close-icon" aria-hidden="true"></FaTimes>
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
                        aria-label={label}
                        className="sidebar__sublinks-link"
                      >
                        {page === "Products" ? (
                          <FaCreditCard
                            style={{ marginRight: "0.625rem" }}
                            className="sidebar__sublinks-link-icon"
                            aria-hidden="true"
                          />
                        ) : page === "Developers" ? (
                          <FaBook
                            style={{ marginRight: "0.625rem" }}
                            className="sidebar__sublinks-link-icon"
                            aria-hidden="true"
                          />
                        ) : (
                          <FaBriefcase
                            style={{ marginRight: "0.625rem" }}
                            className="sidebar__sublinks-link-icon"
                            aria-hidden="true"
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
