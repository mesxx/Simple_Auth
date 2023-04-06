import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Navbar, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

export default function Nav() {
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  const { userLogin } = state;
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand>
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {userLogin?.role === "admin" ? "Admin" : "Staff"} Page
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button
          className="mx-2"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
        {Cookies.get("token") ? (
          <Button
            onClick={() => {
              Cookies.remove("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href={userLogin?.role === "admin" ? "/admin" : "/"}>
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
