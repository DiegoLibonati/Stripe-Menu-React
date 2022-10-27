import sublinks from "../helpers/data.js";
import { FaTimes } from "react-icons/fa";
import "../Sidebar.css";
import { useGlobalContext } from "../helpers/context";

const Sidebar = () => {
  const { mobileMenu, handleMobileMenuClose } = useGlobalContext();

  return (
    <>
      <div
        className={
          mobileMenu ? "sidebar-wrapper show-sidebar" : "sidebar-wrapper"
        }
      >
        <aside className="sidebar_container">
          <FaTimes id="close" onClick={() => handleMobileMenuClose()}></FaTimes>

          <ul className="sidebar_container_list">
            {sublinks.map((item, index) => {
              const { page, links } = item;

              return (
                <li key={index}>
                  <h4>{page}</h4>

                  <div className="links_container">
                    {links.map((link, index) => {
                      const { label, icon, url } = link;

                      return (
                        <a key={index} href={url}>
                          {icon} {label}
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
    </>
  );
};

export default Sidebar;
