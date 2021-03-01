import React, { Component } from 'react';
import { Card, Button, Container, Row, Col, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import formatDate from "../../../helpers/formatDate";
import EditTaskModal from '../../EditTaskModal';
import {getTask} from '../../../store/actions';
import {connect} from 'react-redux';


class SingleTask extends Component {
    state = {
        openEditModal: false
    };




    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false
            });
            return;
        }

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




    toggleEditModal = () =>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    }



    render() {

        const { openEditModal } = this.state;
        const { task } = this.props;

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
                    from="singleTask"
                    task={task}
                />
                }

            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess : state.editTaskSuccess,
    }
}

const mapDispatchToProps = {
    getTask,
}


export default connect(mapStateToProps,mapDispatchToProps)(SingleTask);