/**
 * @file DashCard
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Grid,
  Paper,
  SvgIcon,
  Typography
} from '@material-ui/core';
import Constants from '../../constants';

const StyledSvgIcon = styled(SvgIcon)`
  && {
    margin: 30px;
    font-size: 42px;
    opacity: ${props => props.theme.colorDashCardIconOpacity};
    color: ${props => props.theme.colorDashCardIcon[props.cardindex]};
  }
`;

const StyledTypographyTitle = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-weight: 200;
    font-size: 14px;
    /* Not sure where we're setting color, but we're using white for both light and dark themes. We should set color explicitly and use a theme to do so!!! */
    /* Actually, I think we're already setting it based on theme in the HomePage!!! */
    /* color: ${Constants.COLOR_TEXT_LIGHT}; */
  }
`;

const StyledTypographyValue = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-weight: 200;
    font-size: 28px;
  }
`;

/**
 * This component displays a dashboard card.
 */
class DashCard extends Component { 
  static propTypes = {
    /**
     * The index of the card. Used for theming.
     */
    cardIndex: PropTypes.number.isRequired,
    /**
     * The className passed in by styled-components when styled(MyComponent) notation is used on
     * this component.
     */
    className: PropTypes.string,
    /**
     * The d attribute of the SvgIcon path.
     */
    svgIconPath: PropTypes.string.isRequired,
    /**
     * The title string of the card.
     */
    title: PropTypes.string.isRequired,
    /**
     * The value string of the card.
     */
    value: PropTypes.string.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    let {
      cardIndex,
      className,
      svgIconPath,
      title,
      value
    } = this.props;
    return (
      <Paper className={className} elevation={1}>
        <Grid container alignItems='center' direction='row' justify='flex-start' wrap='nowrap'>
          <Grid item>
          <StyledSvgIcon cardindex={cardIndex}>
            <path d={svgIconPath} />
          </StyledSvgIcon>
          </Grid>
          <Grid item>
            <Grid container alignItems='flex-start' direction='column' justify='center'>
              <Grid item>
              <StyledTypographyTitle className={className}>
                {title}
              </StyledTypographyTitle>
              </Grid>
              <Grid item>
              <StyledTypographyValue className={className}>
                {value}
              </StyledTypographyValue>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default DashCard;
