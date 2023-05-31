import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Applayout() {
  const [darkMode, setDarkMode] = React.useState(true);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <div className="page-wrapper">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Outlet context={{ darkMode }} />
    </div>
  );
}

export default Applayout;
