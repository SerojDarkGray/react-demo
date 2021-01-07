


import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import  '../styles.css';
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
        const inputValue = {
            title: this.state.inputValue.trim()
        };
        

        if (!inputValue) {
            return;
        }
        const tasks = [...this.state.tasks];
        tasks.push(inputValue)
        this.setState({
            tasks: tasks,
            inputValue: ""
        });

    }


    render() {
        let { tasks, inputValue } = this.state;
        let taskComponents = tasks.map((el, i) => {
            return (
                <Col key={i} className="task" xs={12} sm={6} md={4} lg={3}><div>Title: {el.title}</div></Col>
            )
        });
        return (
            // <div>
            // <input 
            // value={inputValue}
            // type="text" 
            // onChange={this.hundleChange}/>
            // <button 
            // onClick={this.addTask}>
            //     Add task
            // </button>
            // <ol>
            //     {taskComponents}
            // </ol>
            // </div>
            <Container >
                <Row className="justify-content-center">
                    <Col xs={12} lg={6} >
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