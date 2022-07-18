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

const ShowCity = () => {
  const [cities, setCities] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Box
      sx={{
        margin: "100px",
      }}
    >
      <Paper elevation={2} sx={{ padding: "20px" }}>
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
                console.log(res.data);
                setCities(res.data);
              })
              .catch((res) => {
                console.log(res.response.data.message);
              });
          }}
          sx={{ marginBottom: "20px" }}
        >
          Get Cities
        </Button>

        {cities.length > 0 && (
          <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">City Name</TableCell>
                  <TableCell component="th">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities.map((city, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                                // console.log(res);

                                setCities(
                                  cities.filter((c) => c._id !== city._id)
                                );
                              })
                              .catch((res) => {
                                console.log(res.response.data.message);
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
        )}
      </Paper>
      <Stack direction="row" justifyContent="center" spacing={3}>
        <Box>
          <Button
            component={Link}
            to="/SeeWeather"
            variant="contained"
            sx={{ width: "200px", margin: "50px 0px" }}
          >
            Show Weather
          </Button>
        </Box>
        {user && <Logout />}
      </Stack>
    </Box>
  );
};

export default ShowCity;
