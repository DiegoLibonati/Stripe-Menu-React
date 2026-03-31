import { Fragment } from "react/jsx-runtime";

import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Submenu from "@/components/Submenu/Submenu";
import Sidebar from "@/components/Sidebar/Sidebar";

import "@/pages/StripePage/StripePage.css";

const StripePage = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <Sidebar></Sidebar>
      <Hero></Hero>
    </Fragment>
  );
};

export default StripePage;
