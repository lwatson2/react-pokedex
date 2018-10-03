import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom'
import PokeCalls from './../pokecalls/PokeCalls'
import Detail from './../detail/Detail'
import './NavBar.css'

class NavBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNav: false,
			showGen: false,
		}
		
	}
	showGens = () => {
		this.setState({ showGen: !this.state.showGen})
	}
	handleClick = () => {
		this.setState({ showNav: !this.state.showNav })
	}

	render() {
		if(this.state.showNav){
		return (
			<div className='navBar'>
				<div className='navButton'>
				<button onClick={this.handleClick}> Click </button>
				</div>
				<div className='navBarList'>
				<ul>
					<Link to={'/'} >
						<li className='navBarItems'> Home </li>
					</Link>
					<li className='navBarItems'> Generations<button onClick={this.showGens}>C </button>
					{this.state.showGen && <p>hi</p>}
					</li>
					<li className='navBarItems'> About </li>
				</ul>
				
				
				</div>
			</div>
		);
	} else 
			return (
				<div className='navBarClosed'>
					<div className='navButtonClosed'>
						<button onClick={this.handleClick}>Click</button>
					</div>
				</div>
				)
	}
}
export default NavBar