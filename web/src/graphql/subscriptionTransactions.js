/**
 * @file subscriptionTransactions
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive new transactions.
 * @return {Array} The array of Transaction objects.
 */
const subscriptionTransactions = gql`
  subscription {
    transactions {
      id
      hash
      amount
    }
  }
`;

export default subscriptionTransactions;
