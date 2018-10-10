/**
 * @file subscriptionNewTransaction
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive a new transaction.
 * @return {Object} The new Transaction object.
 */
const subscriptionNewTransaction = gql`
  subscription {
    newTransaction {
      id
      hash
      amount
    }
  }
`;

export default subscriptionNewTransaction;
