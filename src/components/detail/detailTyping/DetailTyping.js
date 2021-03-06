import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import { Text, Tag, TagLabel } from "@chakra-ui/react";
import "./DetailTyping.css";

const DetailTyping = ({ types, abilities }) => {
  console.log("types", types);
  const [typesData, setTypesData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const typesArray = [];
      for (const { type } of types) {
        const { data } = await axios.get(type.url);
        typesArray.push(data);
      }
      console.log("typesArray", typesArray);
      setTypesData(typesArray);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading || !typesData) {
    return <Loading />;
  }
  return (
    <div>
      {typesData.map(({ name }) => {
        return (
          <Tag
            bgColor={`type.${name}`}
            key={name}
            variant="solid"
            borderRadius="full"
          >
            <TagLabel textTransform="capitalize">{name}</TagLabel>
          </Tag>
        );
      })}
    </div>
  );
};

export default DetailTyping;
