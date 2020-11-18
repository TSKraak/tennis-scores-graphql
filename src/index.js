import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
// Remove the apollo-boost import and change to this:
import ApolloClient from "apollo-client";
// Setup the network "links"
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./index.css";

import App from "./App";

// // Your GraphQL Endpoint here
// const client = new ApolloClient({
//   uri: "https://tennis-scores-tk.herokuapp.com/v1/graphql",
// });

const httpLink = new HttpLink({
  uri: "https://tennis-scores-tk.herokuapp.com/v1/graphql", // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://tennis-scores-tk.herokuapp.com/v1/graphql", // use wss for a secure endpoint
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
