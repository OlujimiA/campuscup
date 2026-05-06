import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const theme = {
  name: 'CampusCupTheme',
  tokens: {
    components: {
      button: {
        primary: {
          backgroundColor: '#6b21a8',
          _hover: {
            backgroundColor: '#581c87',
          },
        },
      },

      tabs: {
        item: {
          color: '#6b21a8',
          _active: {
            borderColor: '#6b21a8',
            color: '#6b21a8',
          },
        },
      },
    },
  },
};

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Authenticator>
        <App/>
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);
