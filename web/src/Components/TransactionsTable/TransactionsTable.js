/**
 * @file TransactionsTable
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import FadeTable from '../FadeTable/FadeTable';

/**
 * This component displays a table of Transaction objects.
 */
class TransactionsTable extends FadeTable {
  /**
   * Return the title of the table.
   * @return {String} The title of the table.
   * @protected
   */
  getTitle() {
    return 'Recent Transactions';
  }

  /**
   * Return an array that specifies the column widths of the table.
   * @return {Array} An array that specifies the column widths of the table.
   * @protected
   */
  getColumnWidths() {
    return ['60%', '40%'];
  }

  /**
   * Return an array of objects that describe the cells of the header row.
   * @return {Array} An array of objects that describe the cells of the header row.
   * @protected
   */
  getHeaderRow() {
    return [
      {value: 'Hash', isNumeric: false},
      {value: 'Amount', isNumeric: true}
    ];
  }

  /**
   * Return an array of objects that describe the body rows.
   * @return {Array} An array of objects that describe the body rows.
   * @protected
   */
  getBodyRows() {
    const { transactions } = this.props;
    let bodyRows = transactions.map((transaction) => {
      return {
        mapKey: transaction.hash,
        cells: [
          {value: this.getHashString(transaction.hash), isNumeric: false},
          {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true}
        ]
      };
    });
    return bodyRows;    
  }

  /**
   * Return an array of objects that describe the cells of the footer row.
   * @return {Array} An array of objects that describe the cells of the footer row.
   * @protected
   */
  getFooterRow() {
    return [
      {value: null, isNumeric: false},
      {value: '(simulated data)', isNumeric: true}
    ];
  }

  /**
   * Return a string containing the hash which has been modified for display in the table.
   * @param {String} hash The hash to modify for display.
   * @return {Array} A string containing the hash which has been modified for display in the table.
   * @protected
   */
  getHashString(hash) {
    const maxLength = 24;
    if (hash.length > maxLength) {
      const first = hash.substring(0, maxLength - 4);
      const last = hash.substr(hash.length - 4);
      return first + "..." + last;
    }
    else
      return hash;
  }
}

export default TransactionsTable;
