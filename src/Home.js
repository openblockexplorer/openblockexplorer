/**
 * @file Home
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from 'react';
import styled from 'styled-components';
import { loadCSS } from 'fg-loadcss';
import { Grid } from '@material-ui/core';
import DfinitySimulator from './Components/DfinitySimulator/DfinitySimulator';
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
 * Top-level component of the app.
 */
class Home extends ResponsiveComponent {
  /**
   * Create a DfinitySymbolD3 object.
   * @constructor
   */
  constructor(props) {
    super(props);

    // The maximum number of blocks to keep in the blocks[] array.
    this.numBlocksMax = 100;

    // The maximum number of transactions to keep in the transactions[] array.
    this.numTransactionsMax = 100;

    // The blocks[] and transactions[] arrays are kept in properties and also in the state, since
    // modifying an array property is more reliable than attempting to modify an array using
    // setState().
    this.blocks = [];
    this.transactions = [];
    this.state = {blocks: this.blocks, transactions: this.transactions};

    // Bind to make 'this' work in callbacks.
    this.addNewBlock = this.addNewBlock.bind(this);
    this.addNewTransaction = this.addNewTransaction.bind(this);
    this.setDfinitySimulatorRef = this.setDfinitySimulatorRef.bind(this);
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

    // Add initial blocks/transactions.
    if (this.dfinitySimulatorRef)
      this.dfinitySimulatorRef.addInitialBlocksTransactions();
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
        <DfinitySimulator
          addNewBlockCallback={this.addNewBlock}
          addNewTransactionCallback={this.addNewTransaction}
          ref={this.setDfinitySimulatorRef}
        />
        <Grid container alignItems='center' direction='column' justify='center'>
          <DfinitySymbolD3Grid item>
            <DfinitySymbolD3 width={this.getDfinitySymbolD3Width()} ref={this.setDfinitySymbolD3Ref} />
          </DfinitySymbolD3Grid>
          <ContentGrid container>
            <Grid container alignItems='flex-start' justify='center'>
              <BlocksTableGrid item xs={12} md={6}>
                <BlocksTable blocks={this.state.blocks} maxRows='8' />
              </BlocksTableGrid>
              <TransactionsTableGrid item xs={12} md={6}>
                <TransactionsTable transactions={this.state.transactions} maxRows='8' />
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
   * Add a new block.
   * @param {Block} block The block to add.
   * @private
   */
  addNewBlock(block) {
    // Add the new block to the front of the blocks[] array, keeping at most numBlocksMax blocks.
    this.blocks.unshift(block);
    this.blocks = this.blocks.slice(0, this.numBlocksMax);
    if (this.isComponentMounted)
      this.setState({blocks: this.blocks})

    // Add a new block to the DFINITY logo infinity symbol.
    if (this.dfinitySymbolD3Ref)
      this.dfinitySymbolD3Ref.addNewBlock();
  }

  /**
   * Add a new transaction.
   * @param {Transaction} transaction The transaction to add.
   * @private
   */
  addNewTransaction(transaction) {
    // Add the new transaction to the front of the transactions[] array, keeping at most
    // numTransactionsMax transactions.
    this.transactions.unshift(transaction);
    this.transactions = this.transactions.slice(0, this.numTransactionsMax);
    if (this.isComponentMounted)
      this.setState({transactions: this.transactions})
  }

  /**
   * Set a reference to the DfinitySimulator element.
   * @public
   */
  setDfinitySimulatorRef(element) {
    this.dfinitySimulatorRef = element;
  };
  
  /**
   * Set a reference to the DfinitySymbolD3 element.
   * @public
   */
  setDfinitySymbolD3Ref(element) {
    this.dfinitySymbolD3Ref = element;
  };
}

export default Home;
