import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom'
import PokeCalls from './../pokecalls/PokeCalls'
import Detail from './../detail/Detail'
import Generations from './../generations/Generations'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import './NavBar.css'


class NavBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNav: false,
			showGen: false,
		}
		
	}
	
	handleClick = () => {
		this.setState({ showNav: !this.state.showNav })
	}

	render() {
		if(this.state.showNav){
		return (
			<div className='navBar'>
				<div className='navBarOpen'>
				<button className='navButton'onClick={this.handleClick}>
				{this.state.showNav ?
					<KeyboardArrowUp
					style={{fontSize: 17}} 
					/> :
					<KeyboardArrowDown
					style={{fontSize: 17}} 
						/> }
				 </button>
				
				</div>
				<div className='navBarList'>
				<ul>
					<Link to={'/'} >
						<li className='navBarItems'> Home </li>
					</Link>
					<li className='navBarItems'> About </li>
				</ul>
				
				
				</div>
			</div>
		);
	} else 
			return (
				<div className='navBarClosed'>
					<div className='navButtonClosed'>
						<button className='navButton' onClick={this.handleClick}>
							{this.state.showNav ?
								<KeyboardArrowUp
									style={{fontSize: 17}} 
								/> :
								<KeyboardArrowDown
									style={{fontSize: 17}} 
								/> }
						</button>
					</div>
				</div>
				)
	}
}
export default NavBar