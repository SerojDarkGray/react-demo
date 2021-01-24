import React, { Component } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'
// import idGenerator from '../../helpers/idGenerator';

class EditTaskModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.task
        }
    }




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

        this.props.onSave({
            title,
            description,
            _id: this.state._id,
        });




    }



    render() {
        const { onClose,  } = this.props;
        const {title, description} = this.state;
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
                    <Modal.Title id="contained-modal-title-vcenter"> Edit Task </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                            <FormControl
                                onKeyPress={this.handleKeyDown}
                                onChange={this.hundleChange}
                                name="title"
                                value={title}
                                placeholder="Title"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className="mb-3"
                            />

                            <Form.Control 
                            as="textarea" 
                            value={description}
                            placeholder="Description"
                            rows={5} 
                            onChange={this.hundleChange}
                            name="description"
                            />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={this.createTask}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            
            </>
        )
    }


}


EditTaskModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
}



export default EditTaskModal;