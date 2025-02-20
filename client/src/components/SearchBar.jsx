import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search for a country..."
      variant="outlined"
      value={query}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;
