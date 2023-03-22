import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateFlow() {
  
const navigate = useNavigate()



  return (
    <Box display='stack' textAlign='center'>
    <Box 
    width = '127px'
    height = '275px'
    backgroundColor = '#2B2C2E'
    border = '1px solid #959292'
    borderRadius = '10px'
    sx={{boxShadow: 5}}
    />
    <Typography textTransform='bold' margin='10px 0'>
      Build
    </Typography>
    </Box>
  )
}
