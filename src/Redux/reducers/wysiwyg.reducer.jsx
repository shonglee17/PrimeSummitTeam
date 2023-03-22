const wysiwygReducer = (state = '', action) => {
    switch(action.type){
        case 'FLOW_TEXT_SET':
            return action.payload
        case 'CLEAR_TEXT_SET':
            return ''
        default :
            return state
    }
}

export default wysiwygReducer