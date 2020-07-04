/**
 * @file queryTransactionsConnection
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL Relay-compliant connection query to get a TransactionsConnection object.
 * @return {Object} The TransactionsConnection object.
 */
const queryTransactionsConnection = gql`
  query TransactionsConnection(
    $where: TransactionWhereInput, $skip: Int, $after: String, $before: String, $first: Int,
    $last: Int) {
    transactionsConnection(
      where: $where, orderBy: createdAt_DESC, skip: $skip, after: $after, before: $before,
      first: $first, last: $last) {
      edges {
        node {
          id
          hash
          amount
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`;

export default queryTransactionsConnection;
