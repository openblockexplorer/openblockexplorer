/**
 * @file subscriptionBlocks
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive new blocks.
 * @return {Array} The array of Block objects.
 */
const subscriptionBlocks = gql`
  subscription {
    blocks {
      id
      height
      timestamp
      numTransactions
    }
  }
`;

export default subscriptionBlocks;
