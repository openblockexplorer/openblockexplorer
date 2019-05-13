/**
 * @file Footer
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { loadCSS } from 'fg-loadcss';
import {
  Checkbox,
  Grid,
  Icon,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent';
import { Breakpoints, getBreakpoint } from '../../utils/breakpoint';
import Constants from '../../constants';

const FooterToolbar = styled(Toolbar)`
  && {
    /*!!! position: fixed; */
    left: 0;
    right: 0;
    bottom: 0;
    height: ${Constants.FOOTER_HEIGHT + 'px'};
    text-align: center;
    background: ${props => props.theme.colorFooterBackground};
    color: ${props => props.theme.colorFooterTextIcon};
    /* This doesn't seem to do anything!!!
    padding-left: 8;
    padding-right: 8; */
  }
`;

const OneThirdGrid = styled(Grid)`
  && {
    width: 33.33%;
`;

// Need narrower margins for left and right grids for small screens!!!
const LeftThirdGrid = styled(OneThirdGrid)`
  && {
    margin-left: 32px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      margin-left: 8px;
    }
`;

const RightThirdGrid = styled(OneThirdGrid)`
  && {
    margin-right: 32px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      margin-right: 8px;
    }
`;

const FooterTypography = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: 12px;
  }
`;

const FooterA = styled.a`
  && {
    color: ${props => props.theme.colorFooterTextIcon};
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AwesomeIconButtonGrid = styled(Grid)`
  && {
    // Look into why this is needed!!!
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      min-width: 35px;
    }
  }
`;

const AwesomeIconButton = styled(IconButton)`
  && {
    &:hover {
      background: ${props => fade(props.theme.colorIconButtonHover, props.theme.opacityActionHover)};
      color: ${props => props.theme.colorIconButtonHover};
      /* Reset on touch devices. */
      @media (hover: none) {
        background: inherit;
        color: inherit;
      }
    }
  }
`;

const AwesomeIcon = styled(Icon)`
  && {
    font-size: 20px;
  }
`;

const ThemeCheckbox = styled(Checkbox)`
  && {
    color: ${props => props.theme.colorFooterTextIcon};
    &:hover {
      background: ${props => fade(props.theme.colorIconButtonHover, props.theme.opacityActionHover)};
      color: ${props => props.theme.colorIconButtonHover};
      /* Reset on touch devices. */
      @media (hover: none) {
        background: inherit;
        color: ${props => props.theme.colorFooterTextIcon};
      }
    }
  }
`;

const ThemeSvgIcon = styled(SvgIcon)`
  && {
    margin-top: -1px;
    font-size: 17px;
  }
`;

/**
 * The Footer provides information related to the current screen.
 */
class Footer extends ResponsiveComponent {
  static propTypes = {
    /**
     * True is the theme is dark, false if the theme is light.
     */
    isThemeDark: PropTypes.bool.isRequired,
    /**
     * Callback fired when the value of the theme checkbox changes.
     */    
    handleThemeChange: PropTypes.func.isRequired,
    /**
     * Object containing information about the current react-router location.
     */
    location: PropTypes.object.isRequired
  };

  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    super.componentDidMount();

    loadCSS(Constants.URI_CDN_FONT_AWESOME, document.querySelector('#insertion-point-jss'));
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <FooterToolbar>
        {/*!!! <Grid container direction='row' justify='center' alignItems='center'> */}
          {/*!!! <Grid container direction='row' justify='center' alignItems='center' wrap='nowrap'> */}
            <LeftThirdGrid container direction='row' justify='flex-start' alignItems='center'>
              <Grid item>
                <FooterTypography color='inherit'>
                  {this.getCopyrightText()}
                </FooterTypography>
              </Grid>
            </LeftThirdGrid>
            <OneThirdGrid container direction='column' justify='center' alignItems='center'>
              <Grid item>
                <FooterTypography color='inherit'>
                  {this.getSimulatedText()}
                </FooterTypography>
              </Grid>
              { this.props.location.pathname === '/' &&
                <Grid item>
                  <FooterTypography color='inherit'>
                    {'('}
                    {this.getNomicsTextDescription()}
                    <FooterA href={Constants.URI_ABOUT_NOMICS} target='_blank' rel='noopener noreferrer'>
                      {this.getNomicsTextLink()}
                    </FooterA>
                    {')'}
                  </FooterTypography>
                </Grid>
              }
            </OneThirdGrid>
            <RightThirdGrid container direction='row' justify='flex-end' alignItems='center' wrap='nowrap'>
              <AwesomeIconButtonGrid item>
                <AwesomeIconButton
                  color='inherit'
                  href={Constants.URI_DFINITY_EXPLORER_TWITTER}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <AwesomeIcon className='fa fa-twitter' />
                </AwesomeIconButton>
              </AwesomeIconButtonGrid>
              <AwesomeIconButtonGrid item>
                <AwesomeIconButton
                  color='inherit'
                  href={Constants.URI_DFINITY_EXPLORER_GITHUB}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <AwesomeIcon className='fa fa-github' />
                </AwesomeIconButton>
              </AwesomeIconButtonGrid>
              <AwesomeIconButtonGrid item>
                <ThemeCheckbox
                  color='default'
                  checked={this.props.isThemeDark}
                  icon={
                    <ThemeSvgIcon>
                      <path d={Constants.ICON_SVG_PATH_THEME_LIGHT} />
                    </ThemeSvgIcon>
                  }
                  checkedIcon={
                    <ThemeSvgIcon>
                      <path d={Constants.ICON_SVG_PATH_THEME_DARK} />
                    </ThemeSvgIcon>
                  }
                  onChange={this.props.handleThemeChange}
                />
              </AwesomeIconButtonGrid>
            </RightThirdGrid>
          {/*!!! </Grid> */}
        {/*!!! </Grid> */}
      </FooterToolbar>
    );
  }

  /**
   * Return the copyright text.
   * @return {String} the copyright text.
   * @private
   */
   getCopyrightText() {
    const breakpoint = getBreakpoint();
    switch (breakpoint) {
      case Breakpoints.XS:
        return '© 2019 dfinityexplorer';
      case Breakpoints.SM:
        return '© 2019 dfinityexplorer contributors';
      default:
        return '© 2019 dfinityexplorer contributors | All rights reserved';
    }
  }

  /**
   * Return the "data is simulated" text.
   * @return {String} The "data is simulated" text.
   * @private
   */
  getSimulatedText() {
    const breakpoint = getBreakpoint();
    switch (breakpoint) {
      case Breakpoints.XS:
        return '(Simulated data)';
      case Breakpoints.SM:
        return '(Data is simulated)';
      default:
        return '(Network and price data is simulated)';
    }
  }

  /**
   * Return the Nomics attribution description text.
   * @return {String} The Nomics attribution description text.
   * @private
   */
  getNomicsTextDescription() {
    const breakpoint = getBreakpoint();
    switch (breakpoint) {
      case Breakpoints.XS:
        return 'Price data by ';
      default:
        return 'Price data provided by Nomics.com ';
    }
  }

  /**
   * Return the Nomics attribution link text.
   * @return {String} The Nomics attribution link text.
   * @private
   */
  getNomicsTextLink() {
    const breakpoint = getBreakpoint();
    switch (breakpoint) {
      case Breakpoints.XS:
        return 'Nomics.com';
      default:
        return 'Cryptocurrency Market Data API';
    }
  }
};

export default withRouter(Footer);
