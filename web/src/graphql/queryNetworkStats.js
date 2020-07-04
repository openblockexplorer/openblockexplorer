/**
 * @file queryNetworkStats
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get the current NetworkStats object.
 * @return {Number} The current NetworkStats object.
 */
const queryNetworkStats = gql`
  {
    networkStats {
      id
      secondsPerBlock
      transactionsPerSecond
    }
  }
`;

export default queryNetworkStats;
