import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Submenu from "./components/Submenu";

function App(): JSX.Element {
  return (
    <>
      <Navbar></Navbar>
      <Submenu></Submenu>
      <Sidebar></Sidebar>
      <Hero></Hero>
    </>
  );
}

export default App;
