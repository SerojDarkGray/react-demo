

import React, { Component } from 'react';
import Name from "./Name";
import Price from "./Price";
import Description from "./Description";

class Product extends Component {


    render() {
        const { productName, price, description } = this.props;
        return (
            <div >
                <Name productName={productName} />
                <Price price={price} />
                <Description description={description} />
            </div>
        );
    }
}





export default Product;