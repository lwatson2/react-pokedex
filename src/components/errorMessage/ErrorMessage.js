
import React, {Component} from 'react';

export default class ErrorMessage extends Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props)
		if(this.props.errorCode == 'Network Error')
		return (
			<div><h3>Oops! Looks like '${this.props.pokeNames}' is not a pokemon. Please try again.</h3></div>
			
		);
		else {
			return (
				<div><h3>Oops! Something went wrong. Please try again.</h3></div>
				)
		}
	}
}

