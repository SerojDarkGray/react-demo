import React, { Component } from 'react';
import { Card, Button, Container, Row, Col, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import formatDate from "../../../helpers/formatDate";
import EditTaskModal from '../../EditTaskModal';


export default class SingleTask extends Component {
    state = {
        task: null,
        openEditModal: false
    };




    componentDidMount() {
        const taskId = this.props.match.params.taskId

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {

                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!')
                    }
                }


                this.setState({
                    task: res
                })

            })
            .catch((error) => {
                console.log('catch error', error)

            })
    }

    deleteTask = () =>{
        const taskId = this.state.task._id;

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
            
            this.props.history.push('/');
            
        })
        .catch((error)=>{
            console.log('catch error', error)
        })

    }


    handleSaveTask = (editedTask) =>{
        console.log('editedTask', editedTask)
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


            this.setState({
                task : res,
                openEditModal: false,
            });

            
        })
        .catch((error)=>{
            console.log('catch error', error)
        })

    }


    toggleEditModal = () =>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    }



    render() {

        const { task, openEditModal } = this.state

        return (
            <div>
                <Container>

                    <Row >

                        <Col xs={12}>

                            {
                                task ?
                                    <Card className='text-center mt-5'>
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <Card.Text>Description: {task.description}</Card.Text>
                                            <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                                            <Button
                                                variant="danger"
                                                onClick={this.deleteTask}
                                                className="m-1"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                            <Button
                                                variant="warning"
                                                onClick={this.toggleEditModal}
                                                className="m-1"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                :
                                <p>Task data not exists!</p>
                            }

                        </Col>

                    </Row>

                </Container>
                
                {
                    openEditModal && 
                    <EditTaskModal
                    onClose={this.toggleEditModal}
                    onSave={this.handleSaveTask}
                    task={task}
                />
                }

            </div>
        )
    }




}