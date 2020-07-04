/**
 * @file SearchPage
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import React from "react";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import querySearchGetType from '../../graphql/querySearchGetType';
import TrackablePage from '../TrackablePage/TrackablePage'
import { Breakpoints } from '../../utils/breakpoint';
import Constants from '../../constants';

const TypographyHeading = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_H4};
    font-weight: 400;
    color: ${props => props.theme.colorBodyText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        font-size: ${Constants.MATERIAL_FONT_SIZE_H5};       
      `
    }
  }
`;

const TypographyBody = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_1};
    line-height: 1.75rem;
    color: ${props => props.theme.colorBodyTextDim};
  }
`;

/**
 * The Search Page shows details about a search.
 */
class SearchPage extends TrackablePage {
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
    const { breakpoint } = this.props;
    const { query } = this.props.match.params;
    return (
      <div style={{ marginTop: '32px', marginLeft: '32px' }}>
        <TypographyHeading breakpoint={breakpoint}>Search</TypographyHeading>
        <Query query={querySearchGetType} variables={{ query }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <TypographyBody>Searching...</TypographyBody>              
              );
            else if (error)
              return (
                <TypographyBody>Network error</TypographyBody>             
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
                <TypographyBody>Sorry, this is an invalid search string.</TypographyBody>             
              );
          }}
        </Query>
      </div>
    );
  }
}

export default SearchPage;
