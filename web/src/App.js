/**
 * @file App
 * @copyright Copyright (c) 2018-2019 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import ReactGA from 'react-ga';
import styled, { ThemeProvider } from 'styled-components';
import { loadCSS } from 'fg-loadcss';
import {
  Grid
} from '@material-ui/core';
import { duration, easing } from '@material-ui/core/styles/transitions';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import { GlobalStyle, themeLight, themeDark } from './theme/globalStyle';
import HomePage from './Components/HomePage/HomePage';
import AccountsPage from './Components/AccountsPage/AccountsPage';
import BlocksPage from './Components/BlocksPage/BlocksPage';
import BlockDetailsPage from './Components/BlockDetailsPage/BlockDetailsPage';
import TransactionsPage from './Components/TransactionsPage/TransactionsPage';
import TransactionDetailsPage from './Components/TransactionDetailsPage/TransactionDetailsPage';
import CanistersPage from './Components/CanistersPage/CanistersPage';
import AboutPage from './Components/AboutPage/AboutPage';
import SearchPage from './Components/SearchPage/SearchPage';
import DEAppBar from './Components/DEAppBar/DEAppBar';
import Footer from './Components/Footer/Footer';
import Constants from './constants';
import { Breakpoints, getBreakpoint, isBreakpointGreaterOrEqualTo } from './utils/breakpoint';

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

// Initialize the react-ga library. We do not need user consent to be GDPR compliant. According to
// Google: "When using Google Analytics Advertising Features, you must also comply with the European
// Union User Consent Policy." Advertising Features are not enabled for DFINITY Explorer. Under the
// GDPR, an IP address is considered Personally Identifiable Information (PII), so we anonymize the
// IP addresses sent to Google Analytics
ReactGA.initialize(Constants.GOOGLE_ANALYTICS_TRACKING_ID);
ReactGA.set({ anonymizeIp: true });

const ContentDiv = styled.div`
  && {
    margin-left: ${props => props.isDesktopDrawerOpen ? Constants.DRAWER_WIDTH + 'px' : '0px'};
    transition: ${props =>
      'margin-left ' +
      (props.isDesktopDrawerOpen ? duration.enteringScreen : duration.leavingScreen) +
      'ms ' +
      easing.easeInOut};
  }
`;

const ContentGrid = styled(Grid)`
  && {
    /* The height of the body + footer is the total viewport height - App Bar height. */
    min-height: calc(100vh - ${props => props.appbarheight + 'px'});
`;

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
    this.state = {
      routerRef: null,
      appBarHeight: 0,
      isDesktopDrawerEnabled: true,
      isMobileDrawerOpen: false,
      isThemeDark: true
    };

    // Bind to make 'this' work in callbacks.
    this.setRouterRef = this.setRouterRef.bind(this);
    this.handleAppBarResize = this.handleAppBarResize.bind(this);
    this.handleDesktopDrawerMenuClick = this.handleDesktopDrawerMenuClick.bind(this);
    this.handleMobileDrawerMenuClick = this.handleMobileDrawerMenuClick.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }
  
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    // Load fonts.
    loadCSS(
      Constants.URI_CDN_GOOGLE_FONTS,
      document.querySelector('#insertion-point-jss')
    );
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const {
      appBarHeight,
      isDesktopDrawerEnabled,
      isMobileDrawerOpen,
      isThemeDark,
      routerRef
    } = this.state;

    // It seems like the >= MD logic here should be kept in one place. It's also in DEAppBar!!!
    // Can't I somehow make this cleaner?!!!
    const isDesktopDrawerOpen =
      isDesktopDrawerEnabled && isBreakpointGreaterOrEqualTo(Breakpoints.MD);
    const breakpoint = getBreakpoint(isDesktopDrawerOpen);

    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyle theme={this.getTheme()} />
        <ThemeProvider theme={this.getTheme()}>
          <HashRouter ref={this.setRouterRef}>
            <div>
              <DEAppBar
                handleAppBarResize={this.handleAppBarResize}
                handleDesktopDrawerMenuClick={this.handleDesktopDrawerMenuClick}
                handleMobileDrawerMenuClick={this.handleMobileDrawerMenuClick}
                isDesktopDrawerOpen={isDesktopDrawerOpen}
                isMobileDrawerOpen={isMobileDrawerOpen}
                routerRef={routerRef}
              />
              <ContentDiv
                isDesktopDrawerOpen={isDesktopDrawerOpen}
                isMobileDrawerOpen={isMobileDrawerOpen}
                /* Workaround to force react-parallax to update when drawer opens/closes. Perhaps */
                /* file an issue with react-parallax that Parallax does not update when */
                /* margin-left changes. */
                onTransitionEnd={() => window.dispatchEvent(new Event('resize'))}
              >
                <ContentGrid
                  container
                  direction='column'
                  justify='space-between'
                  appbarheight={appBarHeight}
                >                 
                  <Route
                    exact path='/'
                    render={(props) => 
                      <HomePage
                        {...props}
                        breakpoint={breakpoint}
                      />
                    }
                  />
                  <Route exact path="/blocks" component={BlocksPage} />                 
                  <Route exact path="/txs" component={TransactionsPage} />            
                  <Route exact path="/accounts" component={AccountsPage} />                  
                  <Route exact path="/canisters" component={CanistersPage} />
                  <Route
                    exact path='/about'
                    render={(props) => 
                      <AboutPage
                        {...props}
                        breakpoint={breakpoint}
                        isDesktopDrawerOpen={isDesktopDrawerOpen}
                        isThemeDark={isThemeDark}
                      />
                    }
                  />
                  <Route
                    exact path='/block/:height'
                    render={(props) => 
                      <BlockDetailsPage
                        {...props}
                        breakpoint={breakpoint}
                      />
                    }
                  />
                  <Route
                    exact path="/tx/:hash"
                    render={(props) => 
                      <TransactionDetailsPage
                        {...props}
                        breakpoint={breakpoint}
                      />
                    }
                  />
                  <Route exact path="/search/:query" component={SearchPage} />
                  <Footer                  
                    handleThemeChange={this.handleThemeChange}
                    isThemeDark={isThemeDark}
                  />
                </ContentGrid>
              </ContentDiv>
            </div>
          </HashRouter>
        </ThemeProvider>
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
   * Callback fired when the App Bar is resized.
   * @private
   */
  handleAppBarResize(height) {
    this.setState({
      appBarHeight: height
    });
  }

  /**
   * Callback fired when the desktop drawer (large screens) menu button is clicked.
   * @private
   */
  handleDesktopDrawerMenuClick(contentRect) {
    this.setState({
      isDesktopDrawerEnabled: !this.state.isDesktopDrawerEnabled
    });
  }

  /**
   * Callback fired when the mobile drawer (small screens) menu button is clicked.
   * @private
   */
  handleMobileDrawerMenuClick(contentRect) {
    this.setState({
      isMobileDrawerOpen: !this.state.isMobileDrawerOpen
    });
  }

  /**
   * Callback fired when the value of the Footer component theme checkbox changes.
   * @param {Object} event The event source of the callback.
   * @param {Number} checked The checked value of the switch.
   * @public
   */
  handleThemeChange(event, checked) {
    this.setState({
      isThemeDark: checked
    });
  }

  /**
   * Return the current theme.
   * @return {Object} The current theme.
   * @private
   */
  getTheme() {
    return this.state.isThemeDark ? themeDark : themeLight;
  }
}

export default App;
