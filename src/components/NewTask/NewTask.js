import React, { PureComponent, createRef } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import "../../styles.css"
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../../helpers/formatDate";
import { connect } from 'react-redux';
import {addTask} from '../../store/actions';
// import idGenerator from '../../helpers/idGenerator';

class NewTask extends PureComponent {
    constructor(props){
        super(props)
        this.inputTitleRef = createRef();
    }


    state = {
        title: "",
        description: "",
        date : new Date()
    }


    componentDidMount(){
        this.inputTitleRef.current.focus();
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
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.createTask();
        }
    };

    handleChangeDate = (dateValue) =>{
        this.setState({
            date: dateValue || new Date()
        });
    };


    createTask = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();


        if (!title) {
            return;
        }

        const newTask = {
            title: title,
            description: description,
            date: formatDate(this.state.date.toISOString())
        };

        this.props.addTask(newTask);

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
                                ref={this.inputTitleRef}
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

                            <DatePicker
                            className="date"
                            selected={this.state.date}
                            minDate={new Date()}
                            onChange={this.handleChangeDate} 
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
}


const mapDispatchToProps = {
    addTask
}

export default connect(null, mapDispatchToProps)(NewTask);