
import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import styles from './task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import formatDate from "../../helpers/formatDate";
import formatTask from "../../helpers/formatTask";
import {Link} from 'react-router-dom';

class Task extends PureComponent {



    static propTypes = {
        data: PropTypes.object.isRequired,
        onSelectTask: PropTypes.func.isRequired,
        onDeleteTask: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        selected: PropTypes.bool.isRequired,
        onEditTask: PropTypes.func.isRequired,
    }


    handleChange = () => {
        const { onSelectTask, data } = this.props;
        onSelectTask(data._id);
    };



    render() {
        const task = this.props.data;
        const { disabled, onDeleteTask, selected, onEditTask } = this.props;
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <input onChange={this.handleChange} type="checkbox" checked={selected} />
                        <Card.Title><Link to={`/task/${task._id}`}>{formatTask(task.title,20)}</Link></Card.Title>
                    <Card.Text>Description: {formatTask(task.description, 60)}</Card.Text>
                    <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                    <Button
                        variant="danger"
                        disabled={disabled}
                        onClick={() => onDeleteTask(task._id)}
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        variant="warning"
                        disabled={disabled}
                        onClick={() => onEditTask(task)}
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>

                </Card.Body>
            </Card>
        )
    }

}


export default Task;