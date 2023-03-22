import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useReduxStore from '../../Hooks/useReduxStore'
import AddStep from './Stepbar/addstep'
import StepBar from './Stepbar/stepBar'
import InputControl from './Toolbar/inputcontrol'
import ToolBar from './Toolbar/toolBar'
import InputEnter from './WYSIWYG/inputEnter'
import TextEnter from './WYSIWYG/textEnter'
import View from './WYSIWYG/view'


export default function FlowConstructor() {
  const store = useReduxStore();
  const option = useSelector(store => store.optionsSelectReducer)
  console.log(option)

  const [body, setBody] = useState("")
  const handleBody = e => {
    console.log(e);
    setBody(e);
  }


  return (
    <>
   

    <Box display='flex' justifyContent='space-between' >
      <ToolBar />
      { option == 1 &&
      <TextEnter
        body={body}
        setBody={setBody}
      />
      }

      { option == 2 &&
      <InputEnter
        body={body}
        setBody={setBody}
      />
      }

      <View
        body={body}
        setBody={setBody}
      />

      <AddStep />
    </Box>
    </>
  )
}
