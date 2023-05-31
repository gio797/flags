import React from "react";

function Header(props) {
  return (
    <header className={props.darkMode ? "dark" : ""}>
      <h3>Where is the world?</h3>
      <h4 onClick={props.toggleDarkMode} className="theme-div">
        <i className="fa-solid fa-circle-half-stroke"></i> theme
      </h4>
    </header>
  );
}

export default Header;
