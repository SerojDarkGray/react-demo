


import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from './todo.module.css';
import Task from '../components/Task/Task';
import NewTask from '../components/NewTask/NewTask.js';
import Confirm from '../components/Confirm';

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        selectAllStatus: false,
        showConfirm : false
    }



    addTask = (newTask) => {

        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
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
        })
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
            showConfirm: false
        });
    }

    toggleConfirm = () =>{
        this.setState({
            showConfirm : !this.state.showConfirm
        });
    }

    selectAll = () => {
        const tasks = [...this.state.tasks];
        
        if(!tasks[0]){
            return;
        }
        let tasksId = tasks.map((el) => {
            return el._id;
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

    render() {
        let { tasks, selectedTasks, selectAllStatus, showConfirm } = this.state;
        let taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onSelectTask={this.selectTask}
                        onDeleteTask={this.deleteTask}
                        disabled={!!selectedTasks.size}
                    />

                </Col>
            )
        });
        return (
            <Container >
                <Row className="justify-content-center">
                    <Col xs={12} lg={10} >
                        <NewTask
                            disabled={!!selectedTasks.size}
                            onAddTask={this.addTask}
                        />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Button variant="danger" disabled={!selectedTasks.size} onClick={this.toggleConfirm}>Delete Selected</Button>
                    </Col>
                    <Col >
                        {
                            selectAllStatus ? <Button variant="info" onClick={this.deselectAll}>Deselect All</Button> : <Button variant="info" onClick={this.selectAll}>Select All</Button>
                        }
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>
                {showConfirm && <Confirm onClose = {this.toggleConfirm} onConfirm = {this.deleteSelected} count={selectedTasks.size}/>}
            </Container>
            
        )
    }
}


export default ToDo;