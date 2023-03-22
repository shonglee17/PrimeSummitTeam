import {Box, Typography, useTheme} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {liveFlows} from '../../Data';
import axios from 'axios';

export default function TotalCount() {
  const [data, setData] = useState();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const liveCount = () => {
    let totalFlows = 0;

    if (data) {
      data.forEach(() => {
        totalFlows++;
      });
    }

    return totalFlows;
  };

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex">
        <Box m="0 -20px 20px 0%">
          <Typography variant="h10" fontWeight="medium" color="Black">
            Total Flows
          </Typography>
        </Box>
      </Box>
      <Box m="0 20px 20px 50%">
        <Box>
          <Typography variant="h4" fontWeight="bold" color="Black">
            {liveCount()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
