/**
 * @file App
 * @copyright Copyright (c) 2018 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import Home from './Home';
import AccountsPage from './AccountsPage';
import BlocksPage from './BlocksPage';
import BlockDetailsPage from './Components/BlockDetailsPage/BlockDetailsPage';
import ContractsPage from './ContractsPage';
import TransactionsPage from './TransactionsPage';
import TransactionDetailsPage from './Components/TransactionDetailsPage/TransactionDetailsPage';
import SearchPage from './Components/SearchPage/SearchPage';
import DEAppBar from './Components/DEAppBar/DEAppBar';
import Footer from './Components/Footer/Footer';
import Constants from './constants';

// Create an http link.
const httpLink = new HttpLink({
  uri: Constants.URI_SERVER_HTTP
});

// Create a WebSocketLink that represents the WebSocket connection. 
const wsLink = new WebSocketLink({
  uri: Constants.URI_SERVER_WEB_SOCKETS,
  options: {
    reconnect: true
  }
});

// Using the ability to split links, you can send data to each link depending on what kind of
// operation is being sent.
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink, // for subscription
  httpLink // for query or mutation
);

// Create Apollo client.
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    // Tell Apollo to use the unique identifier object.id when normalizing the data in the store.
    // This allows Apollo to automatically re-render the UI when objects change as the result of
    // mutations. Using object.id only works when every object.id in the application is unique.
    // For this to work in the app, every GraphQL query must ask for the ID of every record.
    dataIdFromObject: object => object.id
  })
});

/**
 * Top-level component of the app.
 */
class App extends Component {
  /**
   * Create an App object.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {routerRef: null, appBarRef: null};

    // Bind to make 'this' work in callbacks.
    this.setRouterRef = this.setRouterRef.bind(this);
    this.setAppBarRef = this.setAppBarRef.bind(this);
  }
  
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <HashRouter ref={this.setRouterRef}>    
          <div>
            <DEAppBar ref={this.setAppBarRef} useDfinitySymbolD3 routerRef={this.state.routerRef} />
            <div className="content">
              <Route exact path='/'
                render={(props) => <Home {...props} appBarRef={this.state.appBarRef} />}
              />
              <Route exact path="/accounts" component={AccountsPage}/>
              <Route exact path="/blocks" component={BlocksPage}/>
              <Route exact path="/contracts" component={ContractsPage}/>
              <Route exact path="/txs" component={TransactionsPage}/>
              <Route exact path="/block/:height" component={BlockDetailsPage}/>
              <Route exact path="/tx/:hash" component={TransactionDetailsPage}/>
              <Route exact path="/search/:query" component={SearchPage}/>
            </div>
            <Footer />
          </div>
        </HashRouter>
      </ApolloProvider>
    );
  }

  /**
   * Set a reference to the HashRouter element.
   * @public
   */
  setRouterRef(element) {
    this.setState({ routerRef: element });
  };

  /**
   * Set a reference to the DEAppBar element.
   * @public
   */
  setAppBarRef(element) {
    this.setState({ appBarRef: element });
  };
}

export default App;
