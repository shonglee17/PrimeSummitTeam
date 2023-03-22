import React, { useEffect } from 'react';
import { useAuth } from '../../auth';
import ArchiveCount from './archivecount';
import CreateFlow from './createflow';
import LiveList from './livelist';
import PublishCount from './publishcount';
import TotalCount from './totalcount.jsx';
import { Box, Tooltip, Typography } from '@mui/material';
import { liveFlows } from '../../Data';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleClickArchive = (e) => {
  e.preventDefault
  navigate('/View')
  }

  const handleClickBuild = (e) => {
  e.preventDefault
  navigate('/Constructor')
  }

  const handleClickLive = (e) => {
    e.preventDefault
    navigate('/Published')
    }

  function handleSignOut() {
    auth.signout(() => { });
  }

  return (
  
    
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <h1> Welcome Henri</h1>
      </Box>

      <Box
        display='grid'
        gridTemplateColumns='repeat(45, 1fr)'
        gridTemplateRows='repeat(30, auto)'
        gridAutoRows='140px'
        gap='20px'
      >
        <Box
          onClick={handleClickBuild}
          gridColumn='span 33'
          gridRow='span 20'
          backgroundColor='#ffffff'
          display='flex'
          height='flex'
          p='0 30px'
          mt='25'
          alignItems='center'
          justifyContent='center'
          borderRadius='20px'
          sx={{
            boxShadow: 1
          }}
          alignContent= 'center'
        >
          <CreateFlow/>
        </Box>

        <Box
          gridColumn='span 12'
          gridRow='span 30'

          display='flex'
          height='flex'
          p='0 30px'
          mt='25'
          
          justifyContent='left'
          borderRadius='20px'
        >
          <LiveList/>
        </Box>


        <Box
          gridColumn='span 11'
          gridRow='span 10'
          backgroundColor='#ffffff'
          display='flex'
          height='flex'
          p='0 30px'
          mt='25'
          alignItems='center'
          justifyContent='center'
          borderRadius='20px'
          sx={{
            boxShadow: 1
          }}
        >
          <TotalCount />
        </Box>

        <Box
        onClick={handleClickLive}
          gridColumn='span 11'
          gridRow='span 10'
          backgroundColor='#6B85FB'
          display='flex'
          height='flex'
          p='0 30px'
          mt='25'
          alignItems='center'
          justifyContent='center'
          borderRadius='20px'
          sx={{
            boxShadow: 1
          }}
        >

          <PublishCount />
        </Box>

        <Tooltip title="Archive" followCursor>
        <Box
         onClick={handleClickArchive}
          gridColumn='span 11'
          gridRow='span 10'
          backgroundColor='#ffffff'
          display='flex'
          height='flex'
          p='0 30px'
          mt='25'
          alignItems='center'
          justifyContent='center'
          borderRadius='20px'
          sx={{
            boxShadow: 1,
          }}
        >
          <ArchiveCount />
        </Box>
        </Tooltip>

      </Box>
    </Box>
    

  );
}

{/* <div>
        <h1 style={{'width': '200px'}}>
          This is the secure Dashboard Page. The user `{auth.user.username}` is
          logged in. The JWT is: `{auth.user.token}`
        </h1>
      </div>
      <button onClick={handleSignOut}>Sign Out</button> */}