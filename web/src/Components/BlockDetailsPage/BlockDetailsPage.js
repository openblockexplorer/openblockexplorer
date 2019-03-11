/**
 * @file BlockDetailsPage
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import BlockTransactionsTable from '../BlockTransactionsTable/BlockTransactionsTable'
import queryBlock from '../../graphql/queryBlock';
import Constants from '../../constants';

const StyledTypography = styled(Typography)`
  && {
    margin-left: 25px;
    color: ${props => props.theme.colorBodyText};
    font-family: ${Constants.FONT_PRIMARY};
    font-size: 15px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
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

/**
 * The Block Details Page shows details about a block.
 */
class BlockDetailsPage extends Component {
  static propTypes = {
    /**
     * Object containing information about how a <Route path> matched the URL.
     */
    match: PropTypes.object.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { height } = this.props.match.params;
    return (
      <div style={{ marginTop: '40px' }}>
        <ExplorerTypography>Block Details</ExplorerTypography>
        <Query query={queryBlock} variables={{ height }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <StyledTypography>Searching...</StyledTypography>
              );
            else if (error)
              return (
                <StyledTypography>Network error</StyledTypography>
              );
            else if (data.block) {
              const date = new Date(data.block.timestamp);
              return (
                <Fragment>
                  <StyledTypography>Height: {data.block.height.toLocaleString()}</StyledTypography>
                  <StyledTypography>Timestamp: {date.toLocaleString()}</StyledTypography>
                  <br />
                  <BlockTransactionsTable
                    maxRows={100}
                    transactions={data.block.transactions}
                    routerRef={this.props.routerRef}
                  />
                </Fragment>
              );
            }
            else
              return (
                <StyledTypography>Block not found.</StyledTypography>
              );
          }}
        </Query>
      </div>
    );
  }
}

export default BlockDetailsPage;
