import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./pokegrid.css";
import Detail from "./../detail/Detail";

export default class PokeGrid extends Component {
  render() {
    return (
      <div className="pokeGridContainer">
        {this.props.pokemonList.map(({ name, id, sprites }) => (
          <Link key={id} to={`/detail/${name}`}>
            <div className="pokeGridItemContainer" key={id}>
              <img src={sprites.front_default} alt="pokemon" />
              <span className="pokeName">
                {name} #{id}
              </span>
            </div>
          </Link>
        ))}
        <Route exact path="detail/:name" component={Detail} />
      </div>
    );
  }
}
