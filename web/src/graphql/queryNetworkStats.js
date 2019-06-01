/**
 * @file queryNetworkStats
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
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
      secondsPerBlock
      transactionsPerSecond
    }
  }
`;

export default queryNetworkStats;
