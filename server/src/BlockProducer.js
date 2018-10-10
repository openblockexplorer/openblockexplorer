/**
 * @file BlockProducer
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const sha3_256 = require('js-sha3').sha3_256;
const Constants = require('./constants');
const getRandomInt = require('./utils/getRandomInt');
const getRandomNumber = require('./utils/getRandomNumber');

/**
 * Provides a simulation of the DFINITY network.
 */
module.exports = class BlockProducer {
  /**
   * Create a BlockProducer object.
   * @param {Object} pubsub The publish/subscribe object.
   * @constructor
   */
  constructor(pubsub) {
    // The publish/subscribe object.
    this.pubsub = pubsub;
    
    // The maximum number of blocks to keep in the blocks[] array.
    this.numBlocksMax = 100;

    // The maximum number of transactions to keep in the transactions[] array.
    this.numTransactionsMax = 100;
    
    // The blocks and transactions arrays.
    this.blocks = [];
    this.transactions = [];

    // The block and transaction IDs.
    this.blockId = 0;
    this.transactionId = 0;

    // The block time.  
    this.blockTimeMs = 3500;

    // The transaction time.
    this.transactionTimeMs = 1000;

    // Starting block height.
    const startDate = new Date(2018, 8, 1);
    const todayDate = new Date();
    const elapsedMs = todayDate.getTime() - startDate.getTime();
    this.blockHeight = Math.floor(elapsedMs / this.blockTimeMs);

    // Add initial blocks/transactions.
    this.addInitialBlocksTransactions();
        
    // Add new blocks and transactions using intervals.
    setInterval(() => { this.addNewBlock() }, this.blockTimeMs);
    setInterval(() => { this.addNewTransaction() }, this.transactionTimeMs);
  }

  /**
   * Add initial blocks/transactions.
   * @public
   */
  addInitialBlocksTransactions() {
    for (let i = 0; i < 10; i++) {
      this.addNewBlock();
      this.addNewTransaction();
    }
  }

  /**
   * Add a new block to the blocks[] array.
   * @private
   */
  addNewBlock() {
    const date = new Date();
    const numTransactions = 0 + getRandomInt(0, 12);
    const block = {
      id: `block_${this.blockId++}`,
      height: this.blockHeight++,
      timestamp: date.getTime().toString(),
      numTransactions: numTransactions
    };

    this.addBlock(block);
  }

  /**
   * Add the specified block to the blocks[] array.
   * @param {Object} block The Block object to add.
   * @private
   */
  addBlock(block) {
    // Add the new block to the front of the blocks[] array, keeping at most numBlocksMax blocks.
    this.blocks.unshift(block);
    this.blocks = this.blocks.slice(0, this.numBlocksMax);

    // Publish the events to subscribers.
    this.pubsub.publish(Constants.PUBSUB_CHANNEL_NEW_BLOCK, { newBlock: block });
    this.pubsub.publish(Constants.PUBSUB_CHANNEL_BLOCKS, { blocks: this.blocks });
  }

  /**
   * Add a new transaction to the transactions[] array.
   * @private
   */
  addNewTransaction() {                    
    const hash = sha3_256(getRandomInt(0, Number.MAX_SAFE_INTEGER).toString());
    const amount = getRandomNumber(1, getRandomNumber(0, 1) > 0.5 ? 1000 : 100);
    const transaction = {
      id: `transaction_${this.transactionId++}`,
      hash: hash,
      amount: amount
    };

    this.addTransaction(transaction);
  }

  /**
   * Add the specified transaction to the transactions[] array.
   * @param {Object} transaction The Transaction object to add.
   * @private
   */
  addTransaction(transaction) {
    // Add the new transaction to the front of the transactions[] array, keeping at most
    // numTransactionsMax transactions.
    this.transactions.unshift(transaction);
    this.transactions = this.transactions.slice(0, this.numTransactionsMax);

    // Publish the events to subscribers.
    this.pubsub.publish(Constants.PUBSUB_CHANNEL_NEW_TRANSACTION, { newTransaction: transaction });
    this.pubsub.publish(Constants.PUBSUB_CHANNEL_TRANSACTIONS, { transactions: this.transactions });
  }
};
