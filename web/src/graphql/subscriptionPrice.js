/**
 * @file subscriptionPrice
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
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
        price
      }
    }
  }
`;

export default subscriptionPrice;
