/**
 * @file subscriptionNetworkStatistics
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL subscription to receive a new NetworkStatistics object.
 * @return {Object} The new NetworkStatistics object.
 */
const subscriptionNetworkStatistics = gql`
  subscription {
    networkStatistics {
      node {
        secondsPerBlock
        transactionsPerSecond
      }
    }
  }
`;

export default subscriptionNetworkStatistics;
