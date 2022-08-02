import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Paper, Stack } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import bgimage from "../image.jpg";

const ShowCity = () => {
  const [cities, setCities] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

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
        <Paper elevation={20} sx={{ padding: "20px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              axios
                .get("http://localhost:3001/ShowCity", {
                  params: { userId: user._id },
                })
                .then((res) => {
                  console.log(res);
                  setCities(res);
                })
                .catch((res) => {
                  console.log(res.response.data.message);
                });
            }}
          >
            Get Cities
          </Button>
        </Paper>
        <Paper elevation={20} sx={{ padding: "20px" }}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 500,
              overflow: "hidden",
              // overflowY: "scroll",
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
            {cities.length > 0 ? (
              <TableContainer component={Paper} elevation={6}>
                <Table
                  sx={{ minWidth: 500, fontSize: "10px" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border: 1 }} component="th">
                        City Name
                      </TableCell>
                      <TableCell sx={{ border: 1 }} component="th">
                        Options
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cities.map((city, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{city.label}</TableCell>

                        <TableCell>
                          {
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => {
                                axios
                                  .delete("http://localhost:3001/deleteCity", {
                                    params: {
                                      cityId: city._id,
                                    },
                                  })
                                  .then((res) => {
                                    console.log(res);

                                    setCities(
                                      cities.filter((c) => c._id !== city._id)
                                    );
                                  })
                                  .catch((res) => {
                                    console.log(res);
                                  });
                              }}
                            >
                              Delete
                            </Button>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <h5
                style={{
                  color: "#158FFA",
                  textAlign: "center",
                  bgcolor: "black",
                  font: "40px Open Sans bold",
                  border: " 1px solid #158FFA",
                }}
              >
                Click button to get cities
              </h5>
            )}
          </Box>
        </Paper>
        <Stack direction="row" justifyContent="center" spacing={3}>
          <Box>
            <Button
              component={Link}
              to="/SeeWeather"
              variant="outlined"
              sx={{
                width: "200px",
                margin: "50px 0px",
                color: "white",
                border: "2px white solid",
              }}
            >
              Show Weather
            </Button>
          </Box>
          {user && <Logout />}
        </Stack>
      </Box>
    </Box>
  );
};

export default ShowCity;
