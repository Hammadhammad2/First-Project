import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { borders } from "@mui/system";

import {
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import bgimage from "../image.jpg";

const SeeWeather = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [weather, setWeather] = useState(null);

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    axios
      .get("http://localhost:3001/ShowCity", {
        params: { userId: user._id },
      })
      .then((res) => {
        setCities(res.data);
        setIsFetch(true);
      })
      .catch((res) => {
        console.log(res.response.data.message);
      });
  }, []);

  const handleChange = (event) => {
    setCity(event.target.value);
    const city = cities.find((city) => city._id === event.target.value);

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: "80a37e80faf0e3803564f2df1ffcbb56",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setWeather({
          img: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          type: data.weather[0].main,
          temp: (data.main.temp - 273.15).toString().split(".")[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Box sx={{ minWidth: 120, margin: "50px" }}>
          <Paper elevation={2} sx={{ padding: "20px" }}>
            {isFetch ? (
              <Box>
                {cities.length > 0 ? (
                  <FormControl fullWidth>
                    <InputLabel size="small">Select City</InputLabel>
                    <Select
                      value={city}
                      label="Select City"
                      size="small"
                      onChange={handleChange}
                    >
                      {cities.map((city, index) => (
                        <MenuItem key={index} value={city._id}>
                          {city.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box>
                    <Typography>
                      No Cities Found. Please Add some first
                    </Typography>
                    <Button component={Link} to="/City" variant="contained">
                      Add City
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </Paper>
        </Box>
        {weather && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ padding: "20px" }}
          >
            <Paper
              elevation={20}
              sx={{
                width: "500px",
                marginTop: "10px",
                padding: "30px",
                borderRadius: "25px",
                borderColor: "error.main",
              }}
            >
              <Stack direction="row">
                <Box
                  flex={10}
                  component="img"
                  src={weather.img}
                  sx={{
                    maxHeight: "240px",
                    maxWidth: "240px",
                    verticalAlign: "middle",
                    paddingRight: "20px",
                  }}
                />
                <Stack direction="column" flex={1} justifyContent="center">
                  {console.log(weather)}
                  <Typography
                    sx={{
                      fontSize: "90px",
                      fontWeight: "500",
                      color: "#158FFA",
                    }}
                  >
                    {weather.temp + "\u00b0C"}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "300",
                    }}
                  >
                    {weather.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "300",
                    }}
                  >
                    {"Wind Speed: " + weather.windSpeed + " m/s"}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "300",
                    }}
                  >
                    {"Humidity: " + weather.humidity + "%"}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        )}

        {user && <Logout />}
      </Box>
    </Box>
  );
};

export default SeeWeather;
