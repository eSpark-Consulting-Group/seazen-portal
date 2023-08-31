import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './style.css'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
    return (
      <div className="card-container">
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }} className="card">
          <img src="/assets/img/15.png" alt="Card 1" />
        </Card>
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }}className="card">
          <img src="/assets/img/21.png" alt="Card 2" />
        </Card>
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }}className="card">
          <img src="/assets/img/17.png" alt="Card 3" />
        </Card>
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }}className="card">
          <img src="/assets/img/23.png" alt="Card 4" />
        </Card>
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }}className="card">
          <img src="/assets/img/19.png" alt="Card 5" />
        </Card>
        <Card sx={{ width: 157, height: 76, borderRadius: 5 }}className="card">
          <img src="/assets/img/25.png" alt="Card 6" />
        </Card>
      </div>
    );
  }