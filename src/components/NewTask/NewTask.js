import React, {Component} from 'react';
import {InputGroup,FormControl, Button} from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class NewTask extends Component{


    state={
        title: "",
        description: "",
    }

   
    hundleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    }

    handleKeyDown = (event) =>{
        if(event.key === "Enter"){
            this.createTask();
        }
    }

    createTask = () =>{
        const title = this.state.title.trim();
        // const description = this.state.title.trim();


        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: title,
            // description: description
        };

        this.props.onAddTask(newTask);

        this.setState({
            title: "",
            // description: ""
        });

    }



    render(){
        const {disabled} = this.props;
        const {title} = this.state;
        // const {description} = this.state
        
        return(
            <InputGroup className="mb-3 mt-4">
                            <FormControl
                                disabled={disabled}
                                onKeyDown={this.handleKeyDown}
                                value={title}
                                onChange={this.hundleChange}
                                placeholder="Add new task"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="dark" disabled={disabled} onClick={this.createTask}>Add</Button>
                            </InputGroup.Append>
            </InputGroup>
        )
    }


}


export default NewTask;