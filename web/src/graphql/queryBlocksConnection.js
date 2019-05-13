/**
 * @file queryBlocksConnection
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL Relay-compliant connection query to get a BlockConnection object.
 * @return {Object} The BlockConnection object.
 */
const queryBlocksConnection = gql`
  query BlocksConnection(
    $where: BlockWhereInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int,
    $withCount: Boolean!) {
    blocksConnection(
      where: $where, orderBy: height_DESC, skip: $skip, after: $after, before: $before,
      first: $first, last: $last) {
      edges {
        node {
          id
          height
          timestamp
          numTransactions
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
    # Use @include directive to conditionally query the total count of blocks.
    total: blocksConnection @include(if: $withCount) {
      aggregate {
        count
      }
    }
  }
`;

export default queryBlocksConnection;
