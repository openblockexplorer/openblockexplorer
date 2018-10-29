/**
 * @file Home
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from 'react';
import styled from 'styled-components';
import { loadCSS } from 'fg-loadcss';
import { Grid } from '@material-ui/core';
import DfinitySymbolD3 from './Components/DfinitySymbolD3/DfinitySymbolD3';
import BlocksTable from './Components/BlocksTable/BlocksTable';
import TransactionsTable from './Components/TransactionsTable/TransactionsTable';
import ResponsiveComponent from './Components/ResponsiveComponent/ResponsiveComponent'
import Constants from './constants';

const HomeDiv = styled.div`
  && {
    margin-bottom: ${Constants.FOOTER_HEIGHT + 'px'};
  }
`;

const DfinitySymbolD3Grid = styled(Grid)`
  && {
    margin: -40px;
    @media (max-width: ${Constants.BREAKPOINT_MD + 'px'}) {
      margin-top: 5px;
      margin-bottom: -30px;
    }
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      margin-top: 30px;
      margin-bottom: -20px;
    }
  }
`;

const ContentGrid = styled(Grid)`
  && {
    max-width: ${Constants.BREAKPOINT_LG_MAX_WIDTH + 'px'};
`;

const BlocksTableGrid = styled(Grid)`
  && {
    padding-right: 24px;
    padding-left: 8px;
    @media (max-width: ${Constants.BREAKPOINT_MD + 'px'}) {
      padding-top: 0px;
      padding-bottom: 4px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;

const TransactionsTableGrid = styled(Grid)`
  && {
    padding-left: 24px;
    padding-right: 8px;
    @media (max-width: ${Constants.BREAKPOINT_MD + 'px'}) {
      padding-top: 4px;
      padding-bottom: 0px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;

/**
 * Component for the Home page.
 */
class Home extends ResponsiveComponent {
  /**
   * Create a Home object.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {dfinitySymbolD3Ref: null};

    // Bind to make 'this' work in callbacks.
    this.setDfinitySymbolD3Ref = this.setDfinitySymbolD3Ref.bind(this);
  }
  
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    super.componentDidMount();

    this.isComponentMounted = true;

    // Load fonts.
    loadCSS(
      Constants.URI_CDN_GOOGLE_FONTS,
      document.querySelector('#insertion-point-jss')
    );
  }

  /**
   * Invoked by React immediately before a component is unmounted and destroyed.
   * @public
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.isComponentMounted = false;
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <HomeDiv>
        <Grid container alignItems='center' direction='column' justify='center'>
          <DfinitySymbolD3Grid item>
            <DfinitySymbolD3 width={this.getDfinitySymbolD3Width()} ref={this.setDfinitySymbolD3Ref} />
          </DfinitySymbolD3Grid>
          <ContentGrid container>
            <Grid container alignItems='flex-start' justify='center'>
              <BlocksTableGrid item xs={12} md={6}>
                <BlocksTable
                  maxRows='8'
                  dfinitySymbolD3Ref={this.state.dfinitySymbolD3Ref}
                  appBarRef={this.props.appBarRef}
                  routerRef={this.props.routerRef}
                />
              </BlocksTableGrid>
              <TransactionsTableGrid item xs={12} md={6}>
                <TransactionsTable maxRows='8' routerRef={this.props.routerRef} />
              </TransactionsTableGrid>
            </Grid>
          </ContentGrid>
        </Grid>
      </HomeDiv>
    );
  }

  /**
   * Return the width of the DfinitySymbolD3 component based on the current breakpoint.
   * @return The width of the DfinitySymbolD3 component based on the current breakpoint.
   * @private
   */
  getDfinitySymbolD3Width() {
    if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches)
      return 320; // iPhone 4 width, modern phones are larger
    else if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_MD + 'px)').matches)
      return Constants.BREAKPOINT_SM;
    else
      return 0;
  }

  /**
   * Set a reference to the DfinitySymbolD3 element.
   * @public
   */
  setDfinitySymbolD3Ref(element) {
    this.setState({ dfinitySymbolD3Ref: element });
  };
}

export default Home;
