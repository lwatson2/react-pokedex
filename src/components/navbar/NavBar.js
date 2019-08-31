import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
  }

  render() {
    const { showNav } = this.state;
    return (
      <nav className="navBar">
        {showNav ? (
          <button
            className="navbar-toggle-btn"
            onClick={() => this.setState({ showNav: !showNav })}
          >
            X
          </button>
        ) : (
          <button
            className="navbar-toggle-btn"
            onClick={() => this.setState({ showNav: !showNav })}
          >
            <MenuIcon style={{ fontSize: 17, color: "#fff" }} />
          </button>
        )}
        <div className={showNav ? "main-nav show-main-nav" : "main-nav"}>
          <Link to={"/"}>
            <button
              className="nav-links"
              onClick={() => this.setState({ showNav: !showNav })}
            >
              Home
            </button>
          </Link>

          <button
            className="nav-links"
            onClick={() => this.setState({ showNav: !showNav })}
          >
            <a href="https://github.com/lwatson2/react-pokedex"> About </a>
          </button>
        </div>
      </nav>
    );
  }
}
export default NavBar;
