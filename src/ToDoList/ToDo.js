


import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import styles from './todo.module.css';
import idGenerator from "../helpers/idGenerator.js"
class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        inputValue: "",
        selectAllStatus: true
    }

    hundleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    }


    addTask = () => {
        const inputValue = this.state.inputValue.trim()



        if (!inputValue) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: inputValue
        };

        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
            inputValue: ""
        });
    }

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id);
        this.setState({
            tasks: newTasks
        })
    }

    handleKeyDown = (event) =>{
        if(event.key === "Enter"){
            this.addTask();
        }
    }



    toggleTask = (taskId) =>{
        const selectedTasks = new Set(this.state.selectedTasks);
        if(selectedTasks.has(taskId)){
            selectedTasks.delete(taskId);
        }
        else{
            selectedTasks.add(taskId);
        }
        this.setState({
            selectedTasks : selectedTasks
        })
    }

    deleteSelected = ()=>{
        const {selectedTasks, tasks} = this.state;
        const newTasks = tasks.filter((task)=>{
            if(selectedTasks.has(task._id)){
                return false;
            }
            else{
                return true;
            }
        });

        this.setState({
            tasks : newTasks,
            selectedTasks : new Set()
        });
    }

    selectAll = (event) =>{
        console.log('event', event)
        const tasks = [...this.state.tasks];
        let tasksId = tasks.map((el)=>{
            return el._id;
        })
        this.setState({
            selectedTasks: new Set(tasksId),
            selectAllStatus: false
        });
    }

    deselectAll =()=>{
        this.setState({
            selectedTasks: new Set(),
            selectAllStatus: true
        });
    }

    render() {
        let { tasks, inputValue, selectedTasks, selectAllStatus } = this.state;
        let taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Card className={styles.task}>
                        <Card.Body>
                            <input onChange={() => this.toggleTask(task._id)}  type="checkbox" />
                            <Card.Title>Title: {task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card.
                        </Card.Text>
                            <Button variant="danger" disabled={!!selectedTasks.size} onClick={() => this.deleteTask(task._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });
        return (
            <Container >
                <Row className="justify-content-center">
                    <Col xs={12} lg={10} >
                        <InputGroup className="mb-3 mt-4">
                            <FormControl
                                disabled={!!selectedTasks.size}
                                onKeyDown={this.handleKeyDown}
                                value={inputValue}
                                onChange={this.hundleChange}
                                placeholder="Add new task"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="dark" disabled={!!selectedTasks.size} onClick={this.addTask}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Button variant="danger" disabled={!selectedTasks.size} onClick={this.deleteSelected}>Delete Selected</Button>
                    </Col>
                    <Col >
                        {
                           selectAllStatus ? <Button variant="info" onClick={this.selectAll}>Select All</Button> : <Button variant="info" onClick={this.deselectAll}>Deselect All</Button> 
                        }
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>
            </Container>

        )
    }
}


export default ToDo;