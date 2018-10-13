import PokeGrid from './../pokegrid/PokeGrid'
import Pages from './../pages/Pages'
import React, { Component } from 'react'
import axios from 'axios'
import Loading from './../loading/Loading'
import ErrorMessage from './../errorMessage/ErrorMessage'
import './PokeCalls.css'

export default class PokeCalls extends Component {
  constructor(props){
    super(props)
  this.state = {
    pokemon: [],
    pokemonList: [],
    loading: false, 
    sorted: false,
    offset: 0,
    error: null,

  }
  }
  componentDidMount(){
  this.Api()
    
  }
  
  
  Api = () => {
   
    axios.get(` https://pokeapi.co/api/v2/pokemon/`)
    .then(response => 
     this.setState({ pokemon: response.data.results}, this.Picture))
    .catch((error) => this.setState({ 
      error: error.errorMessage,
      sorted: true, 
     }))
  }
  handlePagesClick = (direction) => {
    let nextPage = this.state.offset
    
    if(direction === 'next'){
        nextPage += 20
      }else if(nextPage === 0)
        nextPage
       else{
        nextPage -= 20
    }
    this.setState({ offset: nextPage,
    pokemonList: [], sorted: false }, this.Api)
    }
  
    Picture = () =>{

    let pokemon = this.state.pokemon;

    const pokePromises = pokemon.map(pokemon =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
      );
      Promise.all(pokePromises).then(all => {
        const data = all.map(result => result.data);
          this.setState(
            { pokemonList: this.state.pokemonList.concat(data) },
          this.Pass
        );
      });
    }
  
    Pass = () =>{
      
      let poke1 = this.state.pokemonList
      
      if(poke1.length >= 20){
     let newPoke1 = poke1.sort(this.PokeSort)
     
     this.setState({
      sorted: true, 
      pokemonList: newPoke1, 
      
     })
   }
   
     return this.setState({ loading: true})
    
       
      }
      
   PokeSort = (a, b) => {
  
    const Aid = a.id
   const Bid = b.id

   let comparison = 0
   if(Aid > Bid){
    comparison = 1
   }else if(Aid < Bid){
    comparison = -1
   }
   return comparison 
   } 
    
  
    
 


   render(){
    const { pokemonList, sorted, offset, error } = this.state
    
      if(!sorted){
        return <div className='Loading'> <Loading
        width = '64px'
        height = '64px'
         /> </div>
        } 
        if(error){
          return 
            <div className='error'>{error}</div>
            
        }
          return(
            <div>
               <PokeGrid 
               pokemonList = {this.state.pokemonList}
               />
               <Pages 
               handlePagesClick={this.handlePagesClick}
               />
            </div>
          )
        
      }
  }