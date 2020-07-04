/**
 * @file subscriptionPrice
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL subscription to receive price updates.
 * @return {Object} The updated Price object.
 */
const subscriptionPrice = gql`
  subscription {
    price {
      node {
        id
        price
      }
    }
  }
`;

export default subscriptionPrice;
