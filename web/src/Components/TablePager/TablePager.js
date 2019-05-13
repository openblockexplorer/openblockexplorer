/**
 * @file TablePager
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  TableCell,
  Toolbar,
  Typography
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Breakpoints } from '../../utils/breakpoint';
import Constants from '../../constants';

const StyledTableCell = styled(TableCell)`
  && {
    &:last-child {
      padding: 0px;
    }
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    color: ${props => props.theme.colorBodyTextDim};
    min-height: auto;
    padding-left: 2px;
    padding-right: 2px;
  }
`;

const TypographyCaption = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_CAPTION};
  }
`;

const TypographyRows = styled(TypographyCaption)`
  && {
    margin-left: 6px;
    margin-right: 14px;
    ${({ breakpoint }) =>
      (breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        margin-right: 7px;
      `
    }
  }
`;

const TypographyCount = styled(TypographyCaption)`
  && {
    margin-left: 41px;
    margin-right: 2px;
    ${({ breakpoint }) =>
      (breakpoint === Breakpoints.SM && `
        margin-left: 20px;
      `) ||
      (breakpoint === Breakpoints.XS && `
        margin-left: 20px;
        margin-right: 6px;
      `)
    }
  }
`;

const StyledSelect = styled(({ ...other }) => (
    <Select
      classes={{
        icon: 'icon',
        root: 'root'
      }}
      {...other}
    />
  ))`
  && {
    color: ${props => props.theme.colorBodyTextDim};
    margin-top: 3px;
    padding-left: 4px;
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_CAPTION};
    & .icon {
      color: ${props => props.theme.colorBodyTextDim};
      top: 0px;
    }
    & .root {
      /**
       * Used to move the rows per page number and the down arrow closer together. Note that this
       * causes problems (number abbreviated with ellipses) for a rows per page number with more
       * than two digits, so if support is desired for more than 99 rows per page, we need to figure
       * out how to move the arrow closer in a different way, or we could simply remove the line
       * below and not move it closer.
       */
      margin-right: -6px;
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: ${props => props.theme.colorBodyTextDim};
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    padding: ${
      ((Constants.TABLE_ROW_HEIGHT_SM_AND_UP - Constants.MATERIAL_UI_ICON_BUTTON_FONT_SIZE) / 2) + 'px'
    };
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding: ${
          ((Constants.TABLE_ROW_HEIGHT_XS - Constants.MATERIAL_UI_ICON_BUTTON_FONT_SIZE) / 2) + 'px'
        };
      `
    }
    &:disabled {
      color: ${props => fade(props.theme.colorBodyTextDim, props.theme.opacityActionDisabled)};
    }
    &:hover {
      background: ${props => fade(props.theme.colorIconButtonHover, props.theme.opacityActionHover)};
      color: ${props => props.theme.colorIconButtonHover};
      /* Reset on touch devices. */
      @media (hover: none) {
        background: inherit;
        color: inherit;
      }
    }
  }
`;

const StyledIconButtonNotLast = styled(StyledIconButton)`
  && {
    margin-right: 4px;
  }
`;

/**
 * Component that provides table pagination actions. The Material-UI TablePaginationActions
 * component is basic (e.g., no first and last buttons) and does not provide enough access for
 * styling (e.g., IconButton cannot by styled).
 */
class TablePagerActions extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * The total number of rows.
     */
    count: PropTypes.number.isRequired,
    /**
     * Callback fired when the page is changed.
     *
     * @param {object} event The event source of the callback.
     * @param {number} page The selected page.
     */
    onChangePage: PropTypes.func.isRequired,
    /**
     * The zero-based index of the current page.
     */
    page: PropTypes.number.isRequired,
    /**
     * The number of rows per page.
     */
    rowsPerPage: PropTypes.number.isRequired
  };
  
  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const {
      breakpoint,
      count,
      onChangePage,
      page,
      rowsPerPage,
      ...other
    } = this.props;

    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    return (
      <div {...other}>
        <StyledIconButtonNotLast
          breakpoint={breakpoint}
          color='inherit'
          onClick={event => onChangePage(event, 0)}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </StyledIconButtonNotLast>
        <StyledIconButtonNotLast
          breakpoint={breakpoint}
          color='inherit'
          onClick={event => onChangePage(event, page - 1)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </StyledIconButtonNotLast>
        <StyledIconButtonNotLast
          breakpoint={breakpoint}
          color='inherit'
          onClick={event => onChangePage(event, page + 1)}
          disabled={page >= lastPage}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </StyledIconButtonNotLast>
        <StyledIconButton
          breakpoint={breakpoint}
          color='inherit'
          onClick={event => onChangePage(event, Math.max(0, lastPage))}
          disabled={page >= lastPage}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </StyledIconButton>
      </div>
    );
  }
}

/**
 * A TableCell-based component for placing inside a TableFooter for pagination. The Material-UI
 * TablePagination component does not provide enough access for styling (e.g., its pop-up menu
 * cannot be fully styled at this time), so we implement our own Material Design pagination
 * component.
 * 
 * Spacing is styled to match table at console.firebase.google.com/.../authentication/users
 * 
 */
class TablePager extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * The total number of rows.
     */
    count: PropTypes.number.isRequired,
    /**
     * Callback fired when the page is changed.
     *
     * @param {object} event The event source of the callback.
     * @param {number} page The selected page.
     */
    onChangePage: PropTypes.func.isRequired,
    /**
     * Callback fired when the number of rows per page is changed.
     *
     * @param {object} event The event source of the callback.
     */
    onChangeRowsPerPage: PropTypes.func,
    /**
     * The zero-based index of the current page.
     */
    page: PropTypes.number.isRequired,
    /**
     * The number of rows per page.
     */
    rowsPerPage: PropTypes.number.isRequired,
    /**
     * Customizes the options of the rows per page select field. If less than two options are
     * available, no select field will be displayed.
     */
    rowsPerPageOptions: PropTypes.array.isRequired,
    /**
     * The styled-components theme.
     */
    theme: PropTypes.object.isRequired
  };

  /**
   * Invoked by React immediately after updating occurs. This method is not called for the initial
   * render.
   * @public
   */
  componentDidUpdate() {
    const { count, onChangePage, page, rowsPerPage } = this.props;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }
  
  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const colSpan = 1000; // span all table columns
    return (
      <StyledTableCell colSpan={colSpan} padding='checkbox'>
        {this.getToolbar()}
      </StyledTableCell>
    );
  }

  /**
   * Return the elements for the Toolbar component.
   * @return {Object} The elements for the Toolbar component.
   * @private
   */
  getToolbar() {
    const { breakpoint } = this.props;
    return (
      breakpoint === Breakpoints.XS ?
        // For XS, put the actions buttons on a second row, and center both rows.
        <StyledToolbar>
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid container direction='row' justify='center' alignItems='center' wrap='nowrap'>
              {this.getRowsSelectCount()}
            </Grid>
            <Grid container direction='row' justify='center' alignItems='center' wrap='nowrap'>
              {this.getActions()}
            </Grid>
          </Grid>
        </StyledToolbar>
      :
        <StyledToolbar>
          <Grid container direction='row' justify='flex-end' alignItems='center' wrap='nowrap'>
            {this.getRowsSelectCount()}
            {this.getActions()}
          </Grid>
        </StyledToolbar>
    );
  }

  /**
   * Return the elements for the rows text, the Select component, and the count text.
   * @return {Object} The elements for the rows text, the Select component, and the count text.
   * @private
   */
  getRowsSelectCount() {
    const {
      breakpoint,
      onChangeRowsPerPage,
      rowsPerPage,
      rowsPerPageOptions,
      theme
    } = this.props;
    const rowsText = (breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) ?
      'Rows:' : 'Rows per page:';
    return (
      <Fragment>  
        {rowsPerPageOptions.length > 1 && (
          <Fragment>
            <TypographyRows breakpoint={breakpoint} color='inherit'>
              {rowsText}
            </TypographyRows>
            <StyledSelect
              input={<InputBase />}
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              // Unable to style the Menu background using styled-components.
              MenuProps={{
                PaperProps: {style: {background: theme.colorTableBackgroundPrimary}}
              }}
            >
              {rowsPerPageOptions.map(rowsPerPageOption => (
                <StyledMenuItem
                  key={rowsPerPageOption}
                  value={rowsPerPageOption}
                >
                  {rowsPerPageOption}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </Fragment>
        )}
        <TypographyCount breakpoint={breakpoint} color='inherit'>
          {this.getCountText()}
        </TypographyCount>
      </Fragment>
    );
  }

  /**
   * Return the text for the count (e.g., 1-10 of 120).
   * @return {Object} The text for the count.
   * @private
   */
  getCountText() {
    const {
      breakpoint,
      count,
      page,
      rowsPerPage
    } = this.props;

    const from = count === 0 ? 0 : page * rowsPerPage + 1;
    const to = Math.min(count, (page + 1) * rowsPerPage);

    let total;
    if (breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) {
      if (count >= 1000000000) {
        const t = count / 1000000000;
        total = t.toFixed(Number.isInteger(t) ? 0 : 1) + 'T';
      }
      else if (count >= 1000000) {
        const m = count / 1000000;
        total = m.toFixed(Number.isInteger(m) ? 0 : 1) + 'M';
      }
      else if (count >= 1000) {
        const k = count / 1000;
        total = k.toFixed(Number.isInteger(k) ? 0 : 1) + 'k';
      }
      else
      total = count.toFixed(0);
    }
    else
      total = count.toLocaleString();

    return `${from.toLocaleString()}-${to.toLocaleString()} of ${total}`;
  }

  /**
   * Return the elements for the TablePagerActions component.
   * @return {Object} The elements for the TablePagerActions component.
   * @private
   */
  getActions() {
    const {
      breakpoint,
      count,
      onChangePage,
      page,
      rowsPerPage
    } = this.props;
    return (
      <TablePagerActions
        breakpoint={breakpoint}
        count={count}
        onChangePage={onChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    );
  }
}

// Use the withTheme HOC so that we can use the current theme outside styled components.
export default withTheme(TablePager);
