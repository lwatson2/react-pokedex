import PokeGrid from "./../pokegrid/PokeGrid";
import Pages from "./../pages/Pages";
import React, { Component } from "react";
import axios from "axios";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import "./PokeCalls.css";

export default class PokeCalls extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pokemon: [],
      pokemonList: [],
      loading: false,
      sorted: false,
      sliceNum: 0,
      error: null,
      newPokemonList: [],
      startNum: 1,
      endNum: 50,
      pokeFilter: [],
      sliceEndNum: 50
    };
  }
  componentDidMount() {
    this.Picture();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.filterList !== prevProps.filterList) {
      this.handleFilterList();
    }
    if (this.state.startNum !== prevState.startNum) {
      this.Picture();
    }
    if(this.state.sliceNum !== prevState.sliceNum) {
      this.fetchPokemon()
    }
  };
  handleFilterList = () => {
    const { pokemonList, newPokemonList, pokeFilter, sorted } = this.state;
    const { filterList } = this.props
    const filteredItems = [];
    this.setState({sorted: false})
    if(this.props.filterList.length < 1){
     this.Picture()
    }
     let pokeFilterList = []
     filterList.map(filter => {
        axios.get(`https://pokeapi.co/api/v2/type/${filter}/`)
        .then(res => {
          pokeFilterList.push(...res.data.pokemon)
          this.setState({pokeFilter: pokeFilterList})
        } 
        )  
      })
     this.setState({sorted: true }, this.test())
  };
  test = () => {
    console.log('test')
    console.log(this.state.pokeFilter)
    this.setState({sorted: true })
  }
  testing = () => {
    let poke = this.state.pokeFilter
    let poke1 = []
    poke.map(pokes => pokes.map(items => poke1.push()))
    console.log(poke1)
  }
  fetchPokemon = () => {
    console.log('testing')
    const { pokeFilter, sorted, sliceEndNum, sliceNum } = this.state
    this.setState({sorted: false})
    const newList = []
      
      pokeFilter.map(poke => 
        poke.pokemon.map(pokemon => newList.push(pokemon) )
       
    );
    console.log(pokeFilter)
    let slicedList = newList.slice(sliceNum, sliceEndNum)
    let newPromises = slicedList.map(pokemon => 
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}/`)
      )
    Promise.all(newPromises).then(all => {
      const data = all.map(result => result.data);
      this.setState({ newPokemonList: this.state.newPokemonList.concat(data), sorted: true })
  }) 
}
  handleFilterClick = direction => {
    let { sliceNum, sliceEndNum } = this.state
    console.log(direction)

    if(direction === 'next'){
      sliceNum += 51
      sliceEndNum += 51
    } else if (direction === "prev" && sliceNum == 0){
      sliceNum
      sliceEndNum
    } else {
      sliceNum = 1
      sliceEndNum = 50
    }
    this.setState({
      sliceNum,
      sliceEndNum,
      newPokemonList: [],
      sorted: false
    })
  }
  handlePagesClick = direction => {
    let { endNum, startNum } = this.state;

    if (direction === "next") {
      startNum += 50;
      endNum += 50;
    } else if (direction === "prev" && startNum == 1) {
      startNum;
      endNum;
    } else {
      startNum -= 50;
      endNum -= 50;
    }
    this.setState({
      startNum: startNum,
      pokemonList: [],
      sorted: false,
      endNum: endNum
    });
  };

  Picture = () => {
    let { pokemon, startNum, endNum,  } = this.state;
    this.setState({sorted: false})
    let numList = [];
    for (let i = startNum; i <= endNum; i++) {
      numList.push(i);
    }

    const pokePromises = numList.map(pokemon =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    );
    Promise.all(pokePromises).then(all => {
      const data = all.map(result => result.data);
      this.setState(
        { pokemonList: this.state.pokemonList.concat(data), sorted: true }
      );
    });
  };

  Pass = () => {
    let poke1 = this.state.pokemonList;

    if (poke1.length >= 20) {
      let newPoke1 = poke1.sort(this.PokeSort);

      this.setState({
        sorted: true,
        pokemonList: newPoke1
      });
    }

    return this.setState({ loading: true });
  };

  PokeSort = (a, b) => {
    const Aid = a.id;
    const Bid = b.id;

    let comparison = 0;
    if (Aid > Bid) {
      comparison = 1;
    } else if (Aid < Bid) {
      comparison = -1;
    }
    return comparison;
  };

  render() {
    const { newPokemonList, pokemonList, sorted, error } = this.state;

    if (!sorted) {
      return (
        <div className="Loading">
          {" "}
          <Loading width="64px" height="64px" />{" "}
        </div>
      );
    }
    if (error) {
      return (
        <div className="error">
          <ErrorMessage />
        </div>
      );
    }
    if (newPokemonList.length > 0) {
      return (
        <div>
          <PokeGrid pokemonList={newPokemonList} />
          <Pages handlePagesClick={this.handleFilterClick} />
        </div>
      );
    }
    return (
      <div>
        <PokeGrid pokemonList={pokemonList} />
        <Pages handlePagesClick={this.handlePagesClick} />
      </div>
    );
  }
}
