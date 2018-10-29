/**
 * @file querySearchAutoComplete
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get auto-complete items based on query string.
 * @return {Array} The array of auto-complete items.
 */
const querySearchAutoComplete = gql`
  query SearchAutoComplete($query: String!, $first: Int) {
    searchAutoComplete(query: $query, first: $first) {
      items
    }
  }
`;

export default querySearchAutoComplete;
