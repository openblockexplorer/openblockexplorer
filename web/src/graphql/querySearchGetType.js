/**
 * @file querySearchGetType
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get type of object being searched for based on query string.
 * @return {String} The type of object being searched for.
 */
const querySearchGetType = gql`
  query SearchGetType($query: String!) {
    searchGetType(query: $query) {
      type
    }
  }
`;

export default querySearchGetType;
