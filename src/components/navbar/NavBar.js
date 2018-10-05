import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom'
import PokeCalls from './../pokecalls/PokeCalls'
import Detail from './../detail/Detail'
import Generations from './../generations/Generations'
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
				<div className='navBarOpen'>
				<button className='navButton'onClick={this.handleClick}> Click </button>
				</div>
				<div className='navBarList'>
				<ul>
					<Link to={'/'} >
						<li className='navBarItems'> Home </li>
					</Link>
					<li className='navBarItems'> Generations
						<button className='genButton' onClick={this.showGens}>
							<img className={this.state.showGen ? 'dropDown' : ''} src={require("./../../images/arrowhead.png")} width='12px' height='12px' alt='arrow' />	
						 </button>
						 <div className='genList'>
						 	
							{this.state.showGen && <Generations />}
						</div>
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
						<button className='navButton' onClick={this.handleClick}>Click</button>
					</div>
				</div>
				)
	}
}
export default NavBar