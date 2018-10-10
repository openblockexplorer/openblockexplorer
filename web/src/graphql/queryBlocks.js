/**
 * @file queryBlocks
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get blocks.
 * @return {Array} The array of Block objects.
 */
const queryBlocks = gql`
  query Blocks($first: Int) {
    blocks(first: $first) {
      id
      height
      timestamp
      numTransactions
    }
  }
`;

export default queryBlocks;
