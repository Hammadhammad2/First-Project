import React, { useState, useEffect } from "react";

import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ShowCity from "./components/ShowCity";
import City from "./components/City";
import SeeWeather from "./components/SeeWeather";
import { AuthRoutes, ProtectedRoutes } from "./ProtectedRoutes";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/Login"
          element={
            <AuthRoutes page="signin" loggedIn={user}>
              <Login />
            </AuthRoutes>
          }
        />
        <Route
          path="/Signup"
          element={
            <AuthRoutes page="signup" loggedIn={user}>
              <Signup />
            </AuthRoutes>
          }
        />

        <Route
          path="/ShowCity"
          element={
            <ProtectedRoutes loggedIn={user}>
              <ShowCity />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/City"
          element={
            <ProtectedRoutes loggedIn={user}>
              <City />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/SeeWeather"
          element={
            <ProtectedRoutes loggedIn={user}>
              <SeeWeather />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
