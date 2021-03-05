import React from "react";
import { Progress } from "@chakra-ui/react";
const DetailStats = ({ stats }) => {
  console.log("stats", stats);
  return (
    <div>
      {stats.map(({ base_stat, stat }, i) => (
        <div>
          <span style={{ textTransform: "capitalize" }} key={i}>
            {" "}
            {stat.name}{" "}
          </span>
          <Progress
            borderRadius="8px"
            colorScheme="cyan"
            max={256}
            value={base_stat}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailStats;
