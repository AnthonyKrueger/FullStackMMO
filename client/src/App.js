// Style Imports

import "./styles/main.scss"

// React Imports

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// MUI Imports

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';


// Apollo Imports

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';

// Page Imports
import Header from "./components/Header";

import Splash from "./pages/Splash"
import { red } from "@mui/material/colors";

// MUI Theme Settings

let theme = createTheme({
  palette: {
    primary: red
  }
})

theme = responsiveFontSizes(theme);

// Apollo Client Set Up

const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

    // Auth / Context Set Up

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
    <Header />
      <Router>
        <div className="font-main tracking-wide">
          <Switch>
            <Route exact path='/' component={Splash} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
