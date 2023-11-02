import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Stack, Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "../constants/customTheme"

function Item() {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/inventory/items/${id}`)
      .then((response) => {
        const data = response.data;
        setItem(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleAddClick() {
    // todo:
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Stack
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ p: 2, m: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          <img
            srcSet={`http://localhost:3000/${item.actualImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`http://localhost:3000/${item.actualImage}?w=164&h=164&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
          />
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {item.price}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleAddClick}>
              Add to Shopping Cart
            </Button>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default Item;
