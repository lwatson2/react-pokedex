import React, { Component } from 'react';
import PokeCalls from './pokecalls/PokeCalls'
import SearchBar from './searchBar/SearchBar'
import Detail from './detail/Detail'
import NavBar from './navbar/NavBar'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import ErrorMessage from './errorMessage/ErrorMessage'



class App extends Component {
      constructor(props) {
      super(props);
      this.state = {
        showNav: false, }
      
      }
    
     
     
     
    
    
    

  render() {
   return (
      <BrowserRouter>
        <div>
          <NavBar />
          
          <SearchBar />
          <Switch>
          <Route exact path='/' component={PokeCalls} />
          <Route exact path='/detail/:name' component={Detail} />

          <Route component={ErrorMessage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}


export default App;
