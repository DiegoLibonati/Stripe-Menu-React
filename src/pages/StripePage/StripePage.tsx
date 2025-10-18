import { Fragment } from "react/jsx-runtime";

import Hero from "@src/components/Hero/Hero";
import Navbar from "@src/components/Navbar/Navbar";
import Submenu from "@src/components/Submenu/Submenu";
import Sidebar from "@src/components/Sidebar/Sidebar";

import "@src/pages/StripePage/StripePage.css";

export const StripePage = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <Sidebar></Sidebar>
      <Hero></Hero>
    </Fragment>
  );
};
