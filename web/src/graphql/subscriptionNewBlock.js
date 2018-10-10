/**
 * @file subscriptionNewBlock
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive a new block.
 * @return {Object} The new Block object.
 */
const subscriptionNewBlock = gql`
  subscription {
    newBlock {
      id
      height
      timestamp
      numTransactions
    }
  }
`;

export default subscriptionNewBlock;
