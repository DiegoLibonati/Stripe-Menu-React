import "../Submenu.css";
import { useGlobalContext } from "../helpers/context";
import { useRef } from "react";
import { useEffect } from "react";

const Submenu = () => {
  const {
    desktopMenu,
    page: { page, links },
    location,
  } = useGlobalContext();

  const subMenuHtml = useRef();

  useEffect(() => {
    subMenuHtml.current.style.left = `${location}px`;
  }, [page, location]);

  return (
    <>
      <aside
        ref={subMenuHtml}
        className={
          desktopMenu ? "submenu_container show-submenu" : "submenu_container"
        }
      >
        <h3>{page}</h3>

        <ul className="submenu_container_list">
          {links.map((link, index) => {
            const { label, icon, url } = link;
            return (
              <li key={index}>
                <a href={url}>
                  {icon}
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Submenu;
