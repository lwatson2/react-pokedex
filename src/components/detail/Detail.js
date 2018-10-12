import React, {Component} from 'react'
import axios from 'axios'
import './Detail.css'
import DetailsCalls from './DetailsCalls'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Loading from './../loading/Loading'
import ErrorMessage from './../errorMessage/ErrorMessage'




class Detail extends Component {
		constructor(props){
			super(props)
			this.state = {
				pokeData: [],
				isLoaded: false,
				abilityOn: false,
				abilityUrl: '',
				weight: '',
				moveUrl: '',
				key: '',
			}
		}
		componentDidMount = () => {
			const pokeName = this.props.match.params.name
			const lowerCasePokeName = pokeName.toLowerCase()
			axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`)
			.then(all => 
				this.setState({
					pokeData: all.data, 
					isLoaded: true
				}, this.Change))
			.catch(error => {
				<ErrorMessage />
			})
	}

		componentDidUpdate = (prevState, prevProps) => {
			if(this.props.location.pathname !== prevState.location.pathname){
				this.fetchPokeName()
			}
			}
		fetchPokeName = () => {

			this.setState({isLoaded: false})
			const pokeName = this.props.match.params.name
			const lowerCasePokeName = pokeName.toLowerCase()
			axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`)
			.then(all => 
				this.setState({
					pokeData: all.data,
					isLoaded: true, 
				}))
			.catch(error => {
				return (<ErrorMessage />)
			})
			
		}
		Change = () => {
			let weight = this.state.pokeData.weight
			let weight1 = weight.toString()
			let newWeight =  weight1.slice(0, -1) + '.' + weight1.slice(-1) 
			this.setState({ weight: newWeight })
		}
		handleChange = (name, url, key) => {
			if(name === 'ability'){
				this.setState({
				abilityUrl: url,
				abilityOn: !this.state.abilityOn,
				key: key
				})
			
		 } else {
			 	
			 	this.setState({ key: ''})
			}
		 }
		renderType = (params) => {
			switch(params){
				default:
					return ''
				case 'grass':
					return 'grass';
				case 'poison':
					return 'poison';
				case 'fire':
					return 'fire';
				case 'water':
					return 'water';
				case 'fighting':
					return 'fighting';
				case 'flying': 
					return 'flying';
				case 'dragon':
					return 'dragon';
				case 'normal':
					return 'normal';
				case 'fairy':
					return 'fairy';
				case 'electric':
					return 'electric';
				case 'ground':
					return 'ground';
				case 'ice':
					 return 'ice';
				case 'dark':
					return 'dark';
				case 'steel':
					return 'steel';
				case 'bug':
					return 'bug';
				case 'psychic':
					return 'psychic';
				case 'rock':
					return 'rock';

			}
		}
		
		render(){
			
			const {pokeData, isLoaded, weight} = this.state
			let moveOneContainer = []
			let moveTwoContainer = []
			
			console.log(pokeData)
		
		if(!isLoaded){
			return (
				<div className='loadingContainer'>
				<Loading 
				height = '64px'
				width = '64px'
				 />
				</div>
				)
		}else 
		return (

			<div className='pokeDetail'>
			<div className='pokeId'><p>#{pokeData.id}</p></div>
			<div className='pokePicture'>
				<img src={pokeData.sprites.front_default} alt='pokemon icon' />
			</div>
			<div className='pokemonName'>
				<h3>{pokeData.name}</h3>
			</div>
			<div className='weightContainer'>	
				<p className='p-weight'> Weight </p>
					<div className='weight'>
						<p> {weight} kg </p>
					</div>
			</div>
			<div className='types'>
				<p className='p-Types'> Types </p>
				<div className='typeContainer'>
				{pokeData.types.map(({ type }, i) => (
					<div className={this.renderType(type.name)}>
					<span className='s-Type' key={i}>{type.name}</span>
					</div>	
					))}
				</div>
			</div>
			<div className='shiny'>
				<p className='p-Shiny'>Shiny Version </p>
				<div className='shinySprite'>				
					<img src={pokeData.sprites.front_shiny} alt='shiny version' />
				</div>
			</div>
			<div  className='stats'>
			<p className='p-Stats'> Stats </p>
			<div className='pokeContainer' >
			{pokeData.stats.map(({base_stat, stat}, i) => (
				<div>
				<span key={i}> {stat.name}  </span>
				<div className='statContainer'>
				<div style={{ width: base_stat}} className='statBar'><span>{base_stat}</span></div>
				</div>
				</div>
				))}
			</div>
			</div>
			<div className='abilityContainer'>
				<p className='p-Abilites'>Abilities</p>
					<div className='pokeAbilities'>
							{pokeData.abilities.map(({ability, slot}, i) => (
							<AbilityDetail key={i} name={ability.name} url={ability.url} />
							))}
					</div>
			</div>
			<div className='movesContainer'>
				<p className='p-Moves'> Moves </p>
					<div className='pokeMoves'>
						{pokeData.moves.map(({move}, i) => {
								{i % 2 !== 0 ? moveOneContainer.push(<MoveDetail key={i} name={move.name} url={move.url} />) : ''}
								{i % 2 === 0 ? moveTwoContainer.push(<MoveDetail key={i} name={move.name} url={move.url} />) : ''}
								})}
						<div className='moveOne'>{moveOneContainer}</div>
					<div className='moveTwo'>{moveTwoContainer}</div>
					</div>
			</div>
		</div>
			)

}
}
export default Detail
class MoveDetail extends Component{
	constructor(props){
		super(props)

		this.state = {
			showDetail: false,
		}
	}

	render(){
		
		return(
			<div className='moves'>
				<span className='s-Moves'>{this.props.name}</span>
				<button className='moveButton' onClick={() => {
					this.setState({ showDetail: !this.state.showDetail})}}> 
				{this.state.showDetail ?	
				<KeyboardArrowDown 
				style={{ fontSize: 17}}
				 /> : 
				 <KeyboardArrowRight 
				 style={{ fontSize: 17}} 
				 />}
				</button>

				<div className='movesCalls'>
					{this.state.showDetail ? <DetailsCalls moveUrl={this.props.url} /> : ''}
				</div>
			</div>
			)
	}
}

class AbilityDetail extends Component {
	constructor(props){
		super(props)

		this.state = {
			showAbility: false,
		}
	}

	render(){
		return(
			<div className='ability'>
								<span key={this.props.name}className='s-Ability'> {this.props.name} </span>
								<button className='moveButton' onClick={() => this.setState({ showAbility: !this.state.showAbility})}>
								{this.state.showAbility ?	
									<KeyboardArrowDown 
										style={{ fontSize: 17}}
										 /> : 
									<KeyboardArrowRight 
										 style={{ fontSize: 17}} 
									/>}
								</button>
								<div className='callsContainer'>
									{this.state.showAbility ? <DetailsCalls abilityUrl={this.props.url} /> : ''}
							</div>
							</div>
			)
	}
}