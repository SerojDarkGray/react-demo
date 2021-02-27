
import request from '../helpers/request';
import * as actionTypes from './actionsTypes';
export function getTasks() {
    
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request("http://localhost:3001/task")
            .then((tasks) => {
                dispatch({ type: 'GET_TASKS', tasks: tasks })
            })
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request("http://localhost:3001/task", 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionTypes.ADD_TASK, task: task })
            })
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASK, taskId})
            })
    }
}

export function deleteSelectedTasks(taskIds) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request("http://localhost:3001/task", 'PATCH', { tasks : [...taskIds] })
            .then(() => {
                dispatch({ type: actionTypes.DELETE_SELECTED_TASKS, taskIds})
            })
    }
}


export function editTask(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });
        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASK, editedTask : editedTask})
            })
    }
}