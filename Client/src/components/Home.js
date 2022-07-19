import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../App.css";
import { Button, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className="image">
      <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <div className="d-flex justify-content-center align-items-center h-100 w-992px">
          <div className="text-white">
            <h1 style={{ fontSize: "6rem" }}>Weather Report</h1>
            <h5 style={{ fontSize: "2rem", marginLeft: "10px" }}>
              Best &amp; free website for weather report
            </h5>
            <Stack
              sx={{ padding: "4px" }}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              {!user && (
                <Button
                  sx={{
                    color: "white",
                    border: "2px white solid",

                    marginLeft: "30px",
                    width: "140px",
                  }}
                  component={Link}
                  to="/Signup"
                  variant="outlined"
                >
                  Sign Up
                </Button>
              )}
              {!user && (
                <Button
                  sx={{
                    color: "white",
                    border: "2px white solid",
                    width: "140px",
                  }}
                  component={Link}
                  to="/Login"
                  variant="outlined"
                >
                  Sign In
                </Button>
              )}
              {user && (
                <Button
                  sx={{
                    color: "white",
                    border: "2px white solid",
                    hieght: "10px",
                  }}
                  onClick={handleLogout}
                  variant="outlined"
                >
                  Logout
                </Button>
              )}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
