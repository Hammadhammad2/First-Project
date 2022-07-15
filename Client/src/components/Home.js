import { AsyncPaginate } from "react-select-async-paginate";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Paper, Button } from "@mui/material";
import { GEO_API_URL } from "./Api";
import { geoAPioptions } from "./Api";

const City = ({ onSeachChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
     setSearch(searchData);
    console.log(searchData.label);

    axios
      .post("http://localhost:3001/City", search)
      .then((res) => {
        // console.log(res);
      })
      .catch((res) => {
        console.log(res.response.data.message);
      });
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoAPioptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude}${city.longitude}`,
              label: `${city.name},${city.countryCode}`,
            };
          }),
        };
      })

      .catch((err) => console.error(err));
  };

  return (
    <Paper
      sx={{
        mt: 20,
        ml: 20,
        mr: 20,
      }}
    >
      <AsyncPaginate
        placeholder="Search for city"
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      ></AsyncPaginate>
    </Paper>
  );
};

export default City;
