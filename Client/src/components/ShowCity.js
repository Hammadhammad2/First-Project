import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Paper, Typography } from "@mui/material";
//import MaterialTable from "material-table";
import axios from "axios";
// import DataGrid from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const paperStyle = { padding: "30px 20px", width: 800, margin: "50px auto" };

const ShowCity = () => {
  const [city, setCity] = useState([]);
  useEffect(() => {
    console.log("hello");
  }, [city]);

  const columns = [
    { title: "label", headerName: "label" },
    { title: "value", headerName: "value" },
  ];
  return (
    <Box
      sx={{
        mt: 50,
        ml: 5,
        boxShadow: 8,
        width: "100rem",
        height: "25rem",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 1,
        m: 1,
        borderRadius: 5,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            axios
              .get("http://localhost:3001/ShowCity")
              .then((res) => {
                setCity(res.data);
                console.log(city);
              })
              .catch((res) => {
                console.log(res.response.data.message);
              });
          }}
        >
          Get Cities
        </Button>

        {city.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">City</TableCell>
                  <TableCell component="th">Value</TableCell>
                  <TableCell component="th">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {city.map((city, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{city.label}</TableCell>
                    <TableCell>{city.value}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={(event) => {
                          console.log(event.target.value);
                          // axios
                          //   .get("http://localhost:3001/deleteCity", city.id)
                          //   .then((res) => {
                          //     // console.log(res.response.data.message);
                          //   })
                          //   .catch((res) => {
                          //     console.log(res.response.data.message);
                          //   });

                          // axios
                          //   .get("http://localhost:3001/ShowCity")
                          //   .then((res) => {
                          //     setCity(res.data);
                          //     console.log(city);
                          //   })
                          //   .catch((res) => {
                          //     console.log(res.response.data.message);
                          //   });
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default ShowCity;
