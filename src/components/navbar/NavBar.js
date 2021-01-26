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
    const generations = [1, 2, 3, 4, 5, 6, 7, 8];
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
          <ul
            className={
              showNav ? "main-nav-list show-main-nav" : "main-nav-list"
            }
          >
            <li>
              <Link to={"/"}>
                <button
                  className="nav-links"
                  onClick={() => this.setState({ showNav: !showNav })}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="generationsListItem">
              <button className="nav-links">Generations</button>
              <ul className="generationsListContainer">
                {generations.map(generationNum => (
                  <Link to={`/generations/${generationNum}`}>
                    <li onClick={() => this.setState({ showNav: !showNav })}>
                      Generation {generationNum}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
            <li>
              <button
                className="nav-links"
                onClick={() => this.setState({ showNav: !showNav })}
              >
                <a href="https://github.com/lwatson2/react-pokedex"> About </a>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavBar;
