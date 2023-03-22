import React from 'react'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';

import TextFieldsIcon from '@mui/icons-material/TextFields';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
// import AddStep from './addstep';

const drawerWidth = 240;
const options = [
                {
                  Id: 1,
                  Name: 'Text Box',
                  Icon: <TextSnippetOutlinedIcon fontSize ='large'/>
                },
                {
                  Id: 1,
                  Name: 'Text Input',
                  Icon: <AssignmentOutlinedIcon fontSize ='large'/>
                },
                {
                  Id: 1,
                  Name: 'Word Input',
                  Icon: <TextsmsOutlinedIcon fontSize ='large'/>
                }
                ]


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex',
}));






export default function StepBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box >


      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <LayersOutlinedIcon fontSize='large' />
        </IconButton>
      </Toolbar>


      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '100px', // Adjust the 'top' property as needed
          },
        }}
        // variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <Typography>
            Steps
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronRightIcon/> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        {/* <AddStep/> */}
     
      </Drawer>

    </Box>
  )
}