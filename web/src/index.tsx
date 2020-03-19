import React  from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {Routes} from "./Routes";
import {ApolloProvider} from "@apollo/react-hooks"
import './index.scss'

const Client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={Client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
