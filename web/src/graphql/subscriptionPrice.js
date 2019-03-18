/**
 * @file subscriptionPrice
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive a new price.
 * @return {Object} The new Price object.
 */
const subscriptionPrice = gql`
  subscription {
    price {
      node {
        timestamp
        price
      }
    }
  }
`;

export default subscriptionPrice;
