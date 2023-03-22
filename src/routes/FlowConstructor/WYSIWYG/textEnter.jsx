import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

export default function TextEnter() {
    const [body, setBody] = useState("")
    const dispatch = useDispatch()

    const thisIsBody = e => {
        console.log(e);
        setBody(e);
    }


    const handleBody = e => {
        dispatch({
            type: 'FLOW_TEXT_SET',
            payload: body
        });
        console.log(body);
        setBody(e);
    }



    return (
        <Box>
            <Box m='50px 0 0 0'>
                <ReactQuill
                    style={{ height: '300px', width: '300px' }}
                    placeholder='Enter Flow Prompt'
                    onChange={thisIsBody}
                    value={body}
                />
            </Box>
            <Box textAlign={'center'}>
                <Button variant='contained' onClick={handleBody}> Submit</Button>
            </Box>
        </Box>
    )
}