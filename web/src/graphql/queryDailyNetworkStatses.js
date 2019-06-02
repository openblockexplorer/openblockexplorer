/**
 * @file queryDailyNetworkStatses
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag';

/**
 * GraphQL query to get daily DFINITY network stats for the specified number of days.
 * @return {Array} The array of DailyNetworkStats objects.
 */
const queryDailyNetworkStatses = gql`
  query DailyNetworkStatses($last: Int, $skip: Int) {
    dailyNetworkStatses(last: $last, skip: $skip, orderBy: date_ASC) {
      id
      date
      numBlocks
      numTransactions
    }
  }
`;

export default queryDailyNetworkStatses;
