import { Fragment } from "react/jsx-runtime";

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Submenu from "./components/Submenu/Submenu";

import "./App.css";

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
