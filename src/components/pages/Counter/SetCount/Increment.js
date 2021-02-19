import React from 'react';
import {connect} from 'react-redux';

function Increment(props){


    return(
            <button onClick={props.onChange} className={props.buttonStyle}>+</button>
    )

}


const mapDispatchToProps = (dispatch) =>{

    return {
        onChange: ()=>{
            dispatch({type: 'INCREMENT'});
        }
    }
}

export default connect(null,mapDispatchToProps)(Increment);