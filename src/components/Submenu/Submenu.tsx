import { useRef, useEffect } from "react";
import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";

import { useStripeContext } from "@/hooks/useStripeContext";

import "@/components/Submenu/Submenu.css";

const Submenu = () => {
  const subMenuHtml = useRef<HTMLElement | null>(null);

  const { stripeState } = useStripeContext()!;
  const { desktopMenu, subLink, location } = stripeState;
  const { page, links } = subLink;

  useEffect(() => {
    subMenuHtml.current!.style.left = `${location}px`;
  }, [page, location]);

  return (
    <aside ref={subMenuHtml} className={desktopMenu ? "submenu submenu--show" : "submenu"}>
      <h3 className="submenu__title">{page}</h3>

      <ul className="submenu__list">
        {links.map((link, index) => {
          const { label, url } = link;
          return (
            <li key={index} className="submenu__list-item">
              <a href={url} aria-label={label} className="submenu__link">
                {page === "Products" ? (
                  <FaCreditCard
                    style={{ marginRight: "0.625rem" }}
                    className="submenu__link-icon"
                    aria-hidden="true"
                  />
                ) : page === "Developers" ? (
                  <FaBook
                    style={{ marginRight: "0.625rem" }}
                    className="submenu__link-icon"
                    aria-hidden="true"
                  />
                ) : (
                  <FaBriefcase
                    style={{ marginRight: "0.625rem" }}
                    className="submenu__link-icon"
                    aria-hidden="true"
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
