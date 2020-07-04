/**
 * @file subscriptionTransaction
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL subscription to receive a new transaction.
 * @return {Object} The new Transaction object.
 */
const subscriptionTransaction = gql`
  subscription {
    transaction {
      node {
        id
        hash
        amount
      }
    }
  }
`;

export default subscriptionTransaction;
