


import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        selectAllStatus: false,
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null,
    }


    componentDidMount(){

        fetch("http://localhost:3001/task", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {

            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else{
                    throw new Error('Something went wrong!')
                }
            }
            
            this.setState({
                tasks: res,      
            });
            
        })
        .catch((error)=>{
            console.log('catch error', error)

        })

    }


    addTask = (newTask) => {



        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {

            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else{
                    throw new Error('Something went wrong!')
                }
            }
            
            const tasks = [...this.state.tasks, res];

            this.setState({
                tasks: tasks,
                openNewTaskModal: false,
            });
            
        })
        .catch((error)=>{
            console.log('catch error', error)

        })


    }

    deleteTask = (taskId) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {

            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else{
                    throw new Error('Something went wrong!')
                }
            }
            
            const newTasks = this.state.tasks.filter((task) => taskId !== task._id);
            this.setState({
            tasks: newTasks,
            })
            
        })
        .catch((error)=>{
            console.log('catch error', error)

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

        const body = {
            tasks: [...selectedTasks]
        };

        fetch(`http://localhost:3001/task`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {

            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else{
                    throw new Error('Something went wrong!')
                }
            }
            
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
            
        })
        .catch((error)=>{
            console.log('catch error', error)

        })
       
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        });
    }

    selectAll = () => {
        const tasks = [...this.state.tasks];

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

    handleSaveTask = (editedTask) => {


        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            body : JSON.stringify(editedTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async(response) => {

            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else{
                    throw new Error('Something went wrong!')
                }
            }
            
            const tasks = this.state.tasks;
            const foundIndex = tasks.findIndex((task) => task._id === res._id);
            tasks[foundIndex] = res;

            this.setState({
            tasks : tasks,
            editTask: null,
            })
            
        })
        .catch((error)=>{
            console.log('catch error', error)

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
                        onAddTask={this.addTask}
                    />
                }

                {
                    editTask &&
                    <EditTaskModal
                        onClose={() => this.handleEditTask(null)}
                        onSave={this.handleSaveTask}
                        task={editTask}
                    />
                }


            </Container>

        )
    }
}


export default ToDo;