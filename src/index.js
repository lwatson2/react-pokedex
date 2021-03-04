import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    colors: {
      cyanBG: {
        100: "hsl(209, 18%, 30%)",
      },
    },
  })

ReactDOM.render(<ChakraProvider theme={theme}><App /></ChakraProvider>, document.getElementById('root'));
