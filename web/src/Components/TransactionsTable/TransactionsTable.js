/**
 * @file TransactionsTable
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import { Query } from "react-apollo";
import FadeTable from '../FadeTable/FadeTable';
import queryTransactions from '../../graphql/queryTransactions';
import subscriptionTransaction from '../../graphql/subscriptionTransaction';

/**
 * This component displays a table of Transaction objects with data retrieved via GraphQL.
 */
class TransactionsTableWithData extends Component {
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
                loading
              />
            );
          else if (error)
            return (
              <TransactionsTable
                transactions={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                error
              />
            );
          else {
            return (
              <TransactionsTable
                transactions={data.transactions}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
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
   * @protected
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
            {value: this.getHashString(transaction.hash), isNumeric: false},
            {value: transaction.amount.toFixed(8).toString() + ' DFN', isNumeric: true}
          ]
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

export default TransactionsTableWithData;
