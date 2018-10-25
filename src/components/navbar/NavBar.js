import React, { Component } from "react";
import { Link } from "react-router-dom";

import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      showGen: false
    };
  }

  handleClick = () => {
    this.setState({ showNav: !this.state.showNav });
  };

  render() {
    if (this.state.showNav) {
      return (
        <div className="navBar">
          <div className="navBarOpen">
            <button className="navButton" onClick={this.handleClick}>
              {this.state.showNav ? (
                <KeyboardArrowUp style={{ fontSize: 17 }} />
              ) : (
                <KeyboardArrowDown style={{ fontSize: 17 }} />
              )}
            </button>
          </div>
          <div className="navBarList">
            <ul>
              <Link to={"/"}>
                <li className="navBarItems"> Home </li>
              </Link>
              <li className="navBarItems"><a href='https://github.com/lwatson2'>  About </a> </li>
            </ul>
          </div>
        </div>
      );
    } else
      return (
        <div className="navBarClosed">
          <div className="navButtonClosed">
            <button className="navButton" onClick={this.handleClick}>
              {this.state.showNav ? (
                <KeyboardArrowUp style={{ fontSize: 17 }} />
              ) : (
                <KeyboardArrowDown style={{ fontSize: 17 }} />
              )}
            </button>
          </div>
        </div>
      );
  }
}
export default NavBar;
