import { combineReducers } from 'redux';
import flowStepReducer from './flowstep.reducer';
import optionsSelectReducer from './optionselected.reducer';
import wysiwygReducer from './wysiwyg.reducer';
import flowInputSetReducer from './setflowinput.reducer';


const rootReducer = combineReducers({
    flowStepReducer,
    optionsSelectReducer,
    wysiwygReducer,
    flowInputSetReducer
});

export default rootReducer;