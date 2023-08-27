import React, { useEffect, useState } from 'react';
import { Box, FormControl, Select, MenuItem, TextField, Button, Stack } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const FormComponent = () => {
  const [xValue, setNumberValue] = useState(0);
  const [yValue, setAdditionalNumberValue] = useState(0);
  const [markerValue, setmarkerValue] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [passwordValue, setPasswordValue] = useState('');
  const [imageOptions, setImageOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');

  const handleXChange = (event) => {
    setNumberValue(event.target.value);
  };

  const handleYvalue = (event) => {
    setAdditionalNumberValue(event.target.value);
  };

  const handleMarkerChange = (event) => {
    setmarkerValue(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
        const response = (await axios.get('https://api.ashville.me/markers')).data;
        // add the prefix http://34.131.81.127:3000/img/ to each image name
        response.forEach((marker, i) => response[i] = `https://api.ashville.me/img/${marker}`);
        setImageOptions(response);
        setSelectedImage(imageOptions[0]);
    }
    fetchData();
    }, []);


  const handleSubmit = async() => {
    const formData = {
      x: Number(xValue),
      z: Number(yValue),
      image: selectedImage,
      imageScale: 0.5,
      imageAnchor: [0.5, 1],
      text: markerValue,
      textColor: color,
      offsetX: 0,
      offsetY: 8,
      font: "bold 12px Verdana",
      password: passwordValue,
    };

    // post the data to the server http://api.ashville.me/add
    try {
      const res = await fetch('https://api.ashville.me/point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.error) {
        throw new Error(data.error);
      }
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(data)
    } catch (err) {
      console.log(err)
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="80vh"
      justifyContent="center" // Change to "center" to align items in the middle
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '16px' }}>
        <TextField
          label="X-coordinate"
          variant="outlined"
          type="number"
          value={xValue}
          onChange={handleXChange}
          fullWidth
          required
          
          // sx={{ marginTop: '5px' }}
        />

        <TextField
          label="Z-coordinate"
          variant="outlined"
          type="number"
          value={yValue}
          onChange={handleYvalue}
          fullWidth
          required
          
          sx={{ marginTop: '16px' }}
        />
        
        <TextField
          label="Marker Text"
          variant="outlined"
          value={markerValue}
          onChange={handleMarkerChange}
          fullWidth
          required
          
          sx={{ marginTop: '16px', marginBottom: '16px' }}
        />
      <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

        <Select
          label="Image"
          value={selectedImage}
          onChange={handleImageChange}
          variant="outlined"
          required
          s
          sx={{ marginBottom: '16px', width: '30%' }}
        >
          {imageOptions.map((image, index) => (
            <MenuItem key={index} value={image}>
              <img src={image} alt={`Marker ${index}`} height="30" style={{ marginLeft: '8px' }} />
            </MenuItem>
          ))}
        </Select>

        {(
          <div style={{ marginBottom: 16, justifyContent: 'space-between' }}>
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
        )}
        
      </Stack>

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          fullWidth
          required
          
          sx={{ marginTop: '16px' }}
        />

        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }} onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>

      <ToastContainer /> {/* Add ToastContainer to display toast messages */}
    </Box>
  );
};

export default FormComponent;
