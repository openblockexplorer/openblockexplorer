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
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * Callback fired when a new block is added.
     */
    handleAddNewBlock: PropTypes.func,
    /**
     * The maximum number of rows in the table.
     */
    maxRows: PropTypes.number.isRequired
  };

  /**
   * Create a BlocksTableWithData object.
   * @constructor
   */
  constructor() {
    super();

    this.firstBlockAdded = false;

    // Bind to make 'this' work in callbacks.
    this.handleQueryCompleted = this.handleQueryCompleted.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const {breakpoint, maxRows} = this.props;
    return (
      <Query
        query={queryBlocks}
        variables={{ first: maxRows }}
        onCompleted={this.handleQueryCompleted}
      >
        {({ loading, error, data, subscribeToMore }) => {
          const subscribeToNewObjects = () => this.subscribeToNewObjects(subscribeToMore);
          if (loading)
            return (
              <BlocksTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                loading
              />
            );
          else if (error)
            return (
              <BlocksTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                error
              />
            );
          else {
            return (
              <BlocksTable
                blocks={data.blocks}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                slide
              />
            );
          }
        }}
      </Query>
    );
  }

  /**
   * Callback fired when the Query is completed.
   * @param {Object} data The query data.
   * @private
   */
  handleQueryCompleted(data) {
    if (!this.firstBlockAdded && data.blocks.length) {
      this.firstBlockAdded = true;

      // Add a new block to the parent.
      if (this.props.handleAddNewBlock)
        this.props.handleAddNewBlock(data.blocks[0]);
    }
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
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * Boolean indicating whether an error occurred with the GraphQL query.
     */
    error: PropTypes.bool,
    /**
     * Indicates whether new rows should slide in, expanding when they are created and collapsing
     * when they are destroyed.
     */
    slide: PropTypes.bool,
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
      {value: 'Height', isNumeric: false, link: null},
      {value: 'Timestamp', isNumeric: false, link: null},
      {value: 'Transactions', isNumeric: true, link: null}
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
      return [{mapKey: 'LOADING', cells: [{value: 'Loading...', isNumeric: false, link: null}]}];
    else if (error)
      return [{mapKey: 'ERROR', cells: [{value: 'Network error', isNumeric: false, link: null}]}];
    else {
      let bodyRows = blocks.map((block) => {
        const date = new Date(block.timestamp);
        return {
          mapKey: block.height,
          cells: [
            {
              value: block.height.toLocaleString(),
              isNumeric: false,
              link: `/block/${block.height}`
            },
            {value: date.toLocaleString(), isNumeric: false, link: null},
            {value: block.numTransactions.toLocaleString(), isNumeric: true, link: null}
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
      {value: null, isNumeric: false, link: null},
      {value: null, isNumeric: false, link: null},
      {value: '(simulated data)', isNumeric: true, link: null}
    ];
  }
}

export default BlocksTableWithData;
