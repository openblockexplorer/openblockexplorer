/**
 * @file querySearch
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to perform a search.
 * @param {String} query The query string to search for.
 * @return {Object} The Block or Transaction object which matches the specified query.
 */
const querySearch = gql`
  query Search($query: String!) {
    search(query: $query) {
      ... on Block {
        id
        height
        timestamp
        numTransactions
      }
      ... on Transaction {
        id
        hash
        amount
      }
    }
  }
`;

export default querySearch;
