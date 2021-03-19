import React, { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import "./NavBar.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Button,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { withRouter } from "react-router";
import SearchBar from "../searchBar/SearchBar";
import Filter from "../filter/Filter";

const NavBar = ({ history, handleFilter, location }) => {
  const generations = [1, 2, 3, 4, 5, 6, 7];
  const [showNav, setShowNav] = useState();
  const handleGenerationChange = (e) => {
    console.log("e", e.target.value);
    history.push(`/generations/${e.target.value}`);
  };

  const handleClick = () => {
    setShowNav(false);
  };
  return (
    <nav className="navBar">
      <Box bg="gray.800" h="60px">
        <div className="hamburger-menu-container">
          <IconButton
            aria-label="menu"
            icon={<HamburgerIcon />}
            variant={"ghost"}
            size="lg"
            colorScheme="blackAlpha"
            color="white"
            className="navbar-toggle-btn"
            onClick={() => setShowNav(true)}
          />
        </div>
        <div className={"main-nav"}>
          <ul className={"main-nav-list"}>
            <li>
              <Link fontWeight="600" color="white" as={ReactRouterLink} to="/">
                Home
              </Link>
            </li>
            <li>
              <Menu>
                <MenuButton
                  bgColor="gray.800"
                  color="white"
                  colorScheme="blackAlpha"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  Generations
                </MenuButton>
                <MenuList>
                  {generations.map((genNum) => (
                    <Link
                      key={genNum}
                      to={`/generations/${genNum}`}
                      as={ReactRouterLink}
                    >
                      <MenuItem color="gray.700">Generation {genNum}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            </li>
            <li>
              <div className="searchBarContainer">
                <SearchBar handleSearchClick={handleClick} />
                <Filter
                  handleFilter={handleFilter}
                  handleFilterClick={handleClick}
                  location={location}
                />
              </div>
            </li>
          </ul>
        </div>
        <Drawer
          isOpen={showNav}
          placement="right"
          onClose={() => setShowNav(false)}
        >
          <DrawerOverlay>
            <DrawerCloseButton />
            <DrawerContent>
              <DrawerBody>
                <Link to="/">
                  <Button
                    colorScheme="facebook"
                    mb="2"
                    variant="ghost"
                    onClick={() => setShowNav(!showNav)}
                  >
                    Home
                  </Button>
                </Link>
                <Select onChange={handleGenerationChange}>
                  {generations.map((genNum) => (
                    <option
                      key={genNum}
                      value={genNum}
                      onClick={() => setShowNav(!showNav)}
                    >
                      Generation {genNum}
                    </option>
                  ))}
                </Select>
              </DrawerBody>
              <DrawerFooter>
                <div className="searchBarContainer">
                  <SearchBar handleSearchClick={handleClick} />
                </div>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </nav>
  );
};
export default withRouter(NavBar);
