import React, {version} from 'react';
import ArchivesItem from './archivesitem';
import {liveFlows} from '../../Data';
import {Box, List, Typography} from '@mui/material';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ArchivesList() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/latest-versions',
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box alignItems="stack">
      <List sx={{width: '100%'}}>
        {data &&
          data
            .filter(flow => !flow.is_published)
            .map(flow => (
              <ArchivesItem
                key={flow.id}
                id={flow.id}
                name={flow.title}
                version={flow.versions_number}
                published={flow.is_published}
              />
            ))}
      </List>
    </Box>
  );
}
