import React, { Component } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'
import idGenerator from '../../helpers/idGenerator';

class NewTask extends Component {


    state = {
        title: "",
        description: "",
    }



    // variant-1
    // hundleChange = (value, name) => {
    //     this.setState({
    //         [name]: value,
    //     });
    // }

    hundleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.createTask();
        }
    }

    createTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();


        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description
        };

        this.props.onAddTask(newTask);



    }



    render() {
        const { onClose } = this.props;

        return (
            <>
            <Modal
                show={true}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> Add new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                            <FormControl
                                onKeyPress={this.handleKeyDown}
                                // onChange={(event)=>this.hundleChange(event.target.value, 'title' )}
                                onChange={this.hundleChange}
                                name="title"

                                placeholder="Title"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className="mb-3"
                            />

                            <Form.Control 
                            as="textarea" 
                            placeholder="Description"
                            rows={5} 
                            onChange={this.hundleChange}
                            name="description"
                            // onChange={(event)=>this.hundleChange(event.target.value, 'description')} 
                            />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={this.createTask}>Add</Button>
                <Button onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            
            </>
        )
    }


}


NewTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
}



export default NewTask;