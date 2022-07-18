import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

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
    <Box sx={{ minWidth: 120, margin: "100px" }}>
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
                <Typography>No Cities Found. Please Add some first</Typography>
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

        {weather && (
          <Stack direction="row" justifyContent="center">
            <Paper
              elevation={4}
              sx={{ width: "400px", marginTop: "20px", padding: "20px" }}
            >
              <Stack direction="row">
                <Box
                  flex={1}
                  component="img"
                  src={weather.img}
                  sx={{
                    maxHeight: "140px",
                    maxWidth: "140px",
                    verticalAlign: "middle",
                    paddingRight: "20px",
                  }}
                />
                <Stack direction="column" flex={1} justifyContent="center">
                  {console.log(weather)}
                  <Typography sx={{ fontSize: "22px", fontWeight: "500" }}>
                    {weather.temp + " \u00b0C"}
                  </Typography>
                  <Typography>{weather.type}</Typography>
                  <Typography>
                    {"Wind Speed: " + weather.windSpeed + " m/s"}
                  </Typography>
                  <Typography>
                    {"Humidity: " + weather.humidity + "%"}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Paper>
      {user && <Logout />}
    </Box>
  );
};

export default SeeWeather;
