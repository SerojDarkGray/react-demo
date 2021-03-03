
import request from '../helpers/request';
import * as actionTypes from './actionsTypes';
import {history} from '../helpers/history';


const apiHost = process.env.REACT_APP_API_HOST;


export function getTasks(params={}) {

    const query = Object.entries(params).map(([key,value])=> `${key}=${value}`).join('&');


    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}

export function getTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                dispatch({ type: actionTypes.GET_TASK, task })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionTypes.ADD_TASK, task: task })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}

export function deleteTask(taskId,from) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASK, taskId, from });
                if(from === 'singleTask'){
                    history.push('/')
                }
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}

export function deleteSelectedTasks(taskIds) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task`, 'PATCH', { tasks: [...taskIds] })
            .then(() => {
                dispatch({ type: actionTypes.DELETE_SELECTED_TASKS, taskIds })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}


export function editTask(data, from) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASK, editedTask , from})
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message });
            })
    }
}