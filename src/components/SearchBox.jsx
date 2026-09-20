import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim() === "") {
      return;
    }

    onSearch(city);
    setCity("");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
      }}
    >
      <TextField
        label="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
}

export default SearchBox;