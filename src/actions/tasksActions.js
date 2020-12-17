import * as types from "../types";
import api from '../utils/axiosConfig';

export const fetchStarted = () => ({
    type: types.FETCH_STARTED
});

export const fetchFailure = error => ({
    type: types.FETCH_FAILURE,
    payload: error
});

export const getSuccess = data => ({
    type: types.GET_SUCCESS,
    payload: data
});

export const createSuccess = data => ({
    type: types.CREATE_SUCCESS,
    payload: data
});

export const editSuccess = data => ({
    type: types.EDIT_SUCCESS,
    payload: data
});

export const deleteSuccess = id => ({
    type: types.DELETE_SUCCESS,
    payload: id
});

export const getTasks = () => async dispatch => {
    dispatch(fetchStarted());

    api.get(`/tasks`)
        .then(response => dispatch(getSuccess(response.data)))
        .catch(error => dispatch(fetchFailure(error)));

};

export const createTask = data => async dispatch => {
    dispatch(fetchStarted());

    api.post(`/tasks`, {
        "id": data.id,
        "description": data.description,
        "state": data.state
    })
        .then(response => dispatch(createSuccess(response.data)))
        .catch(error => dispatch(fetchFailure(error)));
};

export const editTask = data => async dispatch => {
    dispatch(fetchStarted());

    api.put(`/tasks/${data.id}`, {
        "id": data.id,
        "description": data.description,
        "state": data.state
    })
        .then(response => dispatch(editSuccess(response.data)))
        .catch(error => dispatch(fetchFailure(error)));
};

export const deleteTask = id => async dispatch => {
    dispatch(fetchStarted());

    api.delete(`/tasks/${id}`)
        .then(dispatch(deleteSuccess(id)))
        .catch(error => dispatch(fetchFailure(error)));
};