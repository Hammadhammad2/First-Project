import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Switch from "react-switch";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ShowCity from "./components/ShowCity";
import City from "./components/City";
import SeeWeather from "./components/SeeWeather";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="ShowCity" element={<ShowCity />} />
      <Route path="City" element={<City />} />
      <Route path="SeeWeather" element={<SeeWeather />} />
    </Routes>
  </Router>
);
