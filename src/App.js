


import './App.css';
import Greeting from './Greeting.js'
import User from './User.js'





function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Greeting />

        <User 
        name="Askeladd" 
        age="44" status="Deceased" 
        href="https://vinlandsaga.fandom.com/wiki/Askeladd"/>

        <User  
        name="Thorkell" 
        age="56" status="Alive" 
        href="https://vinlandsaga.fandom.com/wiki/Thorkell"/>

        <User  
        name="Thorfinn" 
        age="18" status="Alive" 
        href="https://vinlandsaga.fandom.com/wiki/Thorfinn"/>

      </header>
    </div>
  );
}

export default App;
