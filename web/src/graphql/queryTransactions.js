/**
 * @file queryTransactions
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get transactions.
 * @return {Array} The array of Transaction objects.
 */
const queryTransactions = gql`
  query Transactions($first: Int) {
    transactions(first: $first, orderBy: createdAt_DESC) {
      id
      hash
      amount
    }
  }
`;

export default queryTransactions;
