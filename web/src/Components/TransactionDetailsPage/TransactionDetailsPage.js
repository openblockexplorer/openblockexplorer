/**
 * @file TransactionDetailsPage
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import queryTransaction from '../../graphql/queryTransaction';
import Constants from '../../constants';

const StyledTypography = styled(Typography)`
  && {
    margin-left: 25px;
    color: ${Constants.COLOR_TEXT_LIGHT};
    font-family: '${Constants.FONT_PRIMARY}';
    font-size: 15px;
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      font-size: 11px;
    }
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    margin-left: 25px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 2em;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
  }
`;

const StyledLink = styled(Link)`
  && {
    color: ${Constants.COLOR_DFINITY_BLUE};
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
    let { hash } = this.props.match.params;
    return (
      <div style={{'marginTop': '40px'}}>
        <ExplorerTypography>Transaction Details</ExplorerTypography>
        <Query query={queryTransaction} variables={{ hash }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <StyledTypography>Searching...</StyledTypography>
              );
            else if (error)
              return (
                <StyledTypography>Network error</StyledTypography>
              );
            else if (data.transaction)
              return (
                <Fragment>
                  <StyledTypography>Hash: 0x{data.transaction.hash}</StyledTypography>
                  <StyledTypography>Amount: {data.transaction.amount.toFixed(8).toString()} DFN</StyledTypography>
                  <StyledTypography>
                    {'Block Height: '}
                    <StyledLink to={`/block/${data.transaction.block.height}`}>
                      {data.transaction.block.height.toLocaleString()}
                    </StyledLink>
                  </StyledTypography>
                </Fragment>
              );
            else
              return (
                <StyledTypography>Transaction not found.</StyledTypography>
              );
          }}
        </Query>
      </div>
    );
  }
}

export default TransactionDetailsPage;
