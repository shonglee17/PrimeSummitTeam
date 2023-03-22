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


const drawerWidth = 240;
const options = [
                  {
                    Id: 1,
                    Name: 'Add Step',
                    Icon: <TextSnippetOutlinedIcon fontSize ='large'/>
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




export default function AddStep() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const reducerTest = useSelector((store) => store.flowStepReducer)
  const words = useSelector(store => store.wysiwygReducer)
  console.log(`This is from addStep:`, words);
  // This is where we build the object to send to the reducer.
  const [steps, setsteps] = useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const returnToFlow = (id) => {
    // take the id, subtract it by one, and then you get the index
    let indexSearch = id - 1
    // Then you use it to call on the index that the right instructions are at. 
    dispatch({
      type: 'FLOW_TEXT_SET',
      payload: steps[indexSearch].steps.instructions
    });

  }

  
  const addNewStep = (event) => {
    
    event.preventDefault();
  
    setsteps(steps => {
      let newStepId = steps.length + 1;
      let flowStepCounter = steps.length + 1;
      const newStep = {
        id: newStepId++ , 
        title: `Flow Step ${flowStepCounter++}`,
        steps:{
          title: 'This is It', 
          instructions: words, 
          content: 'input 1', 
          input_type: 2 
        }
      };
      const newSteps = [...steps, newStep];
  
      dispatch({
        type: 'ADD_FLOW_REDUCER',
        payload: newSteps
      });
  
      return newSteps;
      
    });

  };

  return (
    <Box >

<Toolbar>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <LayersOutlinedIcon fontSize="large" />
        </IconButton>
      </Toolbar>

    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '100px'
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography>
          Step Builder
        </Typography>
      </DrawerHeader>

      <Divider />

      <List>
          {steps.map((step) => (
            <ListItem key={step.id} disablePadding>
              <ListItemButton onClick={() => returnToFlow(step.id)} >
                <ListItemText primary={step.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      <Divider />

        <List>
          {options.map((key) => (
            <ListItem key={key.Id} disablePadding>
              <ListItemButton onClick={addNewStep}>
                <ListItemIcon>
                  {key.Icon}
                </ListItemIcon>
                <ListItemText primary={key.Name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

  </Box>
  )
}

