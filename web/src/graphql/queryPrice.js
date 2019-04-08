/**
 * @file queryPrice
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get the the current price.
 * @return {Object} The current Price object.
 */
const queryPrice = gql`
  {
    price {
      price
    }
  }
`;

export default queryPrice;
