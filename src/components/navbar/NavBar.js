import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select, 
  Button
} from "@chakra-ui/react"
import {HamburgerIcon } from '@chakra-ui/icons'
import { withRouter } from "react-router";
import SearchBar from "../searchBar/SearchBar";



 const NavBar = ({history, filter}) => {
  const generations = [1, 2, 3, 4, 5, 6, 7, 8];
  const [showNav, setShowNav] = useState()
  const handleGenerationChange =(e) => {
    console.log('e', e.target.value)
    history.push(`/generations/${e.target.value}`)
  }

  const handleSearchClick = () => {
    console.log('true', true)
    setShowNav(false)
  }
  return (
    <nav className="navBar">
        <button
          className="navbar-toggle-btn"
          onClick={() => setShowNav(true) }
        >
          <HamburgerIcon />
        </button>
      <div className={"main-nav"}>
        <ul
          className={
            "main-nav-list"
          }
        >
          <li>
            <Link to={"/"}>
              <button
                className="nav-links"
                onClick={() => setShowNav(!showNav)}
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
                  <li onClick={() =>setShowNav(!showNav)}>
                    Generation {generationNum}
                  </li>
                </Link>
              ))}
            </ul>
          </li>
          <li>
            <button
              className="nav-links"
              onClick={() => setShowNav(!showNav)}
            >
              <a href="https://github.com/lwatson2/react-pokedex"> About </a>
            </button>
          </li>
        </ul>
      </div>
      <Drawer isOpen={showNav} placement="right" onClose={() =>  setShowNav(false)}>
          <DrawerOverlay>
            <DrawerCloseButton />
            <DrawerContent>
            <DrawerBody>
              <Link to='/'>
              <Button colorScheme='facebook' mb='2' variant='ghost' onClick={() => setShowNav(!showNav)}>
                Home
              </Button>
              </Link>
              <Select onChange={handleGenerationChange} >
                {generations.map(genNum => (
                    <option value={genNum}onClick={() => setShowNav(!showNav)}>
                     Generation {genNum}
                  </option>
                ))}
              </Select>
            </DrawerBody>
            <DrawerFooter>
              <SearchBar filter={filter} handleSearchClick={handleSearchClick} />
            </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
      </Drawer>
    </nav>
  );
}
export default withRouter(NavBar)