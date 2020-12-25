


import React, { Component } from 'react';


class ToDo extends Component{

    state = {
        tasks: [],
        inputValue: "",
        temp: ""
    }

    hundleChange = (event) =>{
        this.setState({
            inputValue : event.target.value,
        }); 
    }


    hundleButton = () =>{
        this.setState({
            temp : this.state.tasks.push(this.state.inputValue),
            inputValue : ""
        }); 
        
    }


    render(){
        let tasks = this.state.tasks;
        let ol = tasks.map((el, i) =>{
            return (
                <ol key={i}>{el}</ol>
            )
        });
        return (
            <div>
            <input 
            value={this.state.inputValue}
            type="text" 
            onChange={this.hundleChange}/>
            <button onClick={this.hundleButton}>Click me</button>
            {ol}
            </div>
        )
    }
}


export default ToDo;