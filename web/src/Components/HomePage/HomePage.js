/**
 * @file HomePage
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid
} from '@material-ui/core';
import { duration, easing } from '@material-ui/core/styles/transitions';
import BlocksTable from '../BlocksTable/BlocksTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import DashCard from '../DashCard/DashCard';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent'
import { Breakpoints, getBreakpoint } from '../../utils/breakpoint';
import Constants from '../../constants';

const HomeDiv = styled.div`
  && {
    margin-top: 32px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

// remove if not used!!!
// const DfinitySymbolD3Grid = styled(Grid)`
//   && {
//     margin: -40px;
//     @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
//       margin-top: 5px;
//       margin-bottom: -30px;
//     }
//     @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
//       margin-top: 30px;
//       margin-bottom: -20px;
//     }
//   }
// `;

const ContentGrid = styled(Grid)`
  && {
    /* max-width: ${Constants.BREAKPOINT_LG_MAX_WIDTH + 'px'}; */
`;

// The About page padding/margins are not good here. Look at dashboard examples and see how they set margins!!!
const GridSection = styled(Grid)`
  && {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 32px;
    padding-right: 32px;
  /*!!! padding-top: 96px;
    padding-bottom: 96px;
    transition: ${'padding ' + duration.standard + 'ms ' + easing.easeInOut};
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG) && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_LG + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_LG + 'px'};
      `) ||
      (breakpoint === Breakpoints.MD && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_MD + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_MD + 'px'};
      `) ||
      (breakpoint === Breakpoints.SM && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_SM + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_SM + 'px'};
      `) ||
      (breakpoint === Breakpoints.XS && `
        padding-top: 64px;
        padding-bottom: 64px;
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_XS + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_XS + 'px'};
      `)
    } */
  }
`;

const GridSectionCards = styled(GridSection)`
  && {
    margin-top: 16px;
  /*!!! padding-top: 96px;
    padding-bottom: 96px;
    transition: ${'padding ' + duration.standard + 'ms ' + easing.easeInOut};
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG) && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_LG + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_LG + 'px'};
      `) ||
      (breakpoint === Breakpoints.MD && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_MD + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_MD + 'px'};
      `) ||
      (breakpoint === Breakpoints.SM && `
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_SM + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_SM + 'px'};
      `) ||
      (breakpoint === Breakpoints.XS && `
        padding-top: 64px;
        padding-bottom: 64px;
        padding-left: ${Constants.ABOUT_PAGE_MARGIN_XS + 'px'};
        padding-right: ${Constants.ABOUT_PAGE_MARGIN_XS + 'px'};
      `)
    } */
  }
`;

const GridCard = styled(Grid)`
  && {
    width: calc(25% - 16px);
    /*!!! ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG) && `
        width: calc(25% - ${Constants.ABOUT_PAGE_MARGIN_LG/2 + 'px'});
      `) ||
      (breakpoint === Breakpoints.MD && `
        width: calc(25% - ${Constants.ABOUT_PAGE_MARGIN_MD/2 + 'px'});
      `) ||
      ((breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        width: 100%;
      `)
    } */
  }
`;

const GridTable = styled(Grid)`
  && {
    width: calc(50% - 16px);
    /*!!! ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG) && `
        width: calc(25% - ${Constants.ABOUT_PAGE_MARGIN_LG/2 + 'px'});
      `) ||
      (breakpoint === Breakpoints.MD && `
        width: calc(25% - ${Constants.ABOUT_PAGE_MARGIN_MD/2 + 'px'});
      `) ||
      ((breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        width: 100%;
      `)
    } */
  }
`;

// Not sure about these values!!!
const CardGrid = styled(Grid)`
  && {
    padding-left: 14px;
    padding-right: 14px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
      padding-top: 0px;
      padding-bottom: 4px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;

const DashCardA = styled(DashCard)`
  && {
    /*!!! DFINITY blue */
    /*!!! background: rgb(82, 170, 221); */
    background: ${props => props.theme.colorDashCardABackground};
    color: ${props => props.theme.colorDashCardText};
  }
`;

const DashCardB = styled(DashCard)`
  && {
    /*!!! DFINITY background: rgb(82, 45, 129); */
    /*!!! background: rgb(114, 102, 186); */
    background: ${props => props.theme.colorDashCardBBackground};
    color: ${props => props.theme.colorDashCardText};
  }
`;

const DashCardC = styled(DashCard)`
  && {
    background: ${props => props.theme.colorDashCardCBackground};
    color: ${props => props.theme.colorDashCardText};
  }
`;

const DashCardD = styled(DashCard)`
  && {
    /*!!! DFINITY orange */
    /*!!! background: rgb(240, 179, 84); */
    background: ${props => props.theme.colorDashCardDBackground};
    color: ${props => props.theme.colorDashCardText};
  }
`;

// Remove if not used!!!
// const BlocksTableGrid = styled(Grid)`
//   && {
//     padding-left: 24px;
//     padding-right: 8px;
//     @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
//       padding-top: 0px;
//       padding-bottom: 4px;
//       padding-left: 8px;
//       padding-right: 8px;
//     }
//   }
// `;

// Remove if not used!!!
// const TransactionsTableGrid = styled(Grid)`
//   && {
//     padding-left: 24px;
//     padding-right: 8px;
//     @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
//       padding-top: 4px;
//       padding-bottom: 0px;
//       padding-left: 8px;
//       padding-right: 8px;
//     }
//   }
// `;

/**
 * Component for the home page.
 */
class HomePage extends ResponsiveComponent {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object
  };

  /**
   * Create a HomePage object.
   * @constructor
   */
  constructor(props) {
    super(props);
    // Does a ref need to be in the state, or can it simply be a member?!!!
    this.state = {dfinitySymbolD3Ref: null};// remove if not used!!!

    // Bind to make 'this' work in callbacks.
    this.setDfinitySymbolD3Ref = this.setDfinitySymbolD3Ref.bind(this);// remove if not used!!!
  }
  
  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <div>
        {this.getSectionCards()}
        {this.getSectionTables()}
      </div>
    );
  }

  /**
   * Return the elements for the Cards section based on the current breakpoint.
   * @return {Object} The elements for the Cards section based on the current breakpoint.
   * @private
   */
  getSectionCards()
  {
    const { breakpoint } = this.props;

    // Add fade similar to ImageLinkGrid!!!
    return (
      <GridSectionCards container
        direction='row'
        justify='space-between'
        alignItems='center'
        breakpoint={breakpoint}
      >
        <GridCard item breakpoint={breakpoint}>
          <DashCardA cardIndex={0} title='Blocks' value='3,158,151' svgIconPath={Constants.ICON_SVG_PATH_BLOCK} />
        </GridCard>
        <GridCard item breakpoint={breakpoint}>
          <DashCardB cardIndex={1} title='Avg Block Time' value='3.5 s' svgIconPath={Constants.ICON_SVG_PATH_BLOCK_TIME} />
        </GridCard>
        <GridCard item breakpoint={breakpoint}>
          <DashCardC cardIndex={2} title='Avg Transactions' value='24 tps' svgIconPath={Constants.ICON_SVG_PATH_TPS} />
        </GridCard>
        <GridCard item breakpoint={breakpoint}>
          <DashCardD cardIndex={3} title='Price' value='$9.52' svgIconPath={Constants.ICON_SVG_PATH_PRICE} />
        </GridCard>
      </GridSectionCards>
    );
  }

  /**
   * Return the elements for the Tables section based on the current breakpoint.
   * @return {Object} The elements for the Tables section based on the current breakpoint.
   * @private
   */
  getSectionTables()
  {
    const { breakpoint } = this.props;

    // Add fade similar to ImageLinkGrid!!!
    // The use of Paper here is likely redundant if FadeTable uses Paper!!!
    return (
      <GridSection container
        direction='row'
        justify='space-between'
        alignItems='center'
        breakpoint={breakpoint}
      >
        <GridTable item breakpoint={breakpoint}>
          <BlocksTable
            maxRows={8}
            dfinitySymbolD3Ref={this.state.dfinitySymbolD3Ref}
            routerRef={this.props.routerRef}
          />
        </GridTable>
        <GridTable item breakpoint={breakpoint}>
          <TransactionsTable maxRows={8} routerRef={this.props.routerRef} />
        </GridTable>
      </GridSection>
    );
  }

  /**
   * Return the width of the DfinitySymbolD3 component based on the current breakpoint.
   * @return {Number} The width of the DfinitySymbolD3 component based on the current breakpoint.
   * @private
   */
  getDfinitySymbolD3Width() {// remove if not used!!!
    const breakpoint = getBreakpoint();
    switch (breakpoint) {
      case Breakpoints.XS:
        return 320; // iPhone 4 width, modern phones are larger (regarding remove if not used, this seems like valuable info!!!)
      case Breakpoints.SM:
        return Constants.BREAKPOINT_MIN_SM;
      default:
        return 0;
    }
  }

  /**
   * Set a reference to the DfinitySymbolD3 element.
   * @public
   */
  setDfinitySymbolD3Ref(element) {// remove if not used!!!
    this.setState({ dfinitySymbolD3Ref: element });
  };
}

export default HomePage;
