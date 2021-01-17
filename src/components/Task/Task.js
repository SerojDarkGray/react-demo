
import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './task.module.css';
class Task extends Component{


    state = {
        selected: false
        
    }


    handleChange = () =>{
        const {onSelectTask, data} = this.props;
        onSelectTask(data._id);
        this.setState({
            selected: !this.state.selected,
        })
    };



    render(){
        const task = this.props.data;
        const {selected} = this.state;
        const {disabled,onDeleteTask} = this.props;
        return(
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                        <Card.Body>
                            <input onChange={this.handleChange}  type="checkbox" />
                            <Card.Title>Title: {task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card.
                        </Card.Text>
                            <Button 
                            variant="danger" 
                            disabled={disabled} 
                            onClick={() => onDeleteTask(task._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
        )
    }

}


export default Task;