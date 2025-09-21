import { Fragment } from "react/jsx-runtime";

import Hero from "@src/components/Hero/Hero";
import Navbar from "@src/components/Navbar/Navbar";
import Sidebar from "@src/components/Sidebar/Sidebar";
import Submenu from "@src/components/Submenu/Submenu";

import "@src/App.css";

function App(): JSX.Element {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <Sidebar></Sidebar>
      <Hero></Hero>
    </Fragment>
  );
}

export default App;
