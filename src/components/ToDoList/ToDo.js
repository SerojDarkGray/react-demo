


import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from './todo.module.css';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal'

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        selectAllStatus: false,
        showConfirm : false,
        openNewTaskModal : false,
        editTask : null,
    }



    addTask = (newTask) => {

        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
            openNewTaskModal : false,
        });


    }

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id);
        this.setState({
            tasks: newTasks
        })
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
        const { selectedTasks, tasks } = this.state;
        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            else {
                return true;
            }
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            showConfirm: false,
            selectAllStatus: false

        });
    }

    toggleConfirm = () =>{
        this.setState({
            showConfirm : !this.state.showConfirm,
        });
    }

    selectAll = () => {
        const tasks = [...this.state.tasks];
        
        if(!tasks[0]){
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

    toggleNewTaskModal = () =>{
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    }

    handleEditTask = (task) =>{
        this.setState({
            editTask : task
        });
    }

    handleSaveTask = (editedTask) =>{
        const tasks = this.state.tasks;
        const foundIndex = tasks.findIndex((task)=> task._id === editedTask._id);
        tasks[foundIndex] = editedTask;

        this.setState({
            tasks,
            editTask: null,
        })

    }

    render() {
        let { tasks, selectedTasks, selectAllStatus, showConfirm, openNewTaskModal, editTask } = this.state;
        let taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onSelectTask={this.selectTask}
                        onDeleteTask={this.deleteTask}
                        disabled={!!selectedTasks.size}
                        selected= {selectedTasks.has(task._id)}
                        onEditTask= {this.handleEditTask}
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
                onClose = {this.toggleConfirm} 
                onConfirm = {this.deleteSelected} 
                count={selectedTasks.size}
                />
                }

                {
                openNewTaskModal &&
                <NewTask   
                onClose={this.toggleNewTaskModal}    
                onAddTask={this.addTask}  
                />
                }
                
                {
                editTask && 
                <EditTaskModal 
                onClose={()=>this.handleEditTask(null)}
                onSave = {this.handleSaveTask}
                task={editTask}


                />    
                }


            </Container>
            
        )
    }
}


export default ToDo;