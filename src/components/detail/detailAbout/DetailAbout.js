import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import "./DetailAbout.css";

const DetailAbout = ({ flavorText, height, weight }) => {
  //   useEffect(() => {
  //     const fetch = async () => {
  //       console.log("data", data);
  //     };
  //     fetch();
  //   }, [pokeID]);
  const heightInFeet = height / 3.048;
  const weightInPounds = weight / 4.536;
  return (
    <div>
      <Text>{flavorText.flavor_text}</Text>
      <div className="about-weight-height-container">
        <Text>Height</Text>
        <Text>{heightInFeet.toFixed(2)} ft</Text>
        <Text>Weight</Text>
        <Text>{weightInPounds.toFixed(2)} pounds</Text>
      </div>
    </div>
  );
};

export default DetailAbout;
