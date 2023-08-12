// src/ViewMarkers.js
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const ViewMarkers = () => {
  // State variable to store the list of markers (you can fetch this from the /markers endpoint)
  const [markers, setMarkers] = useState([
    {
      id: '1',
      x: 100,
      z: 200,
      markerText: 'Marker 1',
    },
    {
      id: '2',
      x: -50,
      z: 300,
      markerText: 'Marker 2',
    },
    // Add more markers as needed
  ]);

  const [password, setPassword] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleDeleteMarker = (id) => {
    // Show a password prompt (you can use a modal or dialog)
    const inputPassword = prompt('Enter your password:');
    if (inputPassword !== null && inputPassword === password) {
      // Implement the delete API request to /api/point/:id
      // Example API call
      // deleteMarker(id);

      // Remove the marker from the list
      setMarkers(markers.filter((marker) => marker.id !== id));

      // Show success toast
      alert('Point deleted');
    } else {
      // Show error toast
      alert('Error message');
    }
  };

  const handleUpdateMarker = (id) => {
    // Find the selected marker from the list
    const selectedMarker = markers.find((marker) => marker.id === id);
    if (selectedMarker) {
      // Set the selected marker in the state to pre-fill the form on the "Add Marker" page
      setSelectedMarker(selectedMarker);

      // Redirect to the "Add Marker" page
      // You can use react-router's history.push() method
      // history.push('/add-marker');
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Minecraft' }}>
      <h1>View Markers</h1>
      {markers.map((marker) => (
        <div key={marker.id} style={{ marginBottom: '10px' }}>
          <strong>X:</strong> {marker.x}, <strong>Z:</strong> {marker.z}, <strong>Text:</strong>{' '}
          {marker.markerText}
          <Button onClick={() => handleDeleteMarker(marker.id)}>Delete</Button>
          <Button onClick={() => handleUpdateMarker(marker.id)}>Update</Button>
        </div>
      ))}
      <br />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default ViewMarkers;
