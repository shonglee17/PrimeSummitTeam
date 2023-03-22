const flowInputSetReducer = (state = null, action) => {
    if (action.type == 'FLOW_INPUT_SET'){
        if(action.payload == 1){
            return 1
        }
        if(action.payload == 0){
            return 0
        }
    } else {
        return state
    }
}

export default flowInputSetReducer