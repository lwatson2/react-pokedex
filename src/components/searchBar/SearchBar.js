import React, { Component } from 'react'
import Detail from './../detail/Detail'
import {
  Route,
  Link,
} from 'react-router-dom'
import './SearchBar.css'

class SearchBar extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchQuery: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	
	handleChange = (event) => {
		const inputValue = event.target.value 
		this.setState({ searchQuery: inputValue})

		if(!inputValue)
			return ''
	}
	handleSubmit = (event) =>{
		event.preventDefault(); 
		const value = this.state.searchQuery
		this.setState({ searchQuery: '' })
		if(value){
			return <Detail name={value} />
		}
	}
	render(){
		return(
			<div className='searchBar'>
				<form onSubmit={this.handleSubmit}>
				<input
				placeholder = 'Search Pokemon'
				value={this.state.searchQuery}
				onChange={this.handleChange}
				className='inputField'
				 />
				<button className='submitButton'><Link to={`/detail/${this.state.searchQuery}`}> Submit </Link></button>
				</form>


				<Route exact path ='detail/:name' component={Detail}/>
				</div>
			)
}
}
export default SearchBar