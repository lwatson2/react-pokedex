import React, { Component } from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'
import './pokegrid.css'
import Detail from './../detail/Detail'



export default class PokeGrid extends Component {
	
  
  
 
  render() {

    return (
    	
			  <div>
			    	<ul className = "container">
			   			{this.props.pokemonList.map(({name, id, sprites}) =>
			   			<li className='listItems' key={id}>
			   				<ul className="pokeGrid">
			   					<Link to={`/detail/${name}`}>
			   					<li className='pokeList'><img src={sprites.front_default} alt='pokemon' /></li>
			   					<li className='pokeName'>{name}</li>
			   				</Link>
			   			</ul>
			   		</li>
			   		)}
			   	</ul>
			    <Route exact path ='detail/:name' component={Detail}/>
			  </div>
		
    )

  }
}
