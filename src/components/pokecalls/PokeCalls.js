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
      offset: 0,
      error: null,
      newPokemonList: [],
      startNum: 1,
      endNum: 50
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
  };
  handleFilterList = () => {
    const { pokemonList, newPokemonList } = this.state;
    const filteredItems = [];
    {
      this.props.filterList.map(filter => {
        pokemonList.map(poke => {
          poke.types.map(({ type }) => {
            if (type.name === filter) {
              filteredItems.push(poke);
            }
          });
        });
      });
    }
    this.setState({ newPokemonList: filteredItems });
  };
  Api = () => {
    axios
      .get(` https://pokeapi.co/api/v2/pokemon/`)
      .then(response =>
        this.setState({ pokemon: response.data.results }, this.Picture)
      )
      .catch(error =>
        this.setState({
          error: error.errorMessage,
          sorted: true
        })
      );
  };
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
    let { pokemon, startNum, endNum } = this.state;
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
        { pokemonList: this.state.pokemonList.concat(data), sorted: true },
        this.Pass()
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
