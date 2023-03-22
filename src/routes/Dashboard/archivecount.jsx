import { Box, TextField, Typography } from '@mui/material'
import { borderRadius } from '@mui/system'

import { useNavigate } from 'react-router-dom'
import { liveFlows } from '../../Data'
import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function ArchiveCount() {


  const [data, setData] = useState();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const archiveCount = () => {
    let x = 0;
  
    if (data) {
      data.map((flow) => {
        if (flow.is_published !== true) {
          x += 1;
        }
      });
    }
  
    return x;
  };


    return (
          <Box width ="100%" m='0 10px'>
      <Box display='flex' >
        <Box m='0 -20px 20px 0%'>
          <Typography
          variant='h10'
          fontWeight='medium'
          color='Black'
          >
            Archive Flows
          </Typography>
        </Box>
        </Box>
        <Box m='0 20px 20px 50%'>
        <Box>
          <Typography
          variant='h4'
          fontWeight='bold'
          color='Black'
          >
            {archiveCount()}
          </Typography>
        </Box>
      </Box>
    </Box>
    )
}
