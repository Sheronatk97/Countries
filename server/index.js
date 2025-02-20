const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const REST_COUNTRIES_API = "https://restcountries.com/v3.1";

app.use(cors());
app.use(express.json());


app.get("/countries", async (req, res) => {
    try {
        const response = await axios.get(`${REST_COUNTRIES_API}/all`);
        let countries = response.data.map((country) => ({
            name: country.name.common,
            population: country.population,
            flag: country.flags.svg,
            region: country.region,
            currency: country.currencies ? Object.keys(country.currencies)[0] : "N/A",
        }));

        countries.sort((a, b) => a.name.localeCompare(b.name));

        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch country data" });
    }
});

app.get("/countries/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const response = await axios.get(`${REST_COUNTRIES_API}/alpha/${code}`);
        res.json(response.data[0]);
    } catch (error) {
        res.status(404).json({ error: "Country not found" });
    }
});

app.get("/countries/region/:region", async (req, res) => {
    try {
        const { region } = req.params;
        const response = await axios.get(`${REST_COUNTRIES_API}/region/${region}`);
        const countries = response.data.map((country) => ({
            name: country.name.common,
            population: country.population,
            flag: country.flags.svg,
            region: country.region,
            currency: country.currencies ? Object.keys(country.currencies)[0] : "N/A",
        }));
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch countries by region" });
    }
});


app.get("/countries/search", async (req, res) => {
    try {
        const { name, capital, region, timezone } = req.query;
        let url = `${REST_COUNTRIES_API}/all`;
        const response = await axios.get(url);
        let countries = response.data;

        if (name) {
            countries = countries.filter((c) => c.name.common.toLowerCase().includes(name.toLowerCase()));
        }
        if (capital) {
            countries = countries.filter((c) => c.capital && c.capital[0].toLowerCase().includes(capital.toLowerCase()));
        }
        if (region) {
            countries = countries.filter((c) => c.region.toLowerCase() === region.toLowerCase());
        }
        if (timezone) {
            countries = countries.filter((c) => c.timezones.includes(timezone));
        }
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: "Failed to search countries" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
