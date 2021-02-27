


import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteSelectedTasks, } from '../../store/actions';


class ToDo extends Component {

    state = {
        selectedTasks: new Set(),
        selectAllStatus: false,
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null,
    }


    componentDidMount() {

        this.props.getTasks();

    }

    componentDidUpdate(prevProps) {

        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            });
            return;
        }

        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false,
                selectAllStatus: false
            });
            return;
        }

        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
                editTask: null
            });
            return;
        }


    }




    selectTask = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }
        this.setState({
            selectedTasks: selectedTasks
        });
    }

    deleteSelected = () => {


        const { selectedTasks } = this.state;

        this.props.deleteSelectedTasks(selectedTasks)

    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        });
    }

    selectAll = () => {
        const tasks = [...this.props.tasks];

        if (!tasks[0]) {
            return;
        }
        let tasksId = tasks.map((task) => {
            return task._id;
        })
        this.setState({
            selectedTasks: new Set(tasksId),
            selectAllStatus: !this.props.selectAllStatus
        });
    }

    deselectAll = () => {
        this.setState({
            selectedTasks: new Set(),
            selectAllStatus: false
        });
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    }

    handleEditTask = (task) => {

        this.setState({
            editTask: task
        });
    }


    render() {
        let { selectedTasks, selectAllStatus, showConfirm, openNewTaskModal, editTask } = this.state;
        const { tasks } = this.props;
        let taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onSelectTask={this.selectTask}
                        onDeleteTask={this.props.deleteTask}
                        disabled={!!selectedTasks.size}
                        selected={selectedTasks.has(task._id)}
                        onEditTask={this.handleEditTask}
                    />

                </Col>
            )
        });
        return (
            <Container >
                <Row className="text-center m-4">

                    <Col>
                        <Button variant="danger" disabled={!selectedTasks.size} onClick={this.toggleConfirm}>Delete Selected</Button>
                    </Col>
                    <Col >
                        {
                            selectAllStatus ? <Button variant="info" onClick={this.deselectAll}>Deselect All</Button> : <Button variant="info" onClick={this.selectAll}>Select All</Button>
                        }
                    </Col>
                    <Col>
                        <Button variant="success" disabled={!!selectedTasks.size} onClick={this.toggleNewTaskModal}>Add Task</Button>
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>

                {
                    showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.deleteSelected}
                        count={selectedTasks.size}
                    />
                }

                {
                    openNewTaskModal &&
                    <NewTask
                        onClose={this.toggleNewTaskModal}
                    />
                }

                {
                    editTask &&
                    <EditTaskModal
                        onClose={() => this.handleEditTask(null)}
                        task={editTask}
                    />
                }


            </Container>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess: state.editTasksSuccess
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTasks: () => {
//             request("http://localhost:3001/task")
//                 .then((tasks) => {
//                     dispatch({ type: 'GET_TASKS', tasks: tasks })
//                 })
//         }
//     }
// }

// redux-thunk 
const mapDispatchToProps = {
    getTasks: getTasks,
    deleteTask,
    deleteSelectedTasks,
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDo);