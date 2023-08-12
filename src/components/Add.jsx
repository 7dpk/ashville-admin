import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Stack } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const extractMarkerName = (imageUrl) => {
  const parts = imageUrl.split('/');
  const fileName = parts[parts.length - 1];
  const markerName = fileName.split('.')[0];
  return markerName;
};

const FormComponent = () => {
  const [xValue, setNumberValue] = useState(0);
  const [yValue, setAdditionalNumberValue] = useState(0);
  const [markerValue, setmarkerValue] = useState('');
  const [imageScale, setImageScale] = useState(1);
  const [colorPickerVisible, setColorPickerVisible] = useState(true);
  const [color, setColor] = useState('#000000');
  const [passwordValue, setPasswordValue] = useState('');
  const [imageOptions, setImageOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [font, setFont] = useState('15px Calibri,sans serif');
  const [anchorX, setAnchorX] = useState(0);
  const [anchorY, setAnchorY] = useState(0);

  const handleXChange = (event) => {
    setNumberValue(event.target.value);
    setAnchorX(event.target.value);
  };

  const handleYvalue = (event) => {
    setAdditionalNumberValue(event.target.value);
    setAnchorY(event.target.value);
  };

  const handleMarkerChange = (event) => {
    setmarkerValue(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const handleColorButtonClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
        const response = (await axios.get('http://localhost:3000/markers')).data;
        // add the prefix http://34.131.81.127:3000/img/ to each image name
        response.forEach((marker, i) => response[i] = `http://localhost:3000/img/${marker}`);
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
      imageScale: Number(imageScale),
      imageAnchor: [Number(anchorX), Number(anchorY)],
      text: markerValue,
      textColor: color,
      offsetX: Number(offsetX),
      offsetY: Number(offsetY),
      font,
      password: passwordValue,
    };

    // post the data to the server http://localhost:3000/add
    try {
      const res = await fetch('http://localhost:3000/point', {
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
      height="120vh"
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
          
          sx={{ marginTop: '16px' }}
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
        <Stack spacing={2} direction="row" sx={{marginTop: 4}}>

          <TextField
            label="Image Anchor X"
            variant="outlined"
            type="number"
            value={anchorX}
            onChange={(event) => {setAnchorX(event.target.value)}}
            fullWidth
            sx={{ marginTop: '16px' }}
            />
            <TextField
            label="Image Anchor Y"
            variant="outlined"
            type="number"
            value={anchorY}
            onChange={(event) => {setAnchorY(event.target.value)}}
            fullWidth
            sx={{ marginTop: '16px' }}
            />
          </Stack>
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

        {colorPickerVisible && (
          <div style={{ marginBottom: 16, justifyContent: 'space-between' }}>
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
        )}
        <TextField
            label="ImageScale"
            variant="outlined"
            type="number"
            value={imageScale}
            onChange={(event) => {setImageScale(event.target.value)}}
            sx={{ marginTop: '16px'}}
          />
      </Stack>
      <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
        <TextField
            label="offsetX"
            variant="outlined"
            type="number"
            value={offsetX}
            onChange={(event) => {setOffsetX(event.target.value)}}
            sx={{ marginTop: '16px'}}
          />
          <TextField
            label="offsetY"
            variant="outlined"
            type="number"
            value={offsetY}
            onChange={(event) => {setOffsetY(event.target.value)}}
            sx={{ marginTop: '16px'}}
          />
      </Stack>
      <TextField
          label="Font CSS"
          variant="outlined"
          value={font}
          onChange={(event) => {setFont(event.target.value)}}
          fullWidth
          required
          
          sx={{ marginTop: '16px' }}
        />

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
