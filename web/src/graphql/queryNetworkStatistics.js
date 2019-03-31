/**
 * @file queryNetworkStatistics
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get the current NetworkStatistics object.
 * @return {Number} The current NetworkStatistics object.
 */
const queryNetworkStatistics = gql`
  {
    networkStatistics {
      secondsPerBlock
      transactionsPerSecond
    }
  }
`;

export default queryNetworkStatistics;
