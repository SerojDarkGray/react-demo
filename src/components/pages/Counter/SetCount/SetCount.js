import React from 'react';
import Increment from './Increment';
import Decrement from './Decrement';
function SetCount(props){


    return(
        <div>
            
            <Decrement buttonStyle={props.buttonStyle}/>
            <Increment buttonStyle={props.buttonStyle}/>
            
        </div>
    )

}

export default SetCount;