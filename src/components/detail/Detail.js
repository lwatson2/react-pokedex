import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Detail.css";
import AbilityDetail from "../abilityDetail/AbilityDetails";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import { Box, Text } from "@chakra-ui/layout";
import {
  Image,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import DetailAbout from "../detailAbout/DetailAbout";

export const Detail = ({ location, match }) => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAbility, setShowAbility] = useState(false);
  const [abilityURL, setAbilityURL] = useState("");
  const [weight, setWeight] = useState("");
  const [pokeSpeciesData, setPokeSpeciesData] = useState({});
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [showShiny, setShowShiny] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    fetchPokeName();
  }, [location.pathname]);

  const renderType = (params) => {
    return params;
  };

  const fetchPokeName = async () => {
    setError(false);
    setIsLoaded(false);
    const pokeName = match.params.name;
    const lowerCasePokeName = pokeName.toLowerCase();
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`
      );
      const { data: speciesData } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
      );
      console.log("speciesData", speciesData);
      setPokeSpeciesData(speciesData);
      setPokeData(data);
      setIsLoaded(true);
      handleWeightChange(data.weight);
    } catch (error) {
      setIsLoaded(true);
      setError(true);
      setErrorCode(error.request.status);
    }
  };

  const handleWeightChange = (weight) => {
    //Fixes weight to better show weight
    let weight1 = weight.toString();
    let newWeight = weight1.slice(0, -1) + "." + weight1.slice(-1);
    setWeight(newWeight);
  };

  const handleChange = (name, url, key) => {
    if (name === "ability") {
      setAbilityURL(url);
      setShowAbility(!showAbility);
      setKey(key);
    } else {
      setKey("");
    }
  };
  if (!isLoaded) {
    return (
      <div className="loadingContainer">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="detailError">
        <ErrorMessage errorCode={errorCode} pokeNames={match.params.name} />
      </div>
    );
  }
  if (isLoaded) {
    return (
      <Box bgColor="gray.50" color="gray.800" m="24px">
        <div className="pokeDetailHeader">
          <Text className="pokeDetailName">{pokeData.name}</Text>
          <div className="shinySwitchContainer">
            <Text mr="1rem">View Shiny</Text>
            <Switch onChange={(e) => setShowShiny(e.target.checked)} />
          </div>
          <Text>#{pokeData.id}</Text>
        </div>
        <div className="pokeSpriteContainer">
          <Image
            objectFit="cover"
            boxSize="250px"
            src={
              showShiny
                ? pokeData.sprites.front_shiny
                : pokeData.sprites.front_default
            }
            alt={`${pokeData.name} sprite`}
          />
        </div>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>About</Tab>
            <Tab>Stats</Tab>
            <Tab>Moves</Tab>
            <Tab>Evolutions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DetailAbout
                flavorText={pokeSpeciesData.flavor_text_entries.find(
                  ({ language }) => language.name === "en"
                )}
                height={pokeData.height}
                weight={pokeData.weight}
              />
            </TabPanel>
            <TabPanel>hi 2</TabPanel>
            <TabPanel>hi 3</TabPanel>
            <TabPanel>hi 4</TabPanel>
          </TabPanels>
        </Tabs>
        {/* <div className="topBoxWrapper">
          <div className="pokeNameContainer">
            <h3 className="pokeDetailName">{pokeData.name}</h3>
            <p>#{pokeData.id}</p>
          </div>
          <div className="pokePicture">
            <img
              src={pokeData.sprites.front_default}
              alt={`${pokeData.name} sprite`}
            />
          </div>
          <div className="shiny">
            <p className="p-Shiny">Shiny Sprite </p>
          </div>
          <div className="shinySprite">
            <img
              src={pokeData.sprites.front_shiny}
              alt={`shiny ${pokeData.name} sprite`}
            />
          </div>
          <div className="weightTypeContainer">
            <div className="typeContainer">
              <h4 style={{ gridColumn: "1 / -1" }}>Types</h4>
              {pokeData.types.map(({ type }, i) => (
                <div className={renderType(type.name)}>
                  <span className="s-Type" key={i}>
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="weightContainer">
              <p className="p-weight"> Weight </p>
              <div className="weight">
                <p> {weight} kg </p>
              </div>
            </div>
          </div>
          <div className="abilityContainer">
            <h3 className="p-Abilites">Abilities</h3>
            <div className="pokeAbilities">
              {pokeData.abilities.map(({ ability }, i) => (
                <AbilityDetail key={i} name={ability.name} url={ability.url} />
              ))}
            </div>
          </div>
        </div>
        <div className="stats">
          <h3 className="p-Stats"> Stats </h3>
          <div className="pokeContainer">
            {pokeData.stats.map(({ base_stat, stat }, i) => (
              <div>
                <span className="statName" key={i}>
                  {" "}
                  {stat.name}{" "}
                </span>
                <div className="statContainer">
                  <div style={{ width: base_stat }} className="statBar">
                    <span>{base_stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </Box>
    );
  }
};

export default Detail;
