import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import "./index.css";

import App from "./App";

// Your GraphQL Endpoint here
const client = new ApolloClient({
  uri: "https://tennis-scores-tk.herokuapp.com/v1/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
