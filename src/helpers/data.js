import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";
import React from "react";
const sublinks = [
  {
    page: "Products",
    links: [
      {
        label: "payment",
        icon: <FaCreditCard className="icon" />,
        url: "/products",
      },
      {
        label: "terminal",
        icon: <FaCreditCard className="icon" />,
        url: "/products",
      },
      {
        label: "connect",
        icon: <FaCreditCard className="icon" />,
        url: "/products",
      },
    ],
  },
  {
    page: "Developers",
    links: [
      { label: "plugins", icon: <FaBook className="icon" />, url: "/products" },
      {
        label: "libraries",
        icon: <FaBook className="icon" />,
        url: "/products",
      },
      { label: "help", icon: <FaBook className="icon" />, url: "/products" },
      { label: "billing", icon: <FaBook className="icon" />, url: "/products" },
    ],
  },
  {
    page: "Company",
    links: [
      {
        label: "about",
        icon: <FaBriefcase className="icon" />,
        url: "/products",
      },
      {
        label: "customers",
        icon: <FaBriefcase className="icon" />,
        url: "/products",
      },
    ],
  },
];

export default sublinks;
