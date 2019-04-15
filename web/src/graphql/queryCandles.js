/**
 * @file queryCandles
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import gql from 'graphql-tag'

/**
 * GraphQL query to get DFN OHLCV candles for the specified date range.
 * @return {Array} The array of Candle objects.
 */
const queryCandles = gql`
  query Candles($start: DateTime!, $end: DateTime!) {
    candles(start: $start, end: $end) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`;

export default queryCandles;
