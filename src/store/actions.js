
import request from '../helpers/request';

export function getTasks() {
    
    return (dispatch) => {
        dispatch({ type: 'PENDING' });
        request("http://localhost:3001/task")
            .then((tasks) => {
                dispatch({ type: 'GET_TASKS', tasks: tasks })
            })
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: 'PENDING' });
        request("http://localhost:3001/task", 'POST', newTask)
            .then((task) => {
                dispatch({ type: 'ADD_TASK', task: task })
            })
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({ type: 'PENDING' });
        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: 'DELETE_TASK', taskId})
            })
    }
}

export function deleteSelectedTasks(taskIds) {
    return (dispatch) => {
        dispatch({ type: 'PENDING' });
        request("http://localhost:3001/task", 'PATCH', { tasks : [...taskIds] })
            .then(() => {
                dispatch({ type: 'DELETE_SELECTED_TASKS', taskIds})
            })
    }
}


export function editTask(data) {
    return (dispatch) => {
        dispatch({ type: 'PENDING' });
        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: 'EDIT_TASK', editedTask : editedTask})
            })
    }
}