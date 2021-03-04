import React, { Component } from "react";
import Detail from "./../detail/Detail";
import { Route } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import "./SearchBar.css";
import {
  Button, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input
} from "@chakra-ui/react"
import { SearchIcon, ArrowForwardIcon } from '@chakra-ui/icons'

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
    console.log('event', event)
    const { searchQuery } = this.state;
    event.preventDefault();
    const value = this.state.searchQuery;
    this.setState({ searchQuery: "" });
    if (value) {
      return this.props.history.push(`/detail/${searchQuery}`);
    }
  };
  handleFilter = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { searchQuery, showFilters } = this.state;
    return (
      <div className="searchBar">
          <Input
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={this.handleChange}
            variant='flushed'
            colorScheme='pink'
            focusBorderColor='red.700'
            maxW='250px'
            onKeyDown={(e) => e.key === 'Enter' ? this.handleSubmit(e) : null}
          />
          <Button rightIcon={<SearchIcon />} colorScheme="red" onClick={this.handleSubmit}>
            Search
          </Button>
        <div className='filter-container'>
          <Popover isOpen={showFilters}>
        {this.props.location.pathname === "/" && (
        <PopoverTrigger>
          <Button
          colorScheme="red"
          onClick={() => {
            this.setState({ showFilters: !showFilters });
          }}
          >
            Filter
          </Button>
        </PopoverTrigger>
        )}
        <PopoverContent w='fit-content' color='white' bgColor='red.700' borderColor='red.700'>
        <PopoverBody>
          <Filter showFilter={this.handleFilter} filter={this.props.filter} />
        </PopoverBody>
        </PopoverContent>
        </Popover>
          </div>
        <Route exact path="detail/:name" component={Detail} />
      </div>
    );
  }
}
export default withRouter(SearchBar);
