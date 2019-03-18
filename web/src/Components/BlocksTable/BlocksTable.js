/**
 * @file BlocksTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import FadeTable from '../FadeTable/FadeTable';
import queryBlocks from '../../graphql/queryBlocks';
import subscriptionBlock from '../../graphql/subscriptionBlock';

/**
 * This component displays a table of Block objects with data retrieved via GraphQL.
 */
class BlocksTableWithData extends Component {
  static propTypes = {
    /**
     * Callback fired when a new block is added.
     */
    handleAddNewBlock: PropTypes.func,
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
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() { // remove if not needed!!!
    //!!!this.noBlocksAdded = true;
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <Query query={queryBlocks} variables={{ first: this.props.maxRows }}>
        {({ loading, error, data, subscribeToMore }) => {
          const subscribeToNewObjects = () => this.subscribeToNewObjects(subscribeToMore);
          if (loading)
            return (
              <BlocksTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
                loading
              />
            );
          else if (error)
            return (
              <BlocksTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
                error
              />
            );
          else {
            // Add a new block to the parent.
            // PROBLEM: Can't do this because it results in HomePage updating state during a render!!!
            //!!! if (this.noBlocksAdded && data.blocks.length && this.props.handleAddNewBlock) {
            //   this.noBlocksAdded = false;
            //   this.props.handleAddNewBlock(data.blocks[0]);
            // }

            return (
              <BlocksTable
                blocks={data.blocks}
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
   * @protected
   */
  subscribeToNewObjects(subscribeToMore) {
    subscribeToMore({
      document: subscriptionBlock,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data)
          return prev;

        // Add a new block to the parent.
        if (this.props.handleAddNewBlock)
          this.props.handleAddNewBlock(subscriptionData.data.block.node);

        // Add the new block to the front of the blocks[] array, keeping at most this.props.maxRows
        // blocks.
        return {
          blocks: [
            subscriptionData.data.block.node,
            ...prev.blocks
          ].slice(0, this.props.maxRows)
        };
      }
    });

  }
}

/**
 * This component displays a table of Block objects.
 */
class BlocksTable extends FadeTable {
  static propTypes = {
    /**
     * Array of block objects.
     */
    blocks: PropTypes.array.isRequired,
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
    subscribeToNewObjects: PropTypes.func
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
    return 'Blocks';
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
    const { blocks, loading, error } = this.props;
    if (loading)
      return [{mapKey: 'LOADING', cells: [{value: 'Loading...', isNumeric: false}]}];
    else if (error)
      return [{mapKey: 'ERROR', cells: [{value: 'Network error', isNumeric: false}]}];
    else {
      let bodyRows = blocks.map((block) => {
        const date = new Date(block.timestamp);
        return {
          mapKey: block.height,
          cells: [
            {value: block.height.toLocaleString(), isNumeric: false},
            {value: date.toLocaleString(), isNumeric: false},
            {value: block.numTransactions.toLocaleString(), isNumeric: true}
          ],
          height: block.height
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
    if (this.props.routerRef)
      this.props.routerRef.history.push(`/block/${bodyRow.height}`);
  }
}

export default BlocksTableWithData;
