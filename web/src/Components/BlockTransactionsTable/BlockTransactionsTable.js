/**
 * @file BlockTransactionsTable
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import FadeTable from '../FadeTable/FadeTable';

/**
 * This component displays a table of Transaction objects.
 */
class BlockTransactionsTable extends FadeTable { 
  /**
   * Return the title of the table.
   * @return {String} The title of the table.
   * @protected
   */
  getTitle() {
    return 'Transactions';
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
    if (transactions) {
      let bodyRows = transactions.map((transaction) => {
        return {
          mapKey: transaction.hash,
          cells: [
            {value: '0x' + transaction.hash, isNumeric: false},
            {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true}
          ]
        };
      });
      return bodyRows;
    }
    else
      return [];
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
}

export default BlockTransactionsTable;
