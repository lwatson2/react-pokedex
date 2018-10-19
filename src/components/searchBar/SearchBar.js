import React, { Component } from 'react'
import Detail from './../detail/Detail'
import {
  Route,
  Link,
} from 'react-router-dom'
import Filter from './../filter/Filter'
import Search from '@material-ui/icons/Search'
import './SearchBar.css'

class SearchBar extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchQuery: '',
			showFilters: false	
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
					<button className='submitButton'><Link to={`/detail/${this.state.searchQuery}`}> 
					<Search 
						style={{ fontSize: 20}}
					/>
				</Link></button>
					<button 
					className='filterButton' 
					onClick={() => {this.setState({ showFilters: !this.state.showFilters })}}>
					Filter
				</button>
				</form>
				
				{this.state.showFilters ? <Filter /> : ''}
				<Route exact path ='detail/:name' component={Detail}/>
				</div>
			)
}
}
export default SearchBar