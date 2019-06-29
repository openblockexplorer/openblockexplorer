/**
 * @file PriceChart
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Query } from "react-apollo";
import AreaChart from '../AreaChart/AreaChart';
import queryCandles from '../../graphql/queryCandles';

/**
 * This component displays a chart of Candle objects with data retrieved via GraphQL.
 */
class PriceChartWithData extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
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
   * Create a PriceChartWithData object.
   * @constructor
   */
  constructor(props) {
    super(props);
 
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 14);
    this.endDate = new Date();
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { breakpoint, chartHeight, theme } = this.props;
    return (
      <Query
        query={queryCandles}
        variables={{ start: this.startDate.toISOString(), end: this.endDate.toISOString() }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <PriceChart
                candles={[]}
                chartHeight={chartHeight}
                theme={theme}
                loading
                breakpoint={breakpoint}
              />
            );
          }
          else if (error) {
            return (
              <PriceChart
                candles={[]}
                chartHeight={chartHeight}
                theme={theme}
                error
                breakpoint={breakpoint}
              />
            );
          }
          else {
            return (
              <PriceChart
                candles={data.candles}
                chartHeight={chartHeight}
                theme={theme}
                breakpoint={breakpoint}
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
class PriceChart extends AreaChart { 
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * Array of Candle objects.
     */
    candles: PropTypes.array.isRequired,
    /**
     * The height of the chart (not including the title).
     */
    chartHeight: PropTypes.number.isRequired,
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
    let title = 'Price History';
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
    const { candles } = this.props;
    return candles;
  }

  /**
   * Return the key of the data to be displayed in the x-axis.
   * @return {String} The key of the data to be displayed in the x-axis.
   * @protected
   */
  getDataKeyX() {
    return 'timestamp';
  }

  /**
   * Return the key of the data to be displayed in the y-axis.
   * @return {String} The key of the data to be displayed in the y-axis.
   * @protected
   */
  getDataKeyY() {
    return 'close';
  }

  /**
   * Return the minimum value of the domain for the Y-axis.
   * @param {dataMin} value The minumum value of the data.
   * @return {String} The minimum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMinY(dataMin) {
    return Math.floor(dataMin);
  }

  /**
   * Return the maximum value of the domain for the Y-axis.
   * @param {dataMax} value The maximum value of the data.
   * @return {String} The maximum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMaxY(dataMax) {
    return Math.ceil(dataMax);
  }

  /**
   * Return a string for the x-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tick label.
   * @protected
   */
  getGetTickX(value) {
    return new Date(value).toLocaleDateString('default', { timeZone: 'UTC' });
  }

  /**
   * Return a string for the y-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tick label.
   * @protected
   */
  getGetTickY(value) {
    return `$${value.toFixed(2)}`;
  }

  /**
   * Return a string for the x-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tooltip label.
   * @protected
   */
  getGetTooltipX(value) {
    return new Date(value).toLocaleDateString('default', { timeZone: 'UTC' });
  }

  /**
   * Return a string for the y-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tooltip label.
   * @protected
   */
  getGetTooltipY(value) {
    return `DFN Price: $${value.toFixed(2)}`;
  }
}

// Use the withTheme HOC so that we can use the current theme outside styled components.
export default withTheme(PriceChartWithData);
