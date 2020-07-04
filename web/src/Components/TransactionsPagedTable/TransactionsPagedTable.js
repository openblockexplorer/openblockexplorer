/**
 * @file TransactionsPagedTable
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagedTable from '../PagedTable/PagedTable';
import queryTransactionsConnection from '../../graphql/queryTransactionsConnection';
import queryTransactionsCount from '../../graphql/queryTransactionsCount';
import getHashString from '../../utils/getHashString';

/**
 * This component displays a paged table of Transaction objects.
 */
class TransactionsPagedTable extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired
  };

  /**
   * Create a TransactionsPagedTable object.
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
        title='Transactions'
        columnWidths={['60%', '40%']}
        headerRow={[
          {value: 'Hash', isNumeric: false},
          {value: 'Amount', isNumeric: true}
        ]}
        query={queryTransactionsConnection}
        queryCount={queryTransactionsCount}
        getDataConnection={data => data.transactionsConnection}
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
    let bodyRows = data.transactionsConnection.edges.map((edge) => {
      const transaction = edge.node;
      return {
        mapKey: transaction.hash,
        cells: [
          {
            value: getHashString(transaction.hash),
            isNumeric: false,
            link: `/tx/0x${transaction.hash}`
          },
          {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true}
        ]
      };
    });
    return bodyRows;
  }
}


export default TransactionsPagedTable;
