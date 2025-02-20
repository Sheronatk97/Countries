import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Filters = ({ onFilter }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Filter by Region</InputLabel>
      <Select onChange={(e) => onFilter(e.target.value)}>
        <MenuItem value="">All</MenuItem>
        {regions.map((region) => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filters;
