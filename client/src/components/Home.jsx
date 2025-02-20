import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { Container, Typography, Button, Box, Grid } from "@mui/material";

const API_BASE_URL = "http://localhost:5000/countries";

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name)); 
      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries.slice(0, pageSize));
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = countries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered.slice(0, pageSize));
    setPage(1);
  };

  const handleFilter = async (selectedRegion) => {
    setRegion(selectedRegion);
    setPage(1);
    
    if (!selectedRegion) {
      fetchCountries(); 
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/region/${selectedRegion}`);
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries.slice(0, pageSize));
    } catch (error) {
      console.error("Error fetching countries by region", error);
    }
  };

  const handleNextPage = () => {
    if (page * pageSize < countries.length) {
      setPage(page + 1);
      setFilteredCountries(countries.slice(page * pageSize, (page + 1) * pageSize));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setFilteredCountries(countries.slice((page - 2) * pageSize, (page - 1) * pageSize));
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Country Information
      </Typography>
      <Box display="flex" justifyContent="center" mb={2} gap={2}>
        <SearchBar onSearch={handleSearch} sx={{ width: "300px" }} />
        <Filters onFilter={handleFilter} sx={{ width: "200px" }} />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {filteredCountries.map((country) => (
          <Grid item key={country.name} xs={12} sm={6} md={4} lg={3} xl={2}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <Typography variant="h6">Page {page}</Typography>
        <Button variant="contained" onClick={handleNextPage} disabled={page * pageSize >= countries.length}>
          Next
        </Button>
      </Box>
    </Container>
  );
}


export default Home;
