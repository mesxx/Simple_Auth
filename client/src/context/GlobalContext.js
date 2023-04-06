import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [logData, setLogData] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const [inputLogin, setInputLogin] = useState({ username: "", password: "" });
  const [inputRegis, setInputRegis] = useState({
    username: "",
    password: "",
    role: "",
  });
  const state = {
    data,
    setData,
    inputLogin,
    setInputLogin,
    userLogin,
    setUserLogin,
    inputRegis,
    setInputRegis,
    logData,
    setLogData,
  };

  const fetchData = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/user",
      headers: { Authorization: Cookies.get("token") },
    }).then((res) => {
      setData(res.data);
    });
  };

  const handleInputLogin = (e) => {
    const { name, value } = e.target;
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = inputLogin;
    axios
      .post("http://localhost:5000/api/user/auth/access", {
        username,
        password,
      })
      .then((res) => {
        const { token, role } = res.data.data;
        Cookies.set("token", token);
        if (!res) {
          return (
            <div className="grid h-screen place-items-center">
              <Spinner aria-label="Center-aligned spinner example" size="xl" />
            </div>
          );
        } else if (role === "staff") {
          navigate("/");
        } else if (role === "admin") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    setInputLogin({ username: "", password: "" });
  };

  const handleInputRegis = (e) => {
    const { name, value } = e.target;
    setInputRegis({ ...inputRegis, [name]: value });
  };

  const handleRegis = (e) => {
    e.preventDefault();
    const { username, password, role } = inputRegis;
    axios
      .post("http://localhost:5000/api/user/auth/register", {
        username,
        password,
        role,
      })
      .then((res) => {
        const { token, role } = res.data.data;
        Cookies.set("token", token);
        if (!res) {
          return (
            <div className="grid h-screen place-items-center">
              <Spinner aria-label="Center-aligned spinner example" size="xl" />
            </div>
          );
        } else if (role === "staff") {
          navigate("/");
        } else if (role === "admin") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    setInputRegis({ username: "", password: "", role: "" });
  };

  const fetchDataLogged = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/user/logged",
      headers: { Authorization: Cookies.get("token") },
    }).then((res) => {
      setLogData(res.data);
    });
  };

  const handleFunction = {
    fetchData,
    handleInputLogin,
    handleLogin,
    handleInputRegis,
    handleRegis,
    fetchDataLogged,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {children}
    </GlobalContext.Provider>
  );
};
