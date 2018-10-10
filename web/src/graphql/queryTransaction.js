/**
 * @file queryTransaction
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get a transaction.
 * @param {ID} id The ID of the transaction to fetch.
 * @return {Object} The Transaction object with the specified ID.
 */
const queryTransaction = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
      id
      hash
      amount
    }
  }
`;

export default queryTransaction;
