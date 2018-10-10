/**
 * @file TransactionDetailsPage
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from "react";
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import Constants from '../../constants';

const StyledTypography = styled(Typography)`
  && {
    font-weight: regular;
    font-size: 1em;
    margin-left: 25px;
    font-family: '${Constants.FONT_PRIMARY}';
    color: ${Constants.COLOR_TEXT_LIGHT};
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    font-weight: bold;
    font-size: 2em;
    margin-left: 25px;
    margin-top: 10px;
    letter-spacing: 0;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
  }
`;

/**
 * The Transaction Details Page shows details about a transaction.
 */
class TransactionDetailsPage extends Component {
  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <div style={{'marginTop': '40px'}}>
        <ExplorerTypography>Transaction Details</ExplorerTypography>
        <StyledTypography>Transaction Details page coming soon.</StyledTypography>
      </div>
    );
  }
}

export default TransactionDetailsPage;
