/**
 * @file subscriptionNetworkStats
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL subscription to receive a NetworkStats updates.
 * @return {Object} The updated NetworkStats object.
 */
const subscriptionNetworkStats = gql`
  subscription {
    networkStats {
      node {
        secondsPerBlock
        transactionsPerSecond
      }
    }
  }
`;

export default subscriptionNetworkStats;
