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

// Redux

import { Provider } from 'react-redux';
import store from "./store"

// Page Imports

import Splash from "./pages/Splash"
import SignUp from "./pages/SignUp"
import LoginPage from "./pages/Login"
import HomePage from "./pages/Home"

// MUI Theme Settings

let theme = createTheme({
  palette: {
    primary: {
      main: "#780000"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
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

const token = localStorage.getItem('id_token');
if(token != null) {
  console.log(token)
}
const authLink = setContext((_, { headers }) => {
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
      <Router>
      <Provider store={store}>
          <Switch>
            <Route exact path='/splash' component={Splash} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={LoginPage} />
            <Route path='/' component={HomePage} />
          </Switch>
      </Provider>
      </Router>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
