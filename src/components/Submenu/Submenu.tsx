import { useRef, useEffect } from "react";
import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import { useGlobalContext } from "@src/contexts/context";

import "@src/components/Submenu/Submenu.css";

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
      className={desktopMenu ? "submenu submenu--show" : "submenu"}
    >
      <h3 className="submenu__title">{page}</h3>

      <ul className="submenu__list">
        {links.map((link, index) => {
          const { label, url } = link;
          return (
            <li key={index} className="submenu__list-item">
              <a
                href={url}
                aria-label={`link ${label}`}
                className="submenu__link"
              >
                {page === "Products" ? (
                  <FaCreditCard
                    style={{ marginRight: "1rem" }}
                    className="submenu__link-icon"
                  />
                ) : page === "Developers" ? (
                  <FaBook
                    style={{ marginRight: "1rem" }}
                    className="submenu__link-icon"
                  />
                ) : (
                  <FaBriefcase
                    style={{ marginRight: "1rem" }}
                    className="submenu__link-icon"
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
