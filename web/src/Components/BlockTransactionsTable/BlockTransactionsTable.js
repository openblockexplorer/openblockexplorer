/**
 * @file BlockTransactionsTable
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicTable from '../DynamicTable/DynamicTable';
import getHashString from '../../utils/getHashString';

/**
 * This component displays a table of a block's Transaction objects.
 */
class BlockTransactionsTable extends Component { 
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
    /**
     * Array of transaction objects.
     */
    transactions: PropTypes.array.isRequired
  };

  /**
   * Create a BlockTransactionsTable object.
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
    const { breakpoint, maxRows } = this.props;
    return (
      <DynamicTable
        breakpoint={breakpoint}
        title='Transactions'
        columnWidths={['60%', '40%']}
        maxRows={maxRows}
        headerRow={[
          {value: 'Hash', isNumeric: false},
          {value: 'Amount', isNumeric: true}
        ]}
        getBodyRows={this.getBodyRows}
        footerRow={[
          {value: null, isNumeric: false},
          {value: '(simulated data)', isNumeric: true}
        ]}
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
   * @return {Array} An array of objects that describe the body rows.
   * @protected
   */
  getBodyRows() {
    const { transactions } = this.props;
    if (transactions) {
      let bodyRows = transactions.map((transaction) => {
        return {
          mapKey: transaction.hash,
          cells: [
            {
              value: getHashString(transaction.hash),
              isNumeric: false,
              link: `/tx/0x${transaction.hash}`
            },
            {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true, link: null}
          ]
        };
      });
      return bodyRows;
    }
    else
      return [];
  }
}

export default BlockTransactionsTable;
