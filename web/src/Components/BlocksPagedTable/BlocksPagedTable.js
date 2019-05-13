/**
 * @file BlocksPagedTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagedTable from '../PagedTable/PagedTable';
import queryBlocksConnection from '../../graphql/queryBlocksConnection';

/**
 * This component displays a paged table of Block objects.
 */
class BlocksPagedTable extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired
  };

  /**
   * Create a BlocksPagedTable object.
   * @constructor
   */
  constructor() {
    super();

    // Bind to make 'this' work in callbacks.
    this.getBodyRows = this.getBodyRows.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { breakpoint } = this.props;
    return (
      <PagedTable
        breakpoint={breakpoint}
        title='Blocks'
        columnWidths={['30%', '40%', '30%']}
        headerRow={[
          {value: 'Height', isNumeric: false},
          {value: 'Timestamp', isNumeric: false},
          {value: 'Transactions', isNumeric: true}
        ]}
        query={queryBlocksConnection}
        getDataConnection={data => data.blocksConnection}
        getBodyRows={this.getBodyRows}
      />
    );
  }

  /**
   * Return an array of objects that describe the body rows, where each object contains:
   *  mapKey: A unique key that identifies the row.
   *  cells: An array of objects that describe the cells of the row, where each object contains:
   *    value: String containing the value of the cell.
   *    isNumeric: True if the cell contains a numeric value, false otherwise.
   *    link: Optional string which provides a link for the cell (to= prop of Link). Set to null
   *      for no link.
   * @param {Object} data The data retrieved by getQuery().
   * @return {Array} An array of objects that describe the body rows.
   * @protected
   */
  getBodyRows(data) {
    let bodyRows = data.blocksConnection.edges.map((edge) => {
      const block = edge.node;
      const date = new Date(block.timestamp);
      return {
        mapKey: block.height,
        cells: [
          {
            value: block.height.toLocaleString(),
            isNumeric: false,
            link: `/block/${block.height}`
          },
          {value: date.toLocaleString(), isNumeric: false},
          {value: block.numTransactions.toLocaleString(), isNumeric: true}
        ]
      };
    });
    return bodyRows;
  }
}

export default BlocksPagedTable;
