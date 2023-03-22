const flowStepReducer = (state = [ ], action) => {
    switch(action.type){
        case 'GET_FLOW_EMPTY':
            console.log('flow empty')
            return[state]
        case 'ADD_FLOW_REDUCER':
            console.log('flow full')
            return [action.payload];
        default :
            return state
    }
}

export default flowStepReducer