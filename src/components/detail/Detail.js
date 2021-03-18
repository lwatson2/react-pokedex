import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Detail.css";
import AbilityDetail from "../abilityDetail/AbilityDetails";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import { Box, Text } from "@chakra-ui/layout";
import {
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import DetailAbout from "./detailAbout/DetailAbout";
import DetailStats from "./detailStats/DetailStats";
import DetailEvolutions from "./detailTyping/DetailTyping";

export const Detail = ({ location, match }) => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAbility, setShowAbility] = useState(false);
  const [pokeSpeciesData, setPokeSpeciesData] = useState({});
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    fetchPokeName();
  }, [location.pathname]);

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
    } catch (error) {
      setIsLoaded(true);
      setError(true);
      setErrorCode(error.request.status);
    }
  };
  const getFlavorText = () => {
    const flavorText = pokeSpeciesData.flavor_text_entries.find(
      ({ language }) => language.name === "en"
    );
    return flavorText.flavor_text;
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
      <Box bgColor="gray.50" color="gray.800" m="24px" borderRadius="8px">
        <div className="pokeDetailHeader">
          <Text fontSize="3xl" className="pokeDetailName">
            {pokeData.name}
          </Text>
          <Text fontSize="3xl" ml="auto">
            #{pokeData.id}
          </Text>
          <div className="pokedetail-header-types-container">
            {pokeData.types.map(({ type }) => {
              return (
                <Tag
                  bgColor={`type.${type.name}`}
                  key={type.name}
                  size="lg"
                  mr="8px"
                  ml="8px"
                  variant="solid"
                  borderRadius="full"
                >
                  <TagLabel overflow="initial" textTransform="capitalize">
                    {type.name}
                  </TagLabel>
                </Tag>
              );
            })}
          </div>
        </div>
        <div className="pokeSpriteContainer">
          <Image
            objectFit="cover"
            boxSize="250px"
            src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokeData.id
              .toString()
              .padStart(3, "0")}.png`}
            alt={`${pokeData.name} sprite`}
          />
        </div>
        <Text p="1rem">{getFlavorText()}</Text>
        <Tabs variant="soft-rounded" mt="1rem" colorScheme="cyan">
          <TabList>
            <Tab>About</Tab>
            <Tab>Stats</Tab>
            <Tab>Types / Abilites</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DetailAbout height={pokeData.height} weight={pokeData.weight} />
            </TabPanel>
            <TabPanel>
              <DetailStats stats={pokeData.stats} />
            </TabPanel>
            <TabPanel>
              <DetailEvolutions
                types={pokeData.types}
                abilities={pokeData.abilities}
              />
            </TabPanel>
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
