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
            dispatch({type: 'DECREMENT'});
        }
    }
}



export default connect(null,mapDispatchToProps)(Decrement);;

