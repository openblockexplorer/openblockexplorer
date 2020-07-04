/**
 * @file queryPrice
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get the the current price.
 * @return {Object} The current Price object.
 */
const queryPrice = gql`
  {
    price {
      id
      price
    }
  }
`;

export default queryPrice;
