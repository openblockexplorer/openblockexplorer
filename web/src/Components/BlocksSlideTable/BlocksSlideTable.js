/**
 * @file BlocksSlideTable
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import DynamicTable from '../DynamicTable/DynamicTable';
import queryBlocks from '../../graphql/queryBlocks';
import subscriptionBlock from '../../graphql/subscriptionBlock';

/**
 * This component displays a table of Block objects with data retrieved via GraphQL.
 */
class BlocksSlideTableWithData extends Component {
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
   * Create a BlocksSlideTableWithData object.
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
              <BlocksSlideTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                loading
              />
            );
          else if (error)
            return (
              <BlocksSlideTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                breakpoint={breakpoint}
                maxRows={maxRows}
                error
              />
            );
          else {
            return (
              <BlocksSlideTable
                blocks={data.blocks}
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
 * This component displays a table of Block objects where new blocks slide in.
 */
class BlocksSlideTable extends Component {
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
   * Create a BlocksSlideTable object.
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
    const { breakpoint, error, loading, maxRows } = this.props;
    return (
      <DynamicTable
        breakpoint={breakpoint}
        title='Blocks'
        columnWidths={['30%', '40%', '30%']}
        maxRows={maxRows}
        headerRow={[
          {value: 'Height', isNumeric: false},
          {value: 'Timestamp', isNumeric: false},
          {value: 'Transactions', isNumeric: true}
        ]}
        getBodyRows={this.getBodyRows}
        footerRow={[
          {value: null, isNumeric: false},
          {value: null, isNumeric: false},
          {value: '(simulated data)', isNumeric: true}
        ]}
        slide={!loading && !error}
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
}

export default BlocksSlideTableWithData;
