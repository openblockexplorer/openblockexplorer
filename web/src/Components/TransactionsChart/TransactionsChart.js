/**
 * @file TransactionsChart
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Query } from "react-apollo";
import AreaChart from '../AreaChart/AreaChart';
import queryDailyNetworkStatses from '../../graphql/queryDailyNetworkStatses';

/**
 * This component displays a number of transactions chart with data retrieved via GraphQL.
 */
class TransactionsChartWithData extends Component {
  static propTypes = {
    /**
     * The height of the chart (not including the title).
     */
    chartHeight: PropTypes.number.isRequired,
    /**
     * The styled-components theme.
     */
    theme: PropTypes.object.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { chartHeight, theme } = this.props;
    return (
      <Query
        query={queryDailyNetworkStatses}
        // Get the last 14 days.
        variables={{ last: 14 }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <TransactionsChart
                dailyNetworkStatses={[]}
                chartHeight={chartHeight}
                theme={theme}
                loading
              />
            );
          }
          else if (error) {
            return (
              <TransactionsChart
                dailyNetworkStatses={[]}
                chartHeight={chartHeight}
                theme={theme}
                error
              />
            );
          }
          else {
            return (
              <TransactionsChart
                dailyNetworkStatses={data.dailyNetworkStatses}
                chartHeight={chartHeight}
                theme={theme}
              />
            );
          }
        }}
      </Query>
    );
  }
}

/**
 * This component displays a table of Transaction objects.
 */
class TransactionsChart extends AreaChart { 
  static propTypes = {
    /**
     * The height of the chart (not including the title).
     */
    chartHeight: PropTypes.number.isRequired,
    /**
     * Array of DailyNetworkStatses objects.
     */
    dailyNetworkStatses: PropTypes.array.isRequired,
    /**
     * Boolean indicating whether an error occurred with the GraphQL query.
     */
    error: PropTypes.bool,
    /**
     * Boolean indicating whether the GraphQL query is in progress.
     */
    loading: PropTypes.bool,
    /**
     * The styled-components theme.
     */
    theme: PropTypes.object.isRequired
  };
  
  /**
   * Return the title of the chart.
   * @return {String} The title of the chart.
   * @protected
   */
  getTitle() {
    const { error } = this.props;
    let title = 'Transaction History';
    if (error)
      title += ' - Network Error'
    return title;
  }

  /**
   * Return an array of objects that describe the chart data.
   * @return {Array} An array of objects that describe the chart data.
   * @protected
   */
  getData() {
    const { dailyNetworkStatses } = this.props;
    return dailyNetworkStatses;
  }

  /**
   * Return the key of the data to be displayed in the x-axis.
   * @return {String} The key of the data to be displayed in the x-axis.
   * @protected
   */
  getDataKeyX() {
    return 'date';
  }

  /**
   * Return the key of the data to be displayed in the y-axis.
   * @return {String} The key of the data to be displayed in the y-axis.
   * @protected
   */
  getDataKeyY() {
    return 'numTransactions';
  }

  /**
   * Return the minimum value of the domain for the Y-axis.
   * @param {dataMin} value The minumum value of the data.
   * @return {String} The minimum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMinY(dataMin) {
    return Math.floor(dataMin / 10000) * 10000;
  }

  /**
   * Return the maximum value of the domain for the Y-axis.
   * @param {dataMax} value The maximum value of the data.
   * @return {String} The maximum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMaxY(dataMax) {
    return Math.ceil(dataMax / 10000) * 10000;
  }

  /**
   * Return a string for the x-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tick label.
   * @protected
   */
  getGetTickX(value) {
    return new Date(value).toLocaleDateString();
  }

  /**
   * Return a string for the y-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tick label.
   * @protected
   */
  getGetTickY(value) {
    if (value >= 1000) {
      const k = value / 1000;
      return k.toFixed(Number.isInteger(k) ? 0 : 1) + 'k';
    }
    else
      return value;
  }

  /**
   * Return a string for the x-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tooltip label.
   * @protected
   */
  getGetTooltipX(value) {
    return new Date(value).toLocaleDateString();
  }

  /**
   * Return a string for the y-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tooltip label.
   * @protected
   */
  getGetTooltipY(value) {
    return `Transactions: ${value.toLocaleString()}`;
  }
}

// Use the withTheme HOC so that we can use the current theme outside styled components.
export default withTheme(TransactionsChartWithData);
