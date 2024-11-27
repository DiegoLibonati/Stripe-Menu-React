import { useRef, useEffect } from "react";

import { useGlobalContext } from "../../contexts/context";

import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import "./Submenu.css";

const Submenu = (): JSX.Element => {
  const subMenuHtml = useRef<HTMLElement | null>(null);

  const {
    subLink: { page, links },
    desktopMenu,
    location,
  } = useGlobalContext()!;

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
              <a href={url} aria-label={`link ${label}`}>
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
