import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const CountryCard = ({ country }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mt: 2 }}>
      <Card sx={{ maxWidth: 320, boxShadow: 3, borderRadius: 2, textAlign: "center", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
        <CardMedia 
          component="img" 
          height="160" 
          image={country.flag} 
          alt={country.name} 
          sx={{ objectFit: "cover" }} 
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">{country.name}</Typography>
          <Typography variant="body2" color="text.secondary">🌍 Region: {country.region}</Typography>
          <Typography variant="body2" color="text.secondary">🏡 Population: {country.population.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CountryCard;
