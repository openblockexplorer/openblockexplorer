/**
 * @file BlockTransactionsTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import PropTypes from 'prop-types';
import FadeTable from '../FadeTable/FadeTable';
import getHashString from '../../utils/getHashString';

/**
 * This component displays a table of Transaction objects.
 */
class BlockTransactionsTable extends FadeTable { 
  static propTypes = {
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object,
    /**
     * Array of transaction objects.
     */
    transactions: PropTypes.array.isRequired
  };

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
            {value: getHashString(transaction.hash), isNumeric: false},
            {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true}
          ],
          hash: transaction.hash
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

  /**
   * Callback fired when a body row is clicked.
   * @param {Object} bodyRow A body row object returned by getBodyRows().
   * @private
   */
  handleBodyRowClick(bodyRow) {
    const hash = '0x' + bodyRow.hash;
    if (this.props.routerRef)
      this.props.routerRef.history.push(`/tx/${hash}`);
  }
}

export default BlockTransactionsTable;
