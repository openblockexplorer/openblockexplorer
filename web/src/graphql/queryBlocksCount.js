/**
 * @file queryBlocksCount
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get total count of blocks.
 * @return {Object} The total count of blocks.
 */
const queryBlocksCount = gql`
  query BlocksConnection($where: BlockWhereInput) {
    blocksConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export default queryBlocksCount;
