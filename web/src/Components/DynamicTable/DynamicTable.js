/**
 * @file DynamicTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Fade,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Transition } from 'react-spring/renderprops';
import { Breakpoints } from '../../utils/breakpoint';
import Constants from '../../constants';

const StyledPaper = styled(Paper)`
  && {
    background: ${props => props.theme.colorTableBackgroundPrimary};
  }
`;

const TypographyTitle = styled(Typography)`
  && {
    color: ${props => props.theme.colorBodyText};
    padding-top: 8px;
    padding-bottom: 4px;
    padding-left: 11px;
    text-align: left;
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_H6};
    font-weight: 300;
  }
`;

const StyledTable = styled(Table)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    /* Needed for footer border-top to work. */
    border-collapse: separate;
  }
`;

const TableRowHeader = styled(TableRow)`
  && {
    height: ${Constants.TABLE_ROW_HEIGHT_SM_AND_UP + 'px'};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        height: ${Constants.TABLE_ROW_HEIGHT_XS + 'px'};
      `
    }
  }
`;

// The height for the table body rows is set dynamically, so that we can perform expand/collapse
// animations.
const TableRowBody = styled(TableRow)`
  && {
    height: auto;
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    border-color: ${props => props.theme.colorTableRowBorder};
    color: ${props => props.theme.colorBodyText};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
    white-space: nowrap;
    /* Reducing the font size for narrow page widths seems sufficient for resizing the table when
       Grid spacing is 0 and padding='checkbox'. Other settings, such as 'overflow: hidden' and
       'max-width: 0px', were also helpful in improving the table at narrow page widths, but do
       not seem to be necessary with the current settings. Another useful setting is
       'text-overflow: ellipsis', though we reduce the font size rather than using ellipsis. */
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        font-size: ${Constants.FONT_SIZE_TABLE_XS};
      `
    }
  }
`;

const TableCellHeader = styled(StyledTableCell)`
  && {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    color: ${props => props.theme.colorBodyTextDim};
    font-weight: 500;
  }
`;

const StyledLink = styled(Link)`
  && {
    color: ${props => props.theme.colorBodyTextLink};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TableRowFooter = styled(TableRow)`
  && {
    height: 20px;
  }
`;

const TableCellFooter = styled(StyledTableCell)`
  && {
    border-top-style: solid;
    border-top-width: 1px;
    color: ${props => props.theme.colorTableTextDim};
    font-size: 9px;
  }
`;

/**
 * Class that implements a table component where new rows either slide in or fade in.
 */
class DynamicTable extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * An array that specifies the column widths of the table.
     */    
    columnWidths: PropTypes.array.isRequired,
    /**
     * Return an array of objects that describe the body rows, where each object contains:
     *  mapKey: A unique key that identifies the row.
     *  cells: An array of objects that describe the cells of the row, where each object contains:
     *    value: String containing the value of the cell.
     *    isNumeric: True if the cell contains a numeric value, false otherwise.
     *    link: Optional string which provides a link for the cell (to= prop of Link). Set to null
     *      for no link.
     * @return {Array} An array of objects that describe the body rows.
     */
    getBodyRows: PropTypes.func.isRequired,
    /**
     * An array of objects that describe the cells of the footer row, where each object contains:
     *  value: String containing the value of the cell.
     *  isNumeric: True if the cell contains a numeric value, false otherwise.
     *  link: Optional string which provides a link for the cell (to= prop of Link). Set to null for
     *    no link.
     */
    footerRow: PropTypes.array.isRequired,
    /**
     * An array of objects that describe the cells of the header row, where each object contains:
     *  value: String containing the value of the cell.
     *  isNumeric: True if the cell contains a numeric value, false otherwise.
     *  link: Optional string which provides a link for the cell (to= prop of Link). Set to null for
     *    no link.
     */
    headerRow: PropTypes.array.isRequired,
    /**
     * Indicates whether new rows should slide in rather than fade in, expanding when they are
     * created and collapsing when they are destroyed.
     */
    slide: PropTypes.bool,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
    /**
     * The title of the table.
     */
    title: PropTypes.string.isRequired,
  };

  /**
   * Create a DynamicTable object.
   * @constructor
   */
  constructor() {
    super();

    this.rows = [];
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    // BUG: On Chrome, screen scrolls when collapsing row is on screen but expanding row is off screen!!!
    const { breakpoint, columnWidths, footerRow, headerRow, title } = this.props;
    return (
      <StyledPaper elevation={1}>
        <TypographyTitle>{title}</TypographyTitle>
        <StyledTable>
          <colgroup>
            {columnWidths.map((width, index) => {
              // The column width settings seem to be ignored in many cases, depending on cell
              // length. That is, when cell lengths are long, the widths are ignored.
              return (
                <col key={index} width={width} />
              );
            })}
          </colgroup>
          <TableHead>
            <TableRowHeader breakpoint={breakpoint}>
              {headerRow.map((cell, index) => {
                return (
                  // Using index as the key is fine here and for cells in other rows, since we never
                  // add, remove, reorder, or filter items in the cell arrays.
                  <TableCellHeader
                    breakpoint={breakpoint}
                    key={index}
                    align={cell.isNumeric ? 'right' : 'inherit'}
                    padding='checkbox'
                  >
                  {cell.link != null ?
                    <StyledLink to={cell.link}>{cell.value}</StyledLink> :
                    cell.value
                  }
                  </TableCellHeader>
                );
              })}
            </TableRowHeader>
          </TableHead>
          <TableBody>
            {this.getBodyRowElements()}
          </TableBody>
          <TableFooter>
            <TableRowFooter>
              {footerRow.map((cell, index) => {
                return (
                  <TableCellFooter
                    breakpoint={breakpoint}
                    key={index}
                    align={cell.isNumeric ? 'right' : 'inherit'}
                    padding='checkbox'
                  >
                  {cell.link != null ?
                    <StyledLink to={cell.link}>{cell.value}</StyledLink> :
                    cell.value
                  }
                  </TableCellFooter>
                );
              })}
            </TableRowFooter>
          </TableFooter>
        </StyledTable>
      </StyledPaper>
    );
  }

  /**
   * Return the elements for all of the body rows.
   * @return {Object} The elements for all of the body rows.
   * @private
   */
  getBodyRowElements() {
    const { breakpoint, getBodyRows, maxRows, slide } = this.props;
    const rowHeight = breakpoint === Breakpoints.XS ?
      Constants.TABLE_ROW_HEIGHT_XS : Constants.TABLE_ROW_HEIGHT_SM_AND_UP;

    // Only get new body rows when the Document (web app) is visible. If we do not do this, then the
    // Transition component can buffer hundreds of row animations if we switch to another browser
    // tab for an extended period of time, then when our browser tab regains focus, these animations
    // are run and the web app can become frozen for several minutes.
    if (document.visibilityState === "visible")
      this.rows = getBodyRows().slice(0, maxRows);
    
    if (slide) {
      // Use a Transition element to expand (and fade in) entering rows and collapse (and fade out)
      // leaving rows.
      // BUG: On windows resize to/from XS, row heights are not changed on existing rows!!!
      return (
        <Transition
          items={this.rows}
          keys={bodyRow => bodyRow.mapKey}
          from={{ height: 0, opacity: 0 }}
          enter={{ height: rowHeight, opacity: 1 }}
          leave={{ height: 0, opacity: 0 }}
        >
          {/* Function signature: (item, state, index) => props => ReactNode */}
          {(bodyRow, state, index) => style => this.getBodyRowElement(bodyRow, state, index, style)}
        </Transition>
      );
    }
    else {
      return this.rows.map((bodyRow, index) => {
        // When not expanding/collapsing rows, use a Fade element to fade in and fade out.
        return (
          <Fade
            key={bodyRow.mapKey}
            in={true}
            timeout={500}
          >
            {this.getBodyRowElement(bodyRow, 'update', index, { height: rowHeight })}
          </Fade>
        );
      });  
    }
  }

  /**
   * Return the element for the specified body row.
   * @param {Object} bodyRow Object that describes the body row.
   * @param {String} state The item's transition state: enter, leave, or update.
   * @param {Number} rowIndex The item's row index. 
   * @param {Object} style The style to apply to the table cell Grid, specifying the height.
   * @return {Object} The element for the specified body row.
   * @private
   */
  getBodyRowElement(bodyRow, state, rowIndex, style) {
    const { breakpoint } = this.props;
    return (
      <TableRowBody>
        {bodyRow.cells.map((cell, index) => {
          return (
            <StyledTableCell
              breakpoint={breakpoint}
              key={index}
              padding='checkbox'
              // Hide the border on rows that are leaving, so that table height remains consistent.
              style={state === 'leave' ? {borderBottomStyle: 'hidden'} : null}
            >
              <Grid container
                direction='row'
                justify={cell.isNumeric ? 'flex-end' : 'flex-start'}
                alignItems='center'
                style={style}
              >
                {cell.link != null ?
                  <StyledLink to={cell.link}>{cell.value}</StyledLink> :
                  cell.value
                }
              </Grid>
            </StyledTableCell>
          );
        })}
      </TableRowBody>
    );
  }
}

export default DynamicTable;
