import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { Container, Typography, Box, Grid, Button } from "@mui/material";

const CountryCard = lazy(() => import("./CountryCard"));
const SearchBar = lazy(() => import("./SearchBar"));
const Filters = lazy(() => import("./Filters"));

const API_BASE_URL = "http://localhost:5000/countries";

function Home() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const batchSize = 20; // Load in batches

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
      setDisplayedCountries(sortedCountries.slice(0, batchSize));
    } catch (error) {
      console.error("Error fetching countries", error);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setDisplayedCountries(
      countries
        .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, batchSize)
    );
  };

  const handleFilter = async (selectedRegion) => {
    setRegion(selectedRegion);
    if (!selectedRegion) {
      fetchCountries();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/region/${selectedRegion}`);
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
      setDisplayedCountries(sortedCountries.slice(0, batchSize));
    } catch (error) {
      console.error("Error fetching countries by region", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    const nextBatch = displayedCountries.length + batchSize;
    setDisplayedCountries(countries.slice(0, nextBatch));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Country Information
      </Typography>

      <Box display="flex" justifyContent="center" mb={2} gap={2}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar onSearch={handleSearch} sx={{ width: "300px" }} />
          <Filters onFilter={handleFilter} sx={{ width: "200px" }} />
        </Suspense>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Suspense fallback={<div>Loading countries...</div>}>
          {displayedCountries.map((country) => (
            <Grid item key={country.name} xs={12} sm={6} md={4} lg={3} xl={2}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Suspense>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        {displayedCountries.length < countries.length && (
          <Button variant="contained" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Home;
