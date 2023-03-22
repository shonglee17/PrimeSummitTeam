import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './nav.css';
import HomeIcon from '@mui/icons-material/Home';
// MUI imports below
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useLocation} from 'react-router-dom'
//menu drop down
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from 'react-redux';

// This is for the sliding effect. 
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Nav({showButtons = false}) {
 const [anchorEl, setAnchorEl] = useState(null);
 const handleClick = event => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };
 //this is to make the save & publish button render
 //base off use is logged in or not.
 //we will need to hook this up to the login component.
 const isLoggedIn = true;
 const location = useLocation();

 //  <----------- What follows is for the Publish dialogue box ----------->
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('')
//  <----------- Reducer For the Steps ----------->
 const stepsToPublish = useSelector((store) => store.flowStepReducer);
//  const stepsIsolated = stepsToPublish?.map(item => item);
 console.log(stepsToPublish);
//  
 
 console.log(titleInput);
 const openPublishDialog = () => {
  // Opens the Dialog to begin the Publish Process
  setOpen(true)
 }

 const handleFlowPublish = () => {
  const title = titleInput
  console.log(title);
  axios.post('http://localhost:3000/addNewFlow',
    {
      title,
      steps: stepsToPublish
    }).then(response => {
      // send a dispatch that clears the reducer.
    }).catch(error => {
      console.log('Error in POST client', error)
    })
  setOpen(false);
 };

 const handleDialogClose = () => {
   console.log(open);
   setOpen(false);
 };


 return (
  <div className="nav">
   <Link to="/">
    <img
     className="nav-logo"
     src="../public/images/footer-logo.png"
     alt="Logo"
     style={{width: '100px', height: '50px'}}
    />
   </Link>
   {/* ////////////////Save&PublishButton%%%%%TOP%%%%%%%%%%%////////////// */}
         {/* ////conditionalRenderButtons///// */}
   <Box sx={{flexGrow: 15, marginLeft: '-200px', marginRight: '25px', width: '100%'}}>
    <div
     style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '10px',
      // marginLeft: '1000px',
     }}>
     {isLoggedIn && location.pathname === '/Constructor' ? (
   <>
    {/* <button
     className="nav-save-button"
     onMouseOver={e =>
      (e.currentTarget.style.backgroundColor = '#3530E9')
     }
     onMouseOut={e =>
      (e.currentTarget.style.backgroundColor = '#151D92')
     }
     style={{
      padding: '10px 20px',
      borderRadius: '20px',
      background: '#151D92',
      color: '#fff',
      border: 'none',
     }}
    >
     Save
    </button> */}
    <button
     className="nav-publish-button"
     onMouseOver={e =>
      (e.currentTarget.style.backgroundColor = '#3530E9')
     }
     onMouseOut={e =>
      (e.currentTarget.style.backgroundColor = '#151D92')
     }
     style={{
      padding: '10px 20px',
      borderRadius: '20px',
      background: '#151D92',
      color: '#fff',
      border: 'none',
     }}
     onClick={openPublishDialog}
    >
     Publish
    </button>
   </>
  ) : null}
       <Dialog open={open} onClose={handleDialogClose} 
        TransitionComponent={Transition}  
        keepMounted 
        aria-describedby="alert-dialog-slide-description" >
            
        <DialogTitle>Submit Flow?</DialogTitle>
        <DialogContent>
          <DialogContentText  id="alert-dialog-slide-description">
            Title Flow before Submission
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Flow Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setTitleInput(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFlowPublish}>Publish</Button>
        </DialogActions>
      </Dialog>
 </div>
   </Box>
   {/* ////////////////Save&PublishButton%%BOTTOM%%////////////// */}
{/* //Menu DropDownButton/ */}
   <Box sx={{flexGrow: 1}}></Box>
   <IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{mr: 2}}
    onClick={handleClick}>
    <MenuIcon />
   </IconButton>
   <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
    className="dropdown-menu">
    <MenuItem onClick={handleClose}>
     <HomeIcon sx={{mr: 1}} />
     <Link
      to="/"
      className="navLink"
      style={{color: 'black', width: 80, maxWidth: '100%'}}>
      Home
     </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
     <AnnouncementIcon sx={{mr: 1}} />
     <Link
      to="https://enlifted.me/contact/"
      className="navLink"
      style={{color: 'black', width: 80, maxWidth: '100%'}}>
      Contact Us
     </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
     <HelpOutlineIcon sx={{mr: 1}} />
     <Link
      to="about"
      className="navLink"
      style={{color: 'black', width: 80, maxWidth: '100%'}}>
      About Us
     </Link>
    </MenuItem>
   </Menu>
  </div>
 );
}






