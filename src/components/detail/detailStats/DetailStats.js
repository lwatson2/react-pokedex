import React from "react";
import { Progress, Text } from "@chakra-ui/react";
import "./DetailStats.css";

const DetailStats = ({ stats }) => {
  return (
    <div>
      {stats.map(({ base_stat, stat }, i) => (
        <div>
          <span style={{ textTransform: "capitalize" }} key={i}>
            {" "}
            {stat.name}{" "}
          </span>
          <div className="stat-container">
            <Text color="cyan.600">{base_stat}</Text>
            <Progress
              borderRadius="8px"
              colorScheme="cyan"
              max={256}
              value={base_stat}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailStats;
