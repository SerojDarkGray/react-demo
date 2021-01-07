



import React from 'react';
import './App.css';
import Product from './homework-6,7/Product.js';
import ToDo from './homework-8,10/ToDo.js'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* <Product 
        productName="Bananas" 
        price="1$" 
        description="Fresh bananas from Ecuador"/> */}
        
        <ToDo />


      </header>
    </div>
  );
}

export default App;
