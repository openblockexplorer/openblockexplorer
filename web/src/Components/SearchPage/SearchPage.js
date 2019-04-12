/**
 * @file SearchPage
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import querySearchGetType from '../../graphql/querySearchGetType';
import Constants from '../../constants';

const StyledTypography = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-weight: regular;
    font-size: 1em;
    margin-left: 25px;
    color: ${props => props.theme.colorBodyText};
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    font-weight: bold;
    font-size: 2em;
    margin-left: 25px;
    margin-top: 10px;
    /* Why is letter-spacing set to 0 here?!!! */
    letter-spacing: 0;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
  }
`;

/**
 * The Search Page shows details about a search.
 */
class SearchPage extends Component {
  static propTypes = {
    /**
     * Object containing information about how a <Route path> matched the URL.
     */
    match: PropTypes.object.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { query } = this.props.match.params;
    return (
      <div style={{ marginTop: '40px' }}>
        <ExplorerTypography>Search</ExplorerTypography>
        <Query query={querySearchGetType} variables={{ query }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <StyledTypography>Searching...</StyledTypography>              
              );
            else if (error)
              return (
                <StyledTypography>Network error</StyledTypography>             
              );
            else if (data.searchGetType.type === "Block")
              return (
                <Redirect to={{ pathname: `/block/${query}` }}/>
              );
            else if (data.searchGetType.type === "Transaction")
              return (
                <Redirect to={{ pathname: `/tx/${query}` }}/>
              );
            else
              return (              
                <StyledTypography>Sorry, this is an invalid search string.</StyledTypography>             
              );
          }}
        </Query>
      </div>
    );
  }
}

export default SearchPage;