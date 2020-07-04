/**
 * @file BlockDetailsPage
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { duration, easing } from '@material-ui/core/styles/transitions';
import TrackablePage from '../TrackablePage/TrackablePage';
import BlockTransactionsTable from '../BlockTransactionsTable/BlockTransactionsTable'
import queryBlock from '../../graphql/queryBlock';
import { Breakpoints } from '../../utils/breakpoint';
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

const GridTable = styled(Grid)`
  && {
    width: 100%;
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

/**
 * The Block Details Page shows details about a block.
 */
class BlockDetailsPage extends TrackablePage {
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

    const height = parseInt(this.props.match.params.height, 10);
    return (
      <GridSection container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
        breakpoint={breakpoint}
      >
        <Grid item>
          <TypographyHeading breakpoint={breakpoint}>Block Details</TypographyHeading>
        </Grid>
        <Query query={queryBlock} variables={{ height }}>
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
            else if (data.block) {
              const date = new Date(data.block.timestamp);
              return (
                <Fragment>
                  <Grid item>
                    <TypographyBody>
                      Height: {data.block.height.toLocaleString()}
                    </TypographyBody>
                    <TypographyBody>
                      Timestamp: {date.toLocaleString()}
                    </TypographyBody>
                  </Grid>
                  <br />
                  <GridTable item>
                    <BlockTransactionsTable
                      breakpoint={breakpoint}
                      maxRows={100}
                      transactions={data.block.transactions}
                    />
                  </GridTable>
                </Fragment>
              );
            }
            else
              return (
                <Grid item>
                  <TypographyBody>Block not found.</TypographyBody>
                </Grid>
              );
          }}
        </Query>
      </GridSection>
    );
  }
}

export default BlockDetailsPage;
