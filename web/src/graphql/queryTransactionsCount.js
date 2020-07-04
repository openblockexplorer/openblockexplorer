/**
 * @file queryTransactionsCount
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get total count of transactions.
 * @return {Object} The total count of transactions.
 */
const queryTransactionsCount = gql`
  query TransactionsConnection($where: TransactionWhereInput) {
    transactionsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export default queryTransactionsCount;
