import React from 'react'

import './Pages.css'

const Pages = (props) => {
	const { handlePagesClick} = props

	
		return(
		<div className='pokeButtons'>
			<button onClick={() => handlePagesClick('prev')} className="leftbtn"><b>prev</b></button>
			
			<button onClick={() => handlePagesClick('next')}className="rightbtn"><b>next</b></button>
			
		</div>
		)
}
export default Pages