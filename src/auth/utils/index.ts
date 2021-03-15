import { isExpired } from "react-jwt";
import axios from "axios";
import { Link, navigate, Redirect } from "@reach/router";

export const isAuthenticated = (): boolean => {
  // CHECKS IF TOKEN IS SAVED AND IF STILL VALID
  const token = localStorage.getItem("token");
  return token ? !isExpired(token) : false;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const _doAuthentication = (
  endpoint: string,
  values: { [key: string]: string }
) => {
  return getInfo(`http://127.0.0.1:5000/api/${endpoint}`, { ...values });
};

export const getInfo = (
  url: string,
  options: { [key: string]: string | object }
) => {
  // PERFORM API CALLS SENDING THE REQUIRED AUTH HEADERS
  const headers: { [key: string]: string } = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    if (isAuthenticated()) {
      // config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    return config;
  });

  return instance.post(url, { ...options }, { ...headers });
};

export const signup = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) => {
  _doAuthentication("users", {
    firstName,
    lastName,
    email,
    username,
    password,
  })
    .then(({ data }) => setToken(data.token))
    .then(() => navigate("/"))
    .catch((err) => console.error(err));
};

export const login = (email: string, password: string) => {
  return _doAuthentication("users/authenticate", { email, password })
    .then(({ data }) => {
      if (!data.token) {
        // setState({signupError: data.message})
        return false;
      }
      setToken(data.token);
      return true;
    })
    .then((trueOrFalse) => (trueOrFalse ? navigate("/blackjack") : null))
    .catch((err) => console.error(err));
};

export const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
