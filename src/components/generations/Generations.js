import React, { useState, useEffect } from "react";
import axios from "axios";

const Generations = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/248/"
      );
      setData(res.data);
    };
    fetchdata();
  }, []);
  return <div>COMING SOON TO A POKEGYM NEAR YOU!</div>;
};

export default Generations;
