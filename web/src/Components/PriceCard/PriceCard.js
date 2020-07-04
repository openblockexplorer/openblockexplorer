/**
 * @file PriceCard
 * @copyright Copyright (c) 2018-2020 Dylan Miller and openblockexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import DashCard from '../DashCard/DashCard';
import queryPrice from '../../graphql/queryPrice';
import subscriptionPrice from '../../graphql/subscriptionPrice';
import Constants from '../../constants';

/**
 * This component displays a dashboard card with price data retrieved via GraphQL.
 */
class PriceCard extends Component {
  static propTypes = {
    /**
     * The index of the card. Used for theming.
     */
    cardIndex: PropTypes.number.isRequired,
    /**
     * The className passed in by styled-components when styled(MyComponent) notation is used on
     * this component.
     */
    className: PropTypes.string
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    let { cardIndex, className } = this.props;
    
    return (
      <Query query={queryPrice}>
        {({ loading, error, data, subscribeToMore }) => {
          const subscribeToNewObjects = () => this.subscribeToNewObjects(subscribeToMore);
          let price;
          if (loading)
            price = 'Loading...';
          else if (error)
            price = 'Network error';
          else
            price = '$' + data.price.price.toFixed(2);
          return (
            <DashCard
              className={className}
              cardIndex={cardIndex}
              title='Price'
              value={price}
              svgIconPath={Constants.ICON_SVG_PATH_PRICE}
              subscribeToNewObjects={subscribeToNewObjects}
            />
          );
        }}
      </Query>
    );
  }

  /**
   * Subscribe to receive new Price objects using subscribeToMore, and update the query's store by
   * replacing the previous Price Object with the new Price object.
   * @param {Function} subscribeToMore Function which gets called every time the subscription
   *  returns.
   * @private
   */
  subscribeToNewObjects(subscribeToMore) {
    subscribeToMore({
      document: subscriptionPrice,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data)
          return prev;
        return {price: subscriptionData.data.price.node};
      }
    });
  }
}

export default PriceCard;
