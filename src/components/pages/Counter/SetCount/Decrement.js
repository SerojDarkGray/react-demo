import React from 'react';
import {connect} from 'react-redux';

function Decrement(props){


    return(
            <button onClick={props.onChange} className={props.buttonStyle}>-</button>
    )

}


const mapDispatchToProps = (dispatch) =>{

    return {
        onChange: ()=>{
            dispatch({type: 'MINUS-COUNT'});
        }
    }
}



export default connect(null,mapDispatchToProps)(Decrement);;

