import * as types from "../types";
import { getGeneralState } from '../utils/tasksMethods';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    generalState: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: null,
                generalState: getGeneralState(action.payload)
            };
        case types.CREATE_SUCCESS:
            let newDataCreate = state.data.concat([action.payload]);
            return {
                ...state,
                isLoading: false,
                data: newDataCreate,
                error: null,
                generalState: getGeneralState(newDataCreate)
            };
        case types.EDIT_SUCCESS:
            let newDataEdit = state.data.map(element => element.id === action.payload.id ? action.payload : element);
            return {
                ...state,
                isLoading: false,
                data: newDataEdit,
                error: null,
                generalState: getGeneralState(newDataEdit)
            };
        case types.DELETE_SUCCESS:
            let newDataDelete = state.data.filter(element => element.id !== action.payload);
            return {
                ...state,
                isLoading: false,
                data: newDataDelete,
                error: null,
                generalState: getGeneralState(newDataDelete)
            };
        case types.FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    };
};

export default reducer;