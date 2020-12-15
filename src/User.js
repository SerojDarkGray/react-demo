


import Status from './Status.js'


function User(props){
    return (
        <div>
            <h4>Haracter name {props.name}, status <Status status={props.status}/>, age {props.age}!</h4>
            <a href = {props.href}>More about haracter</a>
        </div>
        
    );
}

export default User;