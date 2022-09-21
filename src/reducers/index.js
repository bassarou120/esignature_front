import {CHANGE_MODAL_TYPE, GET_SIGNATAIRE} from "../constants/action-types";

const initialState = {
    is_model_popup: 0,
    signataire:[]
};

function rootReducer(state = initialState, action) {

    if (action.type === CHANGE_MODAL_TYPE) {
        return action.payload.model
    }
    if (action.type === GET_SIGNATAIRE) {
        return action.payload.signataire
    }
    return state;
};


export default rootReducer;
