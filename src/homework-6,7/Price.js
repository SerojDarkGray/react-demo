

import React, { Component } from 'react';

class Price extends Component{
    constructor(props){
        super(props);
        this.state = {
            price : props.price    
        }
    }

    ChangeTheCurrency = () =>{
        
        let {price} = this.state;
        let priceWithoutSymbol = parseFloat(price);
        if(price.includes("$")){
            priceWithoutSymbol =  (priceWithoutSymbol * 500) + "֏";
        }
        else{
            priceWithoutSymbol =  (priceWithoutSymbol / 500) + "$";
        }    
        this.setState({
            price :  priceWithoutSymbol
        });
    }

    render(){
        
        return(
            <span> , <button onClick = {this.ChangeTheCurrency}>Change the currency</button> Price - {this.state.price}</span>
        )
    }

}


export default Price;