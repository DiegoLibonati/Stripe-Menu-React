import { SubLink } from "../entities/entities";

export const subLinks: SubLink[] = [
  {
    page: "Products",
    links: [
      {
        label: "payment",
        url: "/products",
      },
      {
        label: "terminal",
        url: "/products",
      },
      {
        label: "connect",
        url: "/products",
      },
    ],
  },
  {
    page: "Developers",
    links: [
      { label: "plugins", url: "/products" },
      {
        label: "libraries",

        url: "/products",
      },
      { label: "help", url: "/products" },
      { label: "billing", url: "/products" },
    ],
  },
  {
    page: "Company",
    links: [
      {
        label: "about",

        url: "/products",
      },
      {
        label: "customers",

        url: "/products",
      },
    ],
  },
];
