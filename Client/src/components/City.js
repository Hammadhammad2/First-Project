import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDebounce } from "use-debounce";
import { Paper, Button, Alert, Box, Stack } from "@mui/material";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const City = () => {
  const [displayLocations, setDisplayLocations] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [delayValue] = useDebounce(inputValue, 1000);

  const [response, setResponse] = useState(null);

  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };

  useEffect(() => {
    if (delayValue !== "" && !inputValue.includes(",")) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${delayValue}.json?limit=5&proximity=ip&types=place%2Cpostcode&language=en&access_token=pk.eyJ1Ijoic2VkaWw0MDk4NyIsImEiOiJjbDVvMmQ4MWEwODd1M2NwZG56OHd0dnA1In0.mC9I7MCmfuu02D9snGFrmw`
        )
        .then((res) => {
          const search = res.data.features;
          var newData = [];
          for (var i = 0; i < search.length; i++) {
            newData.push({
              placeId: search[i].id,
              label: search[i].place_name,
              lon: search[i].geometry.coordinates[0],
              lat: search[i].geometry.coordinates[1],
            });
          }
          setDisplayLocations(newData);
        });
    }
  }, [delayValue]);

  return (
    <Box sx={{ margin: "100px" }}>
      <Paper
        elevation={2}
        sx={{
          padding: "20px",
        }}
      >
        <Autocomplete
          noOptionsText="No Cities Found"
          size="small"
          clearOnBlur={false}
          onChange={(event, newValue) => {
            // setLocation(newValue);

            if (newValue) {
              if (user) {
                newValue["userId"] = user._id;
              }

              console.log(newValue);

              axios
                .post("http://localhost:3001/City", newValue)
                .then((res) => {
                  location.push(newValue);
                })
                .catch((res) => {
                  setResponse(res.response.data.message);
                  console.log(res.response.data.message);
                });
            }
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            setDisplayLocations([]);
          }}
          id="controllable-states-demo"
          options={displayLocations}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Search Location" />
          )}
        />

        <Paper>
          {response && (
            <Box>
              {changeResponse()}
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity="error"
              >
                {response}
              </Alert>
            </Box>
          )}
        </Paper>
        <h2>Cities</h2>
        {location.length > 0 ? (
          <div>
            {location.map((loc, index) => (
              <h3 key={index}>{loc.label}</h3>
            ))}
          </div>
        ) : (
          <h3>No Cities Added</h3>
        )}
        <Stack direction="row" justifyContent="center">
          <Button
            component={Link}
            to="/ShowCity"
            variant="contained"
            sx={{ width: "200px" }}
          >
            View All Cities
          </Button>
        </Stack>
      </Paper>
      {user && <Logout />}
    </Box>
  );
};

export default City;
