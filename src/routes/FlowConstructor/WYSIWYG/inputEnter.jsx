import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useReduxStore from '../../../Hooks/useReduxStore'

export default function InputEnter() {
    const dispatch = useDispatch()
    const store = useReduxStore()
    const inputStatus = useSelector(store => store.flowInputSetReducer)
    console.log(inputStatus)
    const addInput = e => {
        e.preventDefault()
        dispatch({
            type: 'FLOW_INPUT_SET',
            payload: 1
        });
    }
    const removeInput = e => {
        e.preventDefault()
        dispatch({
            type: 'FLOW_INPUT_SET',
            payload: 0
        });
    }

    return (
        <Box m='50px 0 0 0'>

            <textarea
                style={{
                    width: '270px',
                    height: '120px',
                    padding: '12px 20px',
                    boxSizing: 'border-box',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: 'grey',
                    resize: 'none'
                }}
                placeholder='text goes here'
            />
             <Box textAlign={'center'}>
                <Button variant='contained' onClick={addInput}>Add</Button> 
            </Box>
            
            { inputStatus == 1 &&
            <Box textAlign={'center'} marginTop>
                <Button variant='contained' color="error" onClick={removeInput}>Remove</Button>
            </Box>
            }


        </Box>
    )
}
