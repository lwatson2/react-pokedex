import React, { Component } from 'react';
import './Generations.css'

export default class Generations extends Component {
constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='pointer'>
				<ul className='generationUList'>
					<li> Generation 1</li>
					<li> Generation 2</li>
					<li> Generation 3</li>
					<li> Generation 4</li>
					<li> Generation 5</li>
					<li> Generation 6</li>
					<li> Generation 7</li>
				</ul>	

			</div>
		);
	}
}
