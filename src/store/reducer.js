
const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTasksSuccess : false,
    editTasksSuccess : false,
}

export default function reducer(state = defaultState, action) {


    switch (action.type) {
        case 'PENDING': {
            return {
                ...state,
                addTaskSuccess: false,
                deleteTasksSuccess : false,
                editTasksSuccess : false,
            };
        }
        case 'GET_TASKS': {
            return {
                ...state,
                tasks: action.tasks
            };
        }
        case 'ADD_TASK': {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true
            }
        }
        case 'DELETE_TASK': {
                const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
            return {
                ...state,
                tasks: newTasks,
            }
        }
      
        case 'DELETE_SELECTED_TASKS': {
            const newTasks = state.tasks.filter((task) => {
                if (action.taskIds.has(task._id)) {
                    return false;
                }
                else {
                    return true;
                }
            });
            return {
                ...state,
                tasks: newTasks,
                deleteTasksSuccess : true,
            }
        }
        case 'EDIT_TASK': {
                const tasks = [...state.tasks]
                const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
                tasks[foundIndex] = action.editedTask;
            return {
                ...state,
                tasks : tasks,
                editTasksSuccess : true
            }
        }

        default: return state;
    }

}