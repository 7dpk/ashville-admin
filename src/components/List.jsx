import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


function MapMarkerList() {
  const [markers, setMarkers] = useState([]);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    // Fetch markers using a GET request
    fetch('http://api.ashville.me/allpoints')
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.error('Error fetching markers:', error));
  }, []);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Make your delete request here using the selectedItemId and password
    

    try {
        const res = await fetch(`http://api.ashville.me/point/${selectedItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password
        }),
      });
      const data = await res.json()
      if(data.error) {
        toast.error(data.error,{
          position: toast.POSITION.TOP_CENTER,
        })
        throw new Error(data.error);
      } else {
        toast.success('Form submitted successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
        const updatedMarkers = markers.filter((marker) => marker._id !== selectedItemId);
        setMarkers(updatedMarkers);
      }
    } catch (err) {
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setSelectedItemId(null);
    setPassword('');
    setDeletePopupOpen(false);
  };

  return (
    <div>
      <List>
        {markers.map((marker) => (
          <ListItem key={marker._id}>
            <ListItemText primary={marker.text} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(marker._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={deletePopupOpen} onClose={() => setDeletePopupOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default MapMarkerList;
