/**
 * @file queryTransaction
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get a transaction.
 * @param {String} id The hash of the transaction to fetch.
 * @return {Object} The Transaction object with the specified hash.
 */
const queryTransaction = gql`
  query Transaction($hash: String!) {
    transaction(hash: $hash) {
      id
      hash
      amount
      block {
        id
        height
      }
    }
  }
`;

export default queryTransaction;
