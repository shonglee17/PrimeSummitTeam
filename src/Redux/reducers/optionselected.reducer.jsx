const optionsSelectReducer = (state = 0, action) => {
    if (action.type == 'SET_OPTIONS_REDUCER'){
        if(action.payload == 1){
            return 1
        }
        if(action.payload == 2){
            return 2
        }
        if(action.payload == 3){
            return 3
        }
    } else {
        return state
    }
}

export default optionsSelectReducer