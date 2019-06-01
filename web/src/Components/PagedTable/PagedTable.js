/**
 * @file PagedTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import styled from 'styled-components';
import {
  CircularProgress,
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
import { duration, easing } from '@material-ui/core/styles/transitions';
import zIndex from '@material-ui/core/styles/zIndex';
import TablePager from '../TablePager/TablePager';
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

const DivCircularProgress = styled.div`
  && {
    position: absolute;
    /* Set to modal z-index so that progress indicator is above table.  */
    z-index: ${zIndex.modal};
    /* Add padding under the progress indicator for XS to compensate for the larger footer. */
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding-bottom: 30px;
      `
    }
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: ${props => props.theme.colorBodyButtonBackground};
  }
`;

const StyledTable = styled(Table)`
  && {
    /* Same easing as Material-UI . */
    transition: ${'opacity ' + duration.standard + 'ms ' + easing.easeInOut};
    opacity: ${props => props.loading ? 0.5 : 1.0};
    font-family: ${Constants.FONT_PRIMARY};
  }
`;

const StyledTableRow = styled(TableRow)`
  && {
    height: ${Constants.TABLE_ROW_HEIGHT_SM_AND_UP + 'px'};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        height: ${Constants.TABLE_ROW_HEIGHT_XS + 'px'};
      `
    }
  }
`;

const TableRowFooter = styled(StyledTableRow)`
  && {
    border-top-color: ${props => props.theme.colorTableRowBorder};
    border-top-style: solid;
    border-top-width: 2px;
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    border-color: ${props => props.theme.colorTableRowBorder};
    color: ${props => props.theme.colorBodyText};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
    white-space: nowrap;
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

/**
 * Class that implements a table component that supports pagination.
 */
class PagedTable extends Component {
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
     * Return the Relay-compliant connection object from the data retrieved by the query.
     * @param {Object} data The data retrieved by the query.
     * @return {Object} The connection object.
     */
    getDataConnection: PropTypes.func.isRequired,
    /**
     * Return an array of objects that describe the body rows, where each object contains:
     *  mapKey: A unique key that identifies the row.
     *  cells: An array of objects that describe the cells of the row, where each object contains:
     *    value: String containing the value of the cell.
     *    isNumeric: True if the cell contains a numeric value, false otherwise.
     *    link: Optional string which provides a link for the cell (to= prop of Link). Set to null
     *      for no link.
     * @param {Object} data The data retrieved by the query.
     * @return {Array} An array of objects that describe the body rows.
     */
    getBodyRows: PropTypes.func.isRequired,
    /**
     * An array of objects that describe the cells of the header row, where each object contains:
     *  value: String containing the value of the cell.
     *  isNumeric: True if the cell contains a numeric value, false otherwise.
     *  link: Optional string which provides a link for the cell (to= prop of Link). Set to null for
     *    no link.
     */
    headerRow: PropTypes.array.isRequired,
    /**
     * A Relay-compliant connection query document (gql`...`) to retrieve the table data. See
     * queryBlocksConnection.js for an example of the required query parameters and shape.
     */
    query: PropTypes.object.isRequired,
    /**
     * GraphQL query to get total count of rows.
     */
    queryCount: PropTypes.object.isRequired,
    /**
     * The title of the table.
     */
    title: PropTypes.string.isRequired,
  };

  /**
   * Create a PagedTable object.
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      pageIndex: 0,
      priorPageIndex: 0,
      priorStartCursor: null,
      priorEndCursor: null,
      rowsPerPage: 10
    };

    this.data = null;
    this.count = 0;
    this.firstId = null;
    this.startCursor = null;
    this.endCursor = null;

    // Bind to make 'this' work in callbacks.
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { title } = this.props;
    return (
      <StyledPaper elevation={1}>
        <TypographyTitle>{title}</TypographyTitle>
        {this.getTableElements()}
      </StyledPaper>
    );
  }

  /**
   * Return the elements for the table.
   * @return {Object} The elements for the table.
   * @private
   */
  getTableElements() {
    const { breakpoint, columnWidths, getDataConnection, query, queryCount } = this.props;
    const { pageIndex, priorPageIndex, priorStartCursor, priorEndCursor, rowsPerPage } = this.state;

    // Determine the query variables for the current page.
    let variables;
    const getCount = this.count === 0;
    if (getCount)
      variables = {first: rowsPerPage};
    else {
      const lastPageIndex = Math.ceil(this.count / rowsPerPage) - 1;
      if (pageIndex === priorPageIndex + 1)
        variables = {after: priorEndCursor, first: rowsPerPage};
      else if (pageIndex === priorPageIndex - 1)
        variables = {before: priorStartCursor, last: rowsPerPage};
      else if (pageIndex === lastPageIndex) {
        const lastPageRows = this.count - pageIndex * rowsPerPage;
        variables = {last: lastPageRows};
      }
      else
        // We query the first rowsPerPage even in the case when the first page button is clicked.
        // We count on the Apollo cache returning the same rows every time for this query.
        // Alternatively, we could query starting at firstId (see commented out code below), which
        // makes no assumptions about the Apollo cache, but that results in a double query when the
        // table is first loaded. If the current code causes problems, we can change to the version
        // which makes no assumptions about the cache.
        variables = {first: rowsPerPage};
        //variables = {where: { id_lte: this.firstId }, first: rowsPerPage};
    }

    return (
      <Query
        // Do not use the Apollo cache when getCount is true.
        fetchPolicy={getCount ? 'network-only' : null}
        query={query}
        variables={variables}
      >
        {({ loading, error, data }) => (
          <Query
            // Do not use the Apollo cache when getCount is true.
            fetchPolicy={getCount ? 'network-only' : null}
            query={queryCount}
          >
            {({ loading: loadingCount, error: errorCount, data: dataCount }) => {
              if (!loading && !error) {
                this.data = data;
                const connection = getDataConnection(this.data);
                if (this.firstId === null && connection.edges.length) // first query
                  this.firstId = connection.edges[0].node.id;
                this.startCursor = connection.pageInfo.startCursor;
                this.endCursor = connection.pageInfo.endCursor;
              }
              if (!loadingCount && !errorCount) {
                const connection = getDataConnection(dataCount);
                this.count = connection.aggregate.count;
              }
              return (
                <Grid container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <Fade in={loading} timeout={duration.standard} mountOnEnter unmountOnExit>
                    <DivCircularProgress breakpoint={breakpoint}>
                      <StyledCircularProgress size={Constants.MATERIAL_CIRCULAR_INDICATOR_SIZE} />
                    </DivCircularProgress>
                  </Fade>
                  <StyledTable loading={loading ? 1 : 0}>
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
                      {this.getHeaderRowElement()}
                    </TableHead>
                    <TableBody>
                      {this.getBodyRowElements()}
                    </TableBody>
                    <TableFooter>
                      {this.getFooterRowElement(loadingCount, errorCount, dataCount)}
                    </TableFooter>
                  </StyledTable>
                </Grid>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }

  /**
   * Return the element for the header row.
   * @return {Object} The element for the header row.
   * @private
   */
  getHeaderRowElement() {
    const { breakpoint, headerRow } = this.props;
    return (
      <StyledTableRow breakpoint={breakpoint}>
        {headerRow.map((cell, index) => {
          return (
            // Using index as the key is fine here and for cells in other rows, since we never add,
            // remove, reorder, or filter items in the cell arrays.
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
      </StyledTableRow>
    );
  }

  /**
   * Return the elements for all of the body rows.
   * @return {Object} The elements for all of the body rows.
   * @private
   */
  getBodyRowElements() {
    const { getBodyRows } = this.props;
    if (this.data) {
      let rows = getBodyRows(this.data);
      return rows.map((bodyRow, index) => {
        return this.getBodyRowElement(bodyRow);
      });
    }
    else
      return null;
  }

  /**
   * Return the element for the specified body row.
   * @param {Object} bodyRow Object that describes the body row.
   * @return {Object} The element for the specified body row.
   * @private
   */
  getBodyRowElement(bodyRow) {
    const { breakpoint } = this.props;
    return (
      <StyledTableRow breakpoint={breakpoint} key={bodyRow.mapKey}>
        {bodyRow.cells.map((cell, index) => {
          return (
            <StyledTableCell
              breakpoint={breakpoint}
              key={index}
              align={cell.isNumeric ? 'right' : 'inherit'}
              padding='checkbox'
            >
              {cell.link != null ?
                <StyledLink to={cell.link}>{cell.value}</StyledLink> :
                cell.value
              }
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    );
  }

  /**
   * Return the element for the footer row.
   * @return {Object} The element for the footer row.
   * @private
   */
  getFooterRowElement() {
    const { breakpoint } = this.props;
    const { pageIndex, rowsPerPage } = this.state;
    const show = this.count > 0;
    return (
      <Fade in={show} timeout={duration.standard}>
        <TableRowFooter breakpoint={breakpoint}>
          <TablePager
            breakpoint={breakpoint}
            rowsPerPageOptions={[10, 25, 50]}
            rowsPerPage={rowsPerPage}
            page={pageIndex}
            count={this.count}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </TableRowFooter>
      </Fade>
    );
  }

  /**
   * Callback fired when the page is changed.
   * @param {Object} event The event source of the callback.
   * @param {Object} page The selected page.
   * @private
   */
  handleChangePage(event, page) {
    this.setState(prevState => ({
      pageIndex: page,
      priorPageIndex: prevState.pageIndex,
      priorStartCursor: this.startCursor,
      priorEndCursor: this.endCursor
    }));
  }

  /**
   * Callback fired when the number of rows per page is changed.
   * @param {Object} event The event source of the callback.
   * @private
   */
  handleChangeRowsPerPage(event) {
    // When rows per page is changed, reset everything.
    const { rowsPerPage } = this.state;
    if (rowsPerPage !== event.target.value) {
      this.data = null;
      this.count = 0;
      this.firstId = null;
      this.startCursor = null;
      this.endCursor = null;
      this.setState({
        pageIndex: 0,
        priorPageIndex: 0,
        priorStartCursor: null,
        priorEndCursor: null,
        rowsPerPage: event.target.value
      });
    }
  }
}

export default PagedTable;
