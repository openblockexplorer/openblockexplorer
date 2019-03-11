/**
 * @file queryBlock
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get a block.
 * @param {Number} height The height of the block to fetch.
 * @return {Object} The Block object with the specified height.
 */
const queryBlock = gql`
  query Block($height: Int!) {
    block(height: $height) {
      id
      height
      timestamp
      numTransactions
      transactions {
        id
        hash
        amount
      }
    }
  }
`;

export default queryBlock;
