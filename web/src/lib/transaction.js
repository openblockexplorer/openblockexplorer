/**
 * @file transaction
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

/**
 * This class represents a transaction.
 */
class Transaction {
  /**
   * Create a Transaction object.
   * @constructor
   * @param {String} hash The hash of the transaction.
   * @param {Number} amount The value transferred for the transaction.
   */
  constructor(hash, amount) {
    this.hash = hash;
    this.amount = amount;
  }
}

export default Transaction;
