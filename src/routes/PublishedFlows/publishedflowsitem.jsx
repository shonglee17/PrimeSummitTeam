import { Box, Typography } from '@mui/material'
import React from 'react'

export default function PublishedFlowsItem({id, name, version, published, dateMade}) {
  console.log('this is published from archivesitem', published);
  return (
     <Box 
     justifyContent={'space-between'} 
     display='flex' 
     key={id}
    width = '600px'
    height = '100px'
    backgroundColor = 'white'
    textAlign='center'
    alignContent = 'center'
    margin={'10px 10px 10px 50px'}
    borderRadius={'10px'}
     >
      <Box>
      <Typography margin={'40px 0px 0px 20px'}>{name}</Typography>
      </Box>

      <Box>
      <Typography margin={'40px 0px 0px 20px'}>V{version}</Typography>
      </Box>



      <Box>
      <Typography margin={'40px 20px 0px 20px'}>{published}</Typography>
      </Box>
     </Box>
  )
}
