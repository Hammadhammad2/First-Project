import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../App.css";
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import bgimage from "../image.jpg";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgimage})`,
        height: "100vh",

        /* Center and scale the image nicely */
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "blue",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "200px 500px",
          height: "100vh",
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100 w-992px">
          <div className="text-white">
            <h1 style={{ fontSize: "6rem" }}>Weather Report</h1>
            <h5 style={{ fontSize: "2rem", marginLeft: "10px" }}>
              Best &amp; free website for weather report
            </h5>
            <Stack
              sx={{ padding: "4px", mt: 2 }}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              {!user && (
                <Button
                  sx={{
                    color: "white",
                    border: "2px white solid",
                    hover: "golden",
                    marginLeft: "30px",
                    width: "180px",
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
                    width: "180px",
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
      </Box>
    </Box>
  );
};

export default Home;
