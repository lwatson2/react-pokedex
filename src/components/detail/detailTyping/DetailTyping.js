import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import {
  Text,
  Tag,
  TagLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
} from "@chakra-ui/react";
import "./DetailTyping.css";
import Card from "../../card/Card";

const DetailTyping = ({ types, abilities }) => {
  console.log("types", types);
  const [typesData, setTypesData] = useState();
  const [abilitiesData, setAbilitiesData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    const typesArray = [];
    for (const { type } of types) {
      const { data } = await axios.get(type.url);
      typesArray.push(data);
    }
    console.log("typesArray", typesArray);
    const totalEffectives = getEffectives(typesArray);
    setTypesData(totalEffectives);
    const abilitiesArray = [];
    for (const { ability, is_hidden } of abilities) {
      const { data } = await axios.get(ability.url);
      const abilityData = buildAbility(data, is_hidden);
      abilitiesArray.push(abilityData);
    }
    setAbilitiesData(abilitiesArray);
    setLoading(false);
    console.log("abilitiesArray", abilitiesArray);
  };

  const buildAbility = (data, is_hidden) => {
    console.log("data", data);
    const { effect_entries } = data;
    const englishAbility = effect_entries.find(
      ({ language }) => language.name === "en"
    );
    console.log("englishAbility", englishAbility);
    return {
      hiddenAbility: is_hidden,
      abilityText: englishAbility.short_effect,
      name: data.name,
    };
  };

  const getEffectives = (types) => {
    const typeEffectives = types.reduce((acc, type) => {
      // group all effectives together
      const { damage_relations } = type;
      const {
        double_damage_to,
        double_damage_from,
        half_damage_from,
        half_damage_to,
      } = damage_relations;
      acc.superEffective = acc.superEffective
        ? acc.superEffective.concat(double_damage_to)
        : double_damage_to;

      acc.superWeak = acc.superWeak
        ? acc.superWeak.concat(double_damage_from)
        : double_damage_from;

      acc.halfWeak = acc.halfWeak
        ? acc.halfWeak.concat(half_damage_from)
        : half_damage_from;

      acc.halfEffective = acc.halfEffective
        ? acc.halfEffective.concat(half_damage_to)
        : half_damage_to;

      return acc;
    }, {});

    types.superEffective = typeEffectives.superEffective.filter(({ name }) => {
      return !typeEffectives.halfEffective.find(
        (half_damage) => half_damage.name === name
      );
    });
    typeEffectives.superWeak = typeEffectives.superWeak.filter(({ name }) => {
      return !typeEffectives.halfWeak.find((half_weak) => {
        return half_weak.name === name;
      });
    });

    types.halfEffective = typeEffectives.halfEffective.filter(({ name }) => {
      return !typeEffectives.superEffective.find(
        (half_damage) => half_damage.name === name
      );
    });

    types.halfWeak = typeEffectives.halfWeak.filter(({ name }) => {
      return !typeEffectives.superWeak.find(
        (half_damage) => half_damage.name === name
      );
    });

    return typeEffectives;
  };
  if (loading || !typesData) {
    return <Loading />;
  }
  return (
    <div>
      <Card header="Type effectiveness" type="types">
        <div>
          <Text mb="1rem">2x weak against</Text>
          <div className="types-list-container">
            {typesData.superWeak.map(({ name }) => {
              return (
                <Tag
                  bgColor={`type.${name}`}
                  key={name}
                  size="lg"
                  variant="solid"
                  borderRadius="full"
                >
                  <TagLabel textTransform="capitalize">{name}</TagLabel>
                </Tag>
              );
            })}
          </div>
        </div>
        {/* <div>
          <Text mb="1rem">2x Effective against</Text>
          <div className="types-list-container">
            {typesData.superEffective.map(({ name }) => {
              return (
                <Tag
                  bgColor={`type.${name}`}
                  key={name}
                  size="lg"
                  variant="solid"
                  borderRadius="full"
                >
                  <TagLabel textTransform="capitalize">{name}</TagLabel>
                </Tag>
              );
            })}
          </div>
        </div> */}
      </Card>
      <Card type="abilities" header="Abilities">
        <Accordion allowMultiple>
          {abilitiesData.map(({ abilityText, hiddenAbility, name }) => {
            return (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box textTransform="capitalize" flex="1" textAlign="left">
                      {name}
                      {hiddenAbility ? (
                        <Badge ml="1rem" colorScheme="purple">
                          Hidden Ability
                        </Badge>
                      ) : null}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{abilityText}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </div>
  );
};

export default DetailTyping;
