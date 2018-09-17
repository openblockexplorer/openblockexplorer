/**
 * @file App
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
import React, { Component, Fragment } from 'react';
import { loadCSS } from 'fg-loadcss';
import { Grid } from '@material-ui/core';
import DfinitySimulator from '../DfinitySimulator/DfinitySimulator';
import DEAppBar from '../DEAppBar/DEAppBar';
import DfinitySymbolD3 from '../DfinitySymbolD3/DfinitySymbolD3';
import BlocksTable from '../BlocksTable/BlocksTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import Footer from '../Footer/Footer';

/**
 * Top-level component of the app.
 */
class App extends Component {
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
    // Load fonts.
    loadCSS(
      'https://fonts.googleapis.com/css?family=Istok+Web|Nunito+Sans',
      document.querySelector('#insertion-point-jss'),
    );

    // Add initial blocks/transactions.
    if (this.dfinitySimulatorRef)
      this.dfinitySimulatorRef.addInitialBlocksTransactions();
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <Fragment>
        <DfinitySimulator
          addNewBlockCallback={this.addNewBlock}
          addNewTransactionCallback={this.addNewTransaction}
          ref={this.setDfinitySimulatorRef}
        />
        <DEAppBar />
        <Grid container justify='center'>
          <Grid item style={{margin: '-40px'}}>
            <DfinitySymbolD3  ref={this.setDfinitySymbolD3Ref} />
          </Grid>
          <Grid container style={{width: '1140px'}}>
            <Grid container alignItems='flex-start' justify='space-between'>
              <Grid item style={{width: '48%'}}>
                  <BlocksTable blocks={this.state.blocks} maxRows='8' />
              </Grid>
              <Grid item style={{width: '48%'}}>
                  <TransactionsTable transactions={this.state.transactions} maxRows='8' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Fragment>
    );
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

export default App;
