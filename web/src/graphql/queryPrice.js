/**
 * @file queryPrice
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get the current DFN price.
 * @return {Number} The current DFN price.
 */
const queryPrice = gql`
  {
    price {
      timestamp
      price
    }
  }
`;

export default queryPrice;
