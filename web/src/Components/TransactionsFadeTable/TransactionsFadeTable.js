/**
 * @file TransactionsFadeTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import DynamicTable from '../DynamicTable/DynamicTable';
import queryTransactions from '../../graphql/queryTransactions';
import subscriptionTransaction from '../../graphql/subscriptionTransaction';
import getHashString from '../../utils/getHashString';

/**
 * This component displays a table of Transaction objects with data retrieved via GraphQL.
 */
class TransactionsFadeTableWithData extends Component {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const {breakpoint, maxRows} = this.props;
    return (
      <Query query={queryTransactions} variables={{ first: maxRows }}>
        {({ loading, error, data, subscribeToMore }) => {
          const subscribeToNewObjects = () => this.subscribeToNewObjects(subscribeToMore);
          if (loading)
            return (
              <TransactionsFadeTable
                transactions={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                loading
              />
            );
          else if (error)
            return (
              <TransactionsFadeTable
                transactions={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                error
              />
            );
          else {
            return (
              <TransactionsFadeTable
                transactions={data.transactions}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
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
            ...(prev != null ? prev.transactions : []) // check if prev is undefined
          ].slice(0, this.props.maxRows)
        };
      }
    });
  }
}

/**
 * This component displays a table of Transaction objects where new transacations fade in.
 */
class TransactionsFadeTable extends Component { 
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * Boolean indicating whether an error occurred with the GraphQL query.
     */
    error: PropTypes.bool,
    /**
     * Boolean indicating whether the GraphQL query is in progress.
     */
    loading: PropTypes.bool,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired,
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
   * Create a TransactionsFadeTable object.
   * @constructor
   */
  constructor() {
    super();

    // Bind to make 'this' work in callbacks.
    this.getBodyRows = this.getBodyRows.bind(this);
  }

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
    const { transactions, loading, error } = this.props;
    if (loading)
      return [{mapKey: 'LOADING', cells: [{value: 'Loading...', isNumeric: false, link: null}]}];
    else if (error)
      return [{mapKey: 'ERROR', cells: [{value: 'Network error', isNumeric: false, link: null}]}];
    else {
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
  }
}

export default TransactionsFadeTableWithData;
