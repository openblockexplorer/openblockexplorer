/**
 * @file DEAppBar
 * @copyright Copyright (c) 2018 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Grid,
  IconButton,
  Input,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Zoom
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent'
import Constants from '../../constants';
import dfinityLogo from './dfinity-logo.png';

const StyledAppBar = styled(AppBar)`
  && {
    background: ${Constants.COLOR_DFINITY_BLACK};
  }
`;

const SearchAppBar = styled(AppBar)`
  && {
    background: white;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-family: 'Istok Web', sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      font-size: 0.8em;
    }
  }
`;

const DfinityTypography = styled(StyledTypography)`
  && {
    margin-left: 14px;
    letter-spacing: 12px;
    color: ${Constants.COLOR_TEXT_LIGHT};
    border-right: 1px solid ${Constants.COLOR_TEXT_LIGHT};
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      margin-left: 9px;
      letter-spacing: 8px;
    }
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    margin-left: 14px;
    letter-spacing: 7.5px;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      margin-left: 9px;
      letter-spacing: 5px;
    }
  }
`;

const StyledTabs = styled(({ color, ...other }) => (
  <Tabs {...other} classes={{ indicator: 'indicator' }} />
))`
  color: ${Constants.COLOR_TEXT_LIGHT};
  & .indicator {
      background: ${Constants.COLOR_TEXT_LIGHT};
  }
`;

const StyledTab = styled(Tab)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    letter-spacing: 1px;
    @media (max-width: ${Constants.BREAKPOINT_LG + 'px'}) {
      min-width: 50px;
    }
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      font-size: 6.5px;
    }
  }
`;

const StyledInput = styled(Input)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: 24px;
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      font-size: 12px;
    }
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  && {
    width: 32px;
    height: 32px;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: ${Constants.COLOR_TEXT_DARK};
    &:hover {
      color: ${Constants.COLOR_TEXT_LIGHT};
    }
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    width: 32px;
    height: 32px;
  }
`;

const TabsValues = {
  HOME: 0,
  BLOCKS: 1,
  TRANSACTIONS: 2,
  ACCOUNTS: 3,
  CONTRACTS: 4
}

/**
 * The App Bar provides content and actions related to the current screen.
 */
class DEAppBar extends ResponsiveComponent {
  /**
   * Create a DEAppBar object.
   * @constructor
   */
  constructor() {
    super();
    this.state = {tabValue: TabsValues.HOME, isSearchOn: false};

    // Bind to make 'this' work in callbacks.
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleLogoLinkClick = this.handleLogoLinkClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { isSearchOn } = this.state;
    return (
      <Fragment>
        {/* Shim to compensate for AppBar position='fixed'. */}
        <Toolbar />
          <Slide direction='down' in={isSearchOn} timeout={200} mountOnEnter unmountOnExit>
            <SearchAppBar>
              <Toolbar>
                <Grid container wrap='nowrap'>
                  <Grid container alignItems='center' justify='flex-start' wrap='nowrap'>
                    <Grid style={{flexGrow: '1'}} item>
                      <StyledInput
                        autoFocus
                        disableUnderline
                        fullWidth
                        placeholder='Search for block, transaction, or address'
                      />
                    </Grid>
                  </Grid>
                  <Grid style={{flexBasis: '0'}} container alignItems='center' justify='flex-end' wrap='nowrap'>
                    <Grid item>
                      <Zoom
                        in={true}
                        timeout={300}
                        unmountOnExit
                      >
                        <IconButton onClick={this.handleCloseClick}>
                          <StyledCloseIcon />
                        </IconButton>
                      </Zoom>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </SearchAppBar>
          </Slide>
          <Slide direction='down' in={!isSearchOn} timeout={200} mountOnEnter unmountOnExit>
            <StyledAppBar>
              {this.getToolbarContent()}
            </StyledAppBar>
          </Slide>
      </Fragment>
    );
  }

  /**
   * Return the elements for the toolbar based on the current breakpoint.
   * @return The elements for the toolbar based on the current breakpoint.
   * @private
   */
  getToolbarContent() {
    const is_breakpoint_md =
      window.matchMedia('(max-width: ' + Constants.BREAKPOINT_MD + 'px)').matches;
    if (is_breakpoint_md) {
      return (
        <Toolbar>
          <Grid container direction='column'>
            <Grid container alignItems='center' wrap='nowrap'>
              {this.getAppTitle()}
              <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
                <Grid item>
                  {this.getSearchButton()}
                </Grid>
              </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' wrap='nowrap' style={{marginTop: '-10px'}}>
              <Grid item>
                {this.getTabs()}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      );
    }
    else {
      return (
        <Toolbar>
          <Grid container alignItems='center' wrap='nowrap'>
            {this.getAppTitle()}
            <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
              <Grid item>
                {this.getTabs()}
              </Grid>
              <Grid item>
                {this.getSearchButton()}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      );
    }  
  }

  /**
   * Return the elements for the app title based on the current breakpoint.
   * @return The elements for the app title based on the current breakpoint.
   * @private
   */
  getAppTitle() {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to='/'
        onClick={this.handleLogoLinkClick}
      >
        <Grid container alignItems='center' justify='flex-start' wrap='nowrap'>
          <Grid item>
            <img
              src={dfinityLogo}
              height={this.getDfinityLogoHeight()}
              alt='logo'>
            </img>
          </Grid>
          <Grid item>
            <DfinityTypography>DFINITY</DfinityTypography>
          </Grid>
          <Grid item>
            <ExplorerTypography>ExpIorer</ExplorerTypography>
          </Grid>
        </Grid>
      </Link>
    );
  }

  /**
   * Return the height of the DFINITY logo based on the current breakpoint.
   * @return The height of the DFINITY logo based on the current breakpoint.
   * @private
   */
  getDfinityLogoHeight() {
    if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches)
      return 18;
    else
      return 27;
  }

  /**
   * Return the elements for the tabs based on the current breakpoint.
   * @return The elements for the tabs based on the current breakpoint.
   * @private
   */
  getTabs() {
    const is_breakpoint_sm =
      window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches;
    return (
      <StyledTabs value={this.getTabsComponentValue()} onChange={this.handleTabChange}>
        { is_breakpoint_sm ? <StyledTab label='Home' hidden component={Link} to='/' /> : null }
        <StyledTab label='Blocks' component={Link} to='/blocks' />
        <StyledTab label='Transactions' component={Link} to='/txs' />
        <StyledTab label='Accounts' component={Link} to='/accounts' />
        <StyledTab label='Contracts' component={Link} to='/contracts' />
      </StyledTabs>
    );
  }  

  /**
   * Return the elements for the search button on the current breakpoint.
   * @return The elements for the search button based on the current breakpoint.
   * @private
   */
  getSearchButton() {
    return (
      <Zoom
        in={true}
        timeout={300}
        unmountOnExit
      >
        <StyledIconButton onClick={this.handleSearchClick}>
          <StyledSearchIcon />
        </StyledIconButton>
      </Zoom>
    );
  }

  /**
   * Return the value for the Tabs component based on the tabValue enum.
   * @private
   */
  getTabsComponentValue() {
    const { tabValue } = this.state;
    const is_breakpoint_sm =
      window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches;
    return is_breakpoint_sm ? tabValue : (tabValue === TabsValues.HOME ? false : tabValue - 1);
  }
  
  /**
   * Callback fired when the value of the Tabs component changes.
   * @param {Object} event The event source of the callback.
   * @param {Number} value The index of the selected tab.
   * @private
   */
  handleTabChange(event, value) {
    const is_breakpoint_sm =
      window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches;
    this.setState({
      tabValue: (is_breakpoint_sm ? value : value + 1)
    });
  }

  /**
   * Callback fired when the logo link is clicked.
   * @private
   */
  handleLogoLinkClick() {
    this.setState({
      tabValue: TabsValues.HOME
    });
  }

  /**
   * Callback fired when the search button is clicked.
   * @private
   */
  handleSearchClick() {
    this.setState({
      isSearchOn: true
    });
  }

  /**
   * Callback fired when the close button is clicked.
   * @private
   */
  handleCloseClick() {
    this.setState({
      isSearchOn: false
    });
  }
};

export default DEAppBar;