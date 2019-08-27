import React, { Component } from "react";
import Detail from "./../detail/Detail";
import { Route, Link } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import Search from "@material-ui/icons/Search";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      showFilters: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ searchQuery: inputValue });

    if (!inputValue) return "";
  };
  handleSubmit = event => {
    event.preventDefault();
    const value = this.state.searchQuery;
    this.setState({ searchQuery: "" });
    if (value) {
      return <Detail name={value} />;
    }
  };
  handleFilter = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { searchQuery, showFilters } = this.state;
    return (
      <div className="searchBar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={this.handleChange}
            className="inputField"
          />
          <Link to={`/detail/${searchQuery}`}>
            <button className="submitButton">
              <Search style={{ fontSize: 13 }} />
            </button>
          </Link>
        </form>
        {this.props.location.pathname === "/" && (
          <button
            className="filterButton"
            onClick={() => {
              this.setState({ showFilters: !showFilters });
            }}
          >
            Filter
          </button>
        )}
        {showFilters && (
          <Filter showFilter={this.handleFilter} filter={this.props.filter} />
        )}
        <Route exact path="detail/:name" component={Detail} />
      </div>
    );
  }
}
export default withRouter(SearchBar);
