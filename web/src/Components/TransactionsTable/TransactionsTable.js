/**
 * @file TransactionsTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import FadeTable from '../FadeTable/FadeTable';
import queryTransactions from '../../graphql/queryTransactions';
import subscriptionTransaction from '../../graphql/subscriptionTransaction';
import getHashString from '../../utils/getHashString';

/**
 * This component displays a table of Transaction objects with data retrieved via GraphQL.
 */
class TransactionsTableWithData extends Component {
  static propTypes = {
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <Query query={queryTransactions} variables={{ first: this.props.maxRows }}>
        {({ loading, error, data, subscribeToMore }) => {
          const subscribeToNewObjects = () => this.subscribeToNewObjects(subscribeToMore);
          if (loading)
            return (
              <TransactionsTable
                transactions={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
                loading
              />
            );
          else if (error)
            return (
              <TransactionsTable
                transactions={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
                error
              />
            );
          else {
            return (
              <TransactionsTable
                transactions={data.transactions}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
                routerRef={this.props.routerRef}
              />
            );
          }
        }}
      </Query>
    );
  }

  /**
   * Subscribe to receive new objects of the body of the table using subscribeToMore and update the
   * query's store by merging the subscription data with the previous data.
   * @param {Function} subscribeToMore Function which gets called every time the subscription
   *  returns.
   * @private
   */
  subscribeToNewObjects(subscribeToMore) {
    subscribeToMore({
      document: subscriptionTransaction,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data)
          return prev;

        // Add the new transaction to the front of the transactions[] array, keeping at most
        // this.props.maxRows transactions.
        return {
          transactions: [
            subscriptionData.data.transaction.node,
            ...prev.transactions
          ].slice(0, this.props.maxRows)
        };
      }
    });
  }
}

/**
 * This component displays a table of Transaction objects.
 */
class TransactionsTable extends FadeTable { 
  static propTypes = {
    /**
     * Object containing GraphQL query error information.
     */
    error: PropTypes.object,
    /**
     * Boolean indicating whether the GraphQL query is in progress.
     */
    loading: PropTypes.bool,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object,
    /**
     * Function to subscribe to receive new objects of the body of the table.
     */
    subscribeToNewObjects: PropTypes.func,
    /**
     * Array of transaction objects.
     */
    transactions: PropTypes.array.isRequired
  };
  
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    // Subscribe to receive new objects of the body of the table.
    if (this.props.subscribeToNewObjects)
      this.props.subscribeToNewObjects();
  }

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
    const { transactions, loading, error } = this.props;
    if (loading)
      return [{mapKey: 'LOADING', cells: [{value: 'Loading...', isNumeric: false}]}];
    else if (error)
      return [{mapKey: 'ERROR', cells: [{value: 'Network error', isNumeric: false}]}];
    else {
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

export default TransactionsTableWithData;
