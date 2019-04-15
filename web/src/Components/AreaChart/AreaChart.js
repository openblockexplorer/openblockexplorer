/**
 * @file AreaChart
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Paper,
  Typography
} from '@material-ui/core';
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Constants from '../../constants';

const StyledPaper = styled(Paper)`
  && {
    background: ${props => props.theme.colorChartBackground};
    padding-right: 16px;
    padding-bottom: 16px;
  }
`;

const TitleTypography = styled(Typography)`
  && {
    color: ${props => props.theme.colorBodyText};
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 11px;
    text-align: left;
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_H5};
    font-weight: 300;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      font-size: ${Constants.MATERIAL_FONT_SIZE_H5};
    }
  }
`;

const StyledAreaChart = styled(RechartsAreaChart)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
  }
`;

/**
 * Base class that implements an area chart component.
 */
class AreaChart extends Component {
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
    const data = this.getData();
    return (
      <StyledPaper elevation={1}>
        <TitleTypography>{this.getTitle()}</TitleTypography>
        { data.length > 0 &&
          <ResponsiveContainer width='100%' height={chartHeight}>
            <StyledAreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 8, bottom: 0 }}
              // Setting width to 0 here is a workaround for a problem where ResponsiveContainer
              // does not resize correctly from large to small.
              // https://github.com/recharts/recharts/issues/172
              style={{width: 0}}
            >
              <defs>
                <linearGradient id='colorY' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={theme.colorChartLine} stopOpacity={0.2}/>
                  <stop offset='95%' stopColor={theme.colorChartLine} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke={theme.colorChartGrid}
                vertical={false}
              />
              <XAxis
                dataKey={this.getDataKeyX()}
                stroke={theme.colorChartAxes}
                tick={{ fill: theme.colorChartText }}
                tickFormatter={(tick) => this.getGetTickX(tick)}
                tickMargin={8}
                tickSize={6}
              />
              <YAxis
                domain={[
                  dataMin => this.getDomainMinY(dataMin),
                  dataMax => this.getDomainMaxY(dataMax)
                ]}
                stroke={theme.colorChartAxes}
                tick={{ fill: theme.colorChartText }}
                tickFormatter={(tick) => this.getGetTickY(tick)}
                tickLine={false}
              />
              <Tooltip
                labelFormatter={(value) => this.getGetTooltipX(value)}
                formatter={(value) => [this.getGetTooltipY(value)]}
                itemStyle={{ color: theme.colorChartLine }}
                contentStyle={{
                  background: theme.colorChartBackground,
                  border: `1px solid ${theme.colorChartGrid}`,
                  borderRadius: 4
                }}
                labelStyle={{ color: theme.colorChartText }}
                cursor={{ stroke: theme.colorChartGrid }}
                animationDuration={300}
              />
              <Area
                type='monotone'
                dataKey={this.getDataKeyY()}
                stroke={theme.colorChartLine}
                strokeWidth={2}
                fillOpacity={1}
                fill='url(#colorY)'
                activeDot={{ stroke: theme.colorChartActiveDotStroke, r: 5 }}
                animationDuration={1000}
              />
            </StyledAreaChart>
          </ResponsiveContainer>
        }
      </StyledPaper>
    );
  }

  /**
   * Return the title of the chart.
   * @return {String} The title of the chart.
   * @protected
   */
  getTitle() {
    throw new Error('AreaChart.getTitle() not implemented.');
  }

  /**
   * Return an array of objects that describe the chart data.
   * @return {Array} An array of objects that describe the chart data.
   * @protected
   */
  getData() {
    throw new Error('AreaChart.getData() not implemented.');
  }

  /**
   * Return the key of the data to be displayed in the x-axis.
   * @return {String} The key of the data to be displayed in the x-axis.
   * @protected
   */
  getDataKeyX() {
    throw new Error('AreaChart.getDataKeyX() not implemented.');
  }

  /**
   * Return the key of the data to be displayed in the y-axis.
   * @return {String} The key of the data to be displayed in the y-axis.
   * @protected
   */
  getDataKeyY() {
    throw new Error('AreaChart.getDataKeyY() not implemented.');
  }

  /**
   * Return the minimum value of the domain for the Y-axis.
   * @param {dataMin} value The minumum value of the data.
   * @return {String} The minimum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMinY(dataMin) {
    throw new Error('AreaChart.getDomainMinY() not implemented.');
  }

  /**
   * Return the maximum value of the domain for the Y-axis.
   * @param {dataMax} value The maximum value of the data.
   * @return {String} The maximum value of the domain for the Y-axis.
   * @protected
   */
  getDomainMaxY(dataMax) {
    throw new Error('AreaChart.getDomainMaxY() not implemented.');
  }

  /**
   * Return a string for the x-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tick label.
   * @protected
   */
  getGetTickX(value) {
    throw new Error('AreaChart.getGetTickX() not implemented.');
  }

  /**
   * Return a string for the y-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tick label.
   * @protected
   */
  getGetTickY(value) {
    throw new Error('AreaChart.getGetTickY() not implemented.');
  }

  /**
   * Return a string for the x-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tooltip label.
   * @protected
   */
  getGetTooltipX(value) {
    throw new Error('AreaChart.getGetTooltipX() not implemented.');
  }

  /**
   * Return a string for the y-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tooltip label.
   * @protected
   */
  getGetTooltipY(value) {
    throw new Error('AreaChart.getGetTooltipY() not implemented.');
  }
}

export default AreaChart;
