/**
 * @file FadeTable
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
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      font-size: ${Constants.MATERIAL_FONT_SIZE_H6};
    }
  }
`;

const StyledTable = styled(Table)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
  }
`;

const StyledTableBody = styled(TableBody)`
  && {
    border-top: ${props => '2px solid' + props.theme.colorTableRowBorder};
  }
`;

const tableRowHeight = 38;
const TableRowHeader = styled(TableRow)`
  && {
    height: ${tableRowHeight + 'px'};
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
    font-size: 15px;
    white-space: nowrap;
    /* Reducing the font size for narrow page widths seems sufficient for resizing the table when
       Grid spacing is 0 and padding={'checkbox'}. Other settings, such as 'overflow: hidden' and
       'max-width: 0px', were also helpful in improving the table at narrow page widths, but do
       not seem to be necessary with the current settings. Another useful setting is
       'text-overflow: ellipsis', though we reduce the font size rather than using ellipsis. */
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      font-size: 11px;
    }
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
    color: ${props => props.theme.colorTableTextDim};
    font-size: 9px;
  }
`;

/**
 * Base class that implements a table component where new rows fade in.
 */
class FadeTable extends Component { 
  static propTypes = {
    /**
     * Indicates whether rows should expand when they are created and collapse when they are
     * destroyed.
     */
    expandRows: PropTypes.bool,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <StyledPaper elevation={1}>
        <TypographyTitle>{this.getTitle()}</TypographyTitle>
        <StyledTable>
          <colgroup>
            {this.getColumnWidths().map((width, index) => {
              // The column width settings seem to be ignored in many cases, depending on cell
              // length. That is, when cell lengths are long, the widths are ignored.
              return (
                <col key={index} width={width} />
              );
            })}
          </colgroup>
          <TableHead>
            <TableRowHeader>
              {this.getHeaderRow().map((cell, index) => {
                return (
                  // Using index as the key is fine here and for cells in other rows, since we never
                  // add, remove, reorder, or filter items in the cell arrays.
                  <StyledTableCell
                    key={index}
                    align={cell.isNumeric ? 'right' : 'inherit'}
                    padding={'checkbox'}
                  >
                  {cell.link != null ?
                    <StyledLink to={cell.link}>{cell.value}</StyledLink> :
                    cell.value
                  }
                  </StyledTableCell>
                );
              })}
            </TableRowHeader>
          </TableHead>
          <StyledTableBody>
            {this.getBodyRowElements()}
          </StyledTableBody>
          <TableFooter>
            <TableRowFooter>
              {this.getFooterRow().map((cell, index) => {
                return (
                  <TableCellFooter
                    key={index}
                    align={cell.isNumeric ? 'right' : 'inherit'}
                    padding={'checkbox'}
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
    const { expandRows, maxRows } = this.props;
    let rows = this.getBodyRows().slice(0, maxRows);
    if (expandRows) {
      // Use a Transition element to expand (and fade in) entering rows and collapse (and fade out)
      // leaving rows.
      return (
        <Transition
          items={rows}
          keys={bodyRow => bodyRow.mapKey}
          from={{ height: 0, opacity: 0 }}
          enter={{ height: tableRowHeight, opacity: 1 }}
          leave={{ height: 0, opacity: 0 }}
        >
          {bodyRow => style => this.getBodyRowElement(bodyRow, style)}
        </Transition>
      );
    }
    else {
      return rows.map((bodyRow) => {
        // When not expanding/collapsing rows, use a Fade element to fade in and fade out.
        return (
          <Fade
            key={bodyRow.mapKey}
            in={true}
            timeout={500}
          >
            {this.getBodyRowElement(bodyRow, { height: tableRowHeight })}
          </Fade>
        );
      });  
    }
  }

  /**
   * Return the element for the specified body row.
   * @param {Object} bodyRow Object that describes the body row.
   * @param {Object} style The style to apply to the table cell Grid, specifying the height.
   * @return {Object} The element for the specified body row.
   * @private
   */
  getBodyRowElement(bodyRow, style) {
    return (
      <TableRowBody>
        {bodyRow.cells.map((cell, index) => {
          return (
            <StyledTableCell
              key={index}
              padding={'checkbox'}
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

  /**
   * Return the title of the table.
   * @return {String} The title of the table.
   * @protected
   */
  getTitle() {
    throw new Error('FadeTable.getTitle() not implemented.');
  }

  /**
   * Return an array that specifies the column widths of the table.
   * @return {Array} An array that specifies the column widths of the table.
   * @protected
   */
  getColumnWidths() {
    throw new Error('FadeTable.getColumnWidths() not implemented.');
  }

  /**
   * Return an array of objects that describe the cells of the header row.
   * @return {Array} An array of objects that describe the cells of the header row.
   * @protected
   */
  getHeaderRow() {
    throw new Error('FadeTable.getHeaderRow() not implemented.');
  }

  /**
   * Return an array of objects that describe the body rows.
   * @return {Array} An array of objects that describe the body rows.
   * @protected
   */
  getBodyRows() {
    throw new Error('FadeTable.getBodyRows() not implemented.');
  }

  /**
   * Return an array of objects that describe the cells of the footer row.
   * @return {Array} An array of objects that describe the cells of the footer row.
   * @protected
   */
  getFooterRow() {
    throw new Error('FadeTable.getFooterRow() not implemented.');
  }
}

export default FadeTable;
