import React from 'react';
import {connect} from 'react-redux';
function ShowCount(props){


    return(
            <h3>Count : {props.value} </h3>
    )

}

const mapStateToProps = (state) =>{
    return{
        value: state.count
    }
}




export default connect(mapStateToProps, null)(ShowCount);