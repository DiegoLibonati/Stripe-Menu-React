import { useGlobalContext } from "../contexts/context";
import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";
import "../Submenu.css";

const Submenu = (): JSX.Element => {
  const {
    desktopMenu,
    page: { page, links },
    location,
  } = useGlobalContext()!;

  const subMenuHtml = useRef<HTMLElement | null>(null);

  useEffect(() => {
    subMenuHtml.current!.style.left = `${location}px`;
  }, [page, location]);

  return (
    <aside
      ref={subMenuHtml}
      className={
        desktopMenu ? "submenu_container show-submenu" : "submenu_container"
      }
    >
      <h3>{page}</h3>

      <ul className="submenu_container_list">
        {links.map((link, index) => {
          const { label, url } = link;
          return (
            <li key={index}>
              <a href={url}>
                {page === "Products" ? (
                  <FaCreditCard
                    style={{ marginRight: "1rem" }}
                    className="icon"
                  />
                ) : page === "Developers" ? (
                  <FaBook style={{ marginRight: "1rem" }} className="icon" />
                ) : (
                  <FaBriefcase
                    style={{ marginRight: "1rem" }}
                    className="icon"
                  />
                )}
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Submenu;
