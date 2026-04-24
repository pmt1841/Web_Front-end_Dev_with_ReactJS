import {LOGIN_SUCCESS, FETCH_USER_SUCCESS} from "./action";

const initialState = {
    users: [],
    userLogined: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, userLogined: action.payload};
        case FETCH_USER_SUCCESS:
            return {...state, users: action.payload};
        default:
            return state;
    }
};

export default rootReducer;