import React from "react";
import Navbar from "../partials/Navbar";

const Layout = (props) => {
  console.log(props.sasa);
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default Layout;
