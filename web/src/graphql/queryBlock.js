/**
 * @file queryBlock
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get a block.
 * @param {ID} id The ID of the block to fetch.
 * @return {Object} The Block object with the specified ID.
 */
const queryBlock = gql`
  query Block($id: ID!) {
    block(id: $id) {
      id
      height
      timestamp
      numTransactions
    }
  }
`;

export default queryBlock;
