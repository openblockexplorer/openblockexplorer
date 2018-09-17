/**
 * @file BlocksTable
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
import FadeTable from '../FadeTable/FadeTable';

/**
 * This component displays a table of Block objects.
 */
class BlocksTable extends FadeTable {
  /**
   * Return the title of the table.
   * @return {String} The title of the table.
   * @protected
   */
  getTitle() {
    return 'Recent Blocks';
  }

  /**
   * Return an array that specifies the column widths of the table.
   * @return {Array} An array that specifies the column widths of the table.
   * @protected
   */
  getColumnWidths() {
    return ['30%', '40%', '30%'];
  }

  /**
   * Return an array of objects that describe the cells of the header row.
   * @return {Array} An array of objects that describe the cells of the header row.
   * @protected
   */
  getHeaderRow() {
    return [
      {value: 'Height', isNumeric: false},
      {value: 'Timestamp', isNumeric: false},
      {value: 'Transactions', isNumeric: true}
    ];
  }

  /**
   * Return an array of objects that describe the body rows.
   * @return {Array} An array of objects that describe the body rows.
   * @protected
   */
  getBodyRows() {
    const { blocks } = this.props;
    let bodyRows = [];
    blocks.map((block) => {
      bodyRows.push({
        mapKey: block.height,
        cells: [
          {value: block.height.toLocaleString(), isNumeric: false},
          {value: block.date.toLocaleString(), isNumeric: false},
          {value: block.numTransactions.toLocaleString(), isNumeric: true}
        ]
      });
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
      {value: null, isNumeric: false},
      {value: '(simulated data)', isNumeric: true}
    ];
  }
}

export default BlocksTable;
