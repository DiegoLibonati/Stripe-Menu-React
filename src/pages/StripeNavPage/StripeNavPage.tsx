import { Fragment } from "react/jsx-runtime";

import type { JSX } from "react";

import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Submenu from "@/components/Submenu/Submenu";
import Sidebar from "@/components/Sidebar/Sidebar";

import "@/pages/StripeNavPage/StripeNavPage.css";

const StripeNavPage = (): JSX.Element => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <Sidebar></Sidebar>
      <Hero></Hero>
    </Fragment>
  );
};

export default StripeNavPage;
