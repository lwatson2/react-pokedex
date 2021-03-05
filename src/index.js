import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});
const theme = extendTheme({
  colors: {
    cyanBG: {
      100: "hsl(209, 18%, 30%)",
    },
  },
  breakpoints,
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
