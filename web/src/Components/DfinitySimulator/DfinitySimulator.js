/**
 * @file DfinitySimulator
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
import React from 'react';
import * as d3 from 'd3';
import { sha3_256 } from 'js-sha3';
import Block from '../../lib/block';
import Transaction from '../../lib/transaction';
import getRandomInt from '../../utils/getRandomInt';
import getRandomNumber from '../../utils/getRandomNumber';

/**
 * Provides a simulation of the DFINITY network.
 */
class DfinitySimulator extends React.Component {
  /**
   * Create a DfinitySimulator object.
   * @constructor
   */
  constructor(props) {
    super(props);

    // The block time.  
    this.blockTimeMs = 3500;

    // The transaction time.
    this.transactionTimeMs = 1000;

    // Starting block height.
    const startDate = new Date(2018, 8, 1);
    const todayDate = new Date();
    const elapsedMs = todayDate.getTime() - startDate.getTime();
    this.blockHeight = (elapsedMs / this.blockTimeMs).toFixed();
        
    // Add new blocks and transactions using d3 intervals.
    d3.interval((elapsed) => { this.addNewBlock() }, this.blockTimeMs);
    d3.interval((elapsed) => { this.addNewTransaction() }, this.transactionTimeMs);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return null;
  }

  /**
   * Add initial blocks/transactions.
   * @public
   */
  addInitialBlocksTransactions() {
    for (let i = 0; i < 10; i++) {
      this.addNewBlock(0);
      this.addNewTransaction();
    }
  }

  /**
   * Add a new block by calling props.addNewBlockCallback().
   * @private
   */
  addNewBlock() {
    const { addNewBlockCallback } = this.props;
    const date = new Date();
    const numTransactions = 0 + getRandomInt(0, 12);
    const block = new Block(this.blockHeight++, date, numTransactions);
    addNewBlockCallback(block);
  }

  /**
   * Add a new transaction by calling props.addNewTransactionCallback().
   * @private
   */
  addNewTransaction() {                    
    const { addNewTransactionCallback } = this.props;
    const hash = sha3_256(getRandomInt(0, Number.MAX_SAFE_INTEGER).toString());
    const amount = getRandomNumber(1, getRandomNumber(0, 1) > 0.5 ? 1000 : 100);
    const transaction = new Transaction(hash, amount);
    addNewTransactionCallback(transaction);
  }
};

export default DfinitySimulator;
