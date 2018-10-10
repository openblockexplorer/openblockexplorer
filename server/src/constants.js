/**
 * @file constants
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const Constants = Object.freeze({
  PUBSUB_CHANNEL_NEW_BLOCK: 'channel_new_block',
  PUBSUB_CHANNEL_NEW_TRANSACTION: 'channel_new_transaction',
  PUBSUB_CHANNEL_BLOCKS: 'channel_blocks',
  PUBSUB_CHANNEL_TRANSACTIONS: 'channel_transactions'
});

module.exports = Constants;
