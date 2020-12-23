



import React from 'react';
import './App.css';
import Product from './homework-6,7/Product.js';




function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Product 
        productName="Bananas" 
        price="1$" 
        description="Fresh bananas from Ecuador"/>

      </header>
    </div>
  );
}

export default App;
