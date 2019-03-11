/**
 * @file block
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

/**
 * This class represents a DFINITY block.
 */
class Block {
  /**
   * Create a Block object.
   * @constructor
   * @param {Number} height The height of the block.
   * @param {Date} date The date the block was minted.
   * @param {Number} numTransactions The number of transactions in the block.
   */
  constructor(height, date, numTransactions) {
    this.height = height;
    this.date = date;
    this.numTransactions = numTransactions;
  }
}

export default Block;
