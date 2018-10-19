import React, { Component } from 'react';
import './Filter.css'

export default class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterBoxes: [],


		}
	}
	onChanges = (event) => {
		const newv = event.target
		if(newv.checked === true){
			if(!this.state.filterBoxes.includes(newv.value)){
			this.setState({filterBoxes: [...this.state.filterBoxes, newv.value] })
		}}
		if(newv.checked === false){
			if(this.state.filterBoxes.includes(newv.value)){
				let newArray = this.state.filterBoxes
				let filtered = newArray.filter(e => e !== newv.value)
				this.setState({ filterBoxes: filtered })
			}
		}
		
		console.log(this.state.filterBoxes)
	}

	render() {
		console.log(this.state.filterBoxes)
		const types = [
			'fire', 'water', 'ice', 'dragon', 'fighting', 'flying', 'grass', 'rock', 'ground', 'fairy', 'poison', 'dark', 'ghost', 'electric', 'steel', 'bug', 'normal', 'psychic'
		]
		return (
			<div className='typeList'>
				{types.map((types) => {

					return <label className='typeNames'>
						<input
							type='checkbox'
							onChange={(e) => this.onChanges(e)}
							value={types}
							/> {types}
					</label>

				})}
				<button className='doneBtn'> Done </button>
			</div>
		);
	}
}

