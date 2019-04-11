/**
 * @file TransactionDetailsPage
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { duration, easing } from '@material-ui/core/styles/transitions';
import TrackablePage from '../TrackablePage/TrackablePage';
import queryTransaction from '../../graphql/queryTransaction';
import { Breakpoints } from '../../utils/breakpoint';
import getHashString from '../../utils/getHashString';
import Constants from '../../constants';

const GridSection = styled(Grid)`
  && {
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    padding-bottom: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    padding-left: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    padding-right: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    transition: ${'padding ' + duration.standard + 'ms ' + easing.easeInOut};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding-top: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        padding-bottom: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        padding-left: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        padding-right: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
      `
    }
  }
`;

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

const StyledLink = styled(Link)`
  && {
    color: ${props => props.theme.colorBodyTextLink};
  }
`;

/**
 * The Transaction Details Page shows details about a transaction.
 */
class TransactionDetailsPage extends TrackablePage {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
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
    const { hash } = this.props.match.params;

    const hashMaxLength = breakpoint === Breakpoints.XS || breakpoint === Breakpoints.SM ? 24 : 0;
    return (
      <GridSection container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
        breakpoint={breakpoint}
      >
        <TypographyHeading breakpoint={breakpoint}>Transaction Details</TypographyHeading>
        <Query query={queryTransaction} variables={{ hash }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Grid item>
                  <TypographyBody>Searching...</TypographyBody>
                </Grid>
              );
            else if (error)
              return (
                <Grid item>
                  <TypographyBody>Network error</TypographyBody>
                </Grid>
              );
            else if (data.transaction)
              return (
                <Grid item>
                  <TypographyBody>
                    {'Hash: '}
                    {getHashString(data.transaction.hash, hashMaxLength)}
                  </TypographyBody>
                  <TypographyBody>
                    {'Amount: '}
                    {data.transaction.amount.toFixed(8).toString()}
                    {' DFN'}
                  </TypographyBody>
                  <TypographyBody>
                    {'Block Height: '}
                    <StyledLink to={`/block/${data.transaction.block.height}`}>
                      {data.transaction.block.height.toLocaleString()}
                    </StyledLink>
                  </TypographyBody>
                </Grid>
              );
            else
              return (
                <Grid item>
                  <TypographyBody>Transaction not found.</TypographyBody>
                </Grid>
              );
          }}
        </Query>
      </GridSection>
    );
  }
}

export default TransactionDetailsPage;
