import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./components/404";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Layout from "./layout/Layout";

import { GlobalContext } from "./context/GlobalContext";

function App() {
  function LoginRoute(props) {
    if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    } else if (Cookies.get("token") === undefined) {
      return props.children;
    }
  }

  const AdminRoute = (props) => {
    const [data, setData] = useState(null);
    const { state } = useContext(GlobalContext);
    const { setUserLogin } = state;

    const checkUser = async () => {
      try {
        const data = await axios({
          method: "get",
          url: "http://localhost:5000/api/user",
          headers: { Authorization: Cookies.get("token") },
        });
        if (data.status === 200) {
          setData(data.data.data);
        }
      } catch (error) {}
    };

    useEffect(() => {
      if (Cookies.get("token") !== undefined) {
        checkUser();
      }
    }, []);

    if (Cookies.get("token") === undefined) {
      return <Navigate to={"/login"} />;
    }

    if (!data) {
      return (
        <div className="grid h-screen place-items-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      );
    } else if (data?.role === "staff") {
      return <NotFound />;
    } else if (data?.role === "admin") {
      setUserLogin(data);
      return props.children;
    }
  };

  const StaffRoute = (props) => {
    const [data, setData] = useState(null);
    const { state } = useContext(GlobalContext);
    const { setUserLogin } = state;

    const checkUser = async () => {
      try {
        const data = await axios({
          method: "get",
          url: "http://localhost:5000/api/user",
          headers: { Authorization: Cookies.get("token") },
        });
        if (data.status === 200) {
          setData(data.data.data);
        }
      } catch (error) {}
    };

    useEffect(() => {
      if (Cookies.get("token") !== undefined) {
        checkUser();
      }
    }, []);

    if (Cookies.get("token") === undefined) {
      return <Navigate to={"/login"} />;
    }

    if (!data) {
      return (
        <div className="grid h-screen place-items-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      );
    } else if (data?.role === "admin") {
      return <NotFound />;
    } else if (data?.role === "staff") {
      setUserLogin(data);
      return props.children;
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StaffRoute>
            <Layout>
              <Home sasa="sata" />
            </Layout>
          </StaffRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout>
              <Admin />
            </Layout>
          </AdminRoute>
        }
      />
      <Route
        path="/login"
        element={
          <LoginRoute>
            <Login />
          </LoginRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
