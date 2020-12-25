


import React, { Component } from 'react';


class ToDo extends Component{

    state = {
        tasks: [],
        inputValue: "",
    }

    hundleChange = (event) =>{
        this.setState({
            inputValue : event.target.value,
        }); 
    }


    addTask = () =>{
        const inputValue = this.state.inputValue.trim();
        
        if(!inputValue){
            return;
        }
        const tasks = [...this.state.tasks];
        tasks.push(inputValue)
        this.setState({
            tasks : tasks,
            inputValue : ""
        }); 
        
    }


    render(){
        let {tasks, inputValue} = this.state;
        console.log(tasks);
        let taskComponents = tasks.map((el, i) =>{
            return (
                <li key={i}>{el}</li>
            )
        });
        return (
            <div>
            <input 
            value={inputValue}
            type="text" 
            onChange={this.hundleChange}/>
            <button 
            onClick={this.addTask}>
                Add task
            </button>
            <ol>
                {taskComponents}
            </ol>
            </div>
        )
    }
}


export default ToDo;