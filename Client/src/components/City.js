import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDebounce } from "use-debounce";
import { Paper, Button } from "@mui/material";

const City = () => {
  const [displayLocations, setDisplayLocations] = useState([]);

  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [delayValue] = useDebounce(inputValue, 1000);
  const [value, setValue] = useState("");

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
    <Paper
      elevation={2}
      sx={{
        margin: "100px",
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
            location.push(newValue);

            console.log(newValue);

            axios
              .post("http://localhost:3001/City", newValue)
              .then((res) => {
                console.log(res);
              })
              .catch((res) => {
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
    </Paper>
  );
};

export default City;
