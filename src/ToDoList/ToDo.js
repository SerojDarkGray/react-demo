


import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import styles from './todo.module.css';
import idGenerator from "../helpers/idGenerator.js"
class ToDo extends Component {

    state = {
        tasks: [],
        inputValue: "",
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
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id );
        this.setState({
            tasks: newTasks
        })
            

    }

    render() {
        let { tasks, inputValue } = this.state;
        let taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                <Card className={styles.task}>
                    <Card.Body>
                        <input type="checkbox"/>
                        <Card.Title>Title: {task.title}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card.
                        </Card.Text>
                        <Button variant="danger" onClick={ () => this.deleteTask(task._id) }>Delete</Button>
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
                                value={inputValue}
                                onChange={this.hundleChange}
                                placeholder="Add new task"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="dark" onClick={this.addTask}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
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