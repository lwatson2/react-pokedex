import React, { Component } from 'react'
import './Loading.css'

class Loading extends Component {
	render(){
		const { width, height } = this.props
		return(
			<div className='loading' style={{width, height}}/>
			)
	}
} 
export default Loading
