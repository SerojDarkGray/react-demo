import React, { Component, createRef } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "../helpers/utils";
import "../styles.css";
import { connect } from 'react-redux';
import { editTask } from '../store/actions';

class EditTaskModal extends Component {
    constructor(props){
        super(props);
        const {date} = props.task
        this.state = {
            ...props.task,
            date : date ? new Date(date) : new Date()
        }
        this.inputTitleRef = createRef();
    }

    
    componentDidMount(){
        this.inputTitleRef.current.focus();
    }

    handleChangeDate = (dateValue) =>{
        this.setState({
            date: dateValue || new Date()
        });
    };



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

        const editedTask = {
            title,
            description,
            _id: this.state._id,
            date: formatDate(this.state.date.toISOString())
        }
        this.props.editTask(editedTask, this.props.from);


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
                                ref={this.inputTitleRef}
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

                            <DatePicker
                            className="date"
                            selected={this.state.date}
                            minDate={new Date()}
                            onChange={this.handleChangeDate} 
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
    task: PropTypes.object.isRequired,
}
const mapDispatchToProps = {
    editTask,
}


export default connect(null,mapDispatchToProps)(EditTaskModal);