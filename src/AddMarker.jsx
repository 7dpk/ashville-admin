// src/AddMarker.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Box,
  Container,
} from '@mui/material';

const AddMarker = () => {
  const [x, setX] = useState('');
  const [z, setZ] = useState('');
  const [markerText, setMarkerText] = useState('');
  const [textColor, setTextColor] = useState('');
  const [selectedMarker, setSelectedMarker] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  // Mock array of image links (replace this with your actual API response)
  const images = [
    'image-link-1',
    'image-link-2',
    // Add more image links as needed
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Form validation and API request to /api/point (replace this with your actual API call)
    if (x === '' || z === '' || markerText === '' || textColor === '' || selectedMarker === '' || password === '') {
      setSnackbarMessage('Please fill in all fields');
      setSnackbarSuccess(false);
      setShowSnackbar(true);
    } else {
      // Mock API call for demonstration purposes (replace this with your actual API call using axios)
      setTimeout(() => {
        setSnackbarMessage('Point added');
        setSnackbarSuccess(true);
        setShowSnackbar(true);
        setX('');
        setZ('');
        setMarkerText('');
        setTextColor('');
        setSelectedMarker('');
        setPassword('');
      }, 2000);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <Container // align center 
        style={{
            
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            }}

    >
      <h1>Add Marker</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          type="number"
          label="X"
          value={x}
          onChange={(e) => setX(e.target.value)}
          inputProps={{ min: -300000, max: 300000 }}
          required
        />
        <br />
        <TextField
          type="number"
          label="Z"
          value={z}
          onChange={(e) => setZ(e.target.value)}
          inputProps={{ min: -300000, max: 300000 }}
          required
        />
        <br />
        <TextField
          label="Marker Text"
          value={markerText}
          onChange={(e) => setMarkerText(e.target.value)}
          inputProps={{ maxLength: 50 }}
          required
        />
        <br />
        {/* Implement the color picker here */}
        <TextField
          label="Text color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          required
        />
        <br />
        <FormControl>
          <InputLabel>Marker</InputLabel>
          <Select value={selectedMarker} onChange={(e) => setSelectedMarker(e.target.value)} required>
            {images.map((image, index) => (
              <MenuItem key={index} value={image}>
                {image}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div
          style={{
            backgroundColor: snackbarSuccess ? '#43a047' : '#d32f2f',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {snackbarMessage}
        </div>
      </Snackbar>
    </Container>
  );
};

export default AddMarker;
