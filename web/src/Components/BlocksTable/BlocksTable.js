/**
 * @file BlocksTable
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import { Query } from "react-apollo";
import FadeTable from '../FadeTable/FadeTable';
import queryBlocks from '../../graphql/queryBlocks';
import subscriptionBlock from '../../graphql/subscriptionBlock';

/**
 * This component displays a table of Block objects with data retrieved via GraphQL.
 */
class BlocksTableWithData extends Component {
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
                loading
              />
            );
          else if (error)
            return (
              <BlocksTable
                blocks={[]}
                subscribeToNewObjects={subscribeToNewObjects}
                error
              />
            );
          else {
            return (
              <BlocksTable
                blocks={data.blocks}
                subscribeToNewObjects={subscribeToNewObjects}
                maxRows={this.props.maxRows}
              />
            );}
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
      document: subscriptionBlock,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data)
          return prev;

        // Add a new block to the DFINITY logo infinity symbol.
        if (this.props.appBarRef)
          this.props.appBarRef.addNewBlock();
        if (this.props.dfinitySymbolD3Ref)
          this.props.dfinitySymbolD3Ref.addNewBlock();

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
      {value: null, isNumeric: false},
      {value: '(simulated data)', isNumeric: true}
    ];
  }
}

export default BlocksTableWithData;
