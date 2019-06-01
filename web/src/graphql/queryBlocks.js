/**
 * @file queryBlocks
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get blocks.
 * @return {Array} The array of Block objects.
 */
const queryBlocks = gql`
  query Blocks($first: Int) {
    blocks(first: $first, orderBy: height_DESC) {
      id
      height
      timestamp
      numTransactions
    }
  }
`;

export default queryBlocks;
