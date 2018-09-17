/**
 * @file DEAppBar
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
import React, { Fragment } from 'react';
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
  }
`;

const DfinityTypography = styled(StyledTypography)`
  && {
    margin-left: 14px;
    letter-spacing: 12px;
    color: ${Constants.COLOR_TEXT_LIGHT};
    border-right: 1px solid ${Constants.COLOR_TEXT_LIGHT};
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    margin-left: 14px;
    letter-spacing: 7.5px;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
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
  }
`;

const StyledInput = styled(Input)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: 24px;
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

/**
 * The App Bar provides content and actions related to the current screen.
 */
class DEAppBar extends React.Component {
  /**
   * Create a DEAppBar object.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {tabValue: false, isSearchOn: false};

    // Bind to make 'this' work in callbacks.
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { tabValue, isSearchOn } = this.state;
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
                        in={isSearchOn}
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
              <Toolbar>
                <a style={{ textDecoration: 'none' }} href='/'>
                  <Grid container alignItems='center' justify='flex-start' wrap='nowrap'>
                    <Grid item>
                      <img src={dfinityLogo} height='27' alt='logo'></img>
                    </Grid>
                    <Grid item>
                      <DfinityTypography>DFINITY</DfinityTypography>
                    </Grid>
                    <Grid item>
                      <ExplorerTypography>ExpIorer</ExplorerTypography>
                    </Grid>
                  </Grid>
                </a>
                <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
                  <Grid item>
                    <StyledTabs value={tabValue} onChange={this.handleTabChange} >
                      <StyledTab label='Blocks' />
                      <StyledTab label='Transactions' />
                      <StyledTab label='Accounts' />
                      <StyledTab label='Contracts' />
                    </StyledTabs>
                  </Grid>
                  <Grid item>
                  <Zoom
                    in={!isSearchOn}
                    timeout={300}
                    unmountOnExit
                  >
                    <StyledIconButton onClick={this.handleSearchClick}>
                      <StyledSearchIcon />
                    </StyledIconButton>
                  </Zoom>
                  </Grid>
                </Grid>
              </Toolbar>
            </StyledAppBar>
          </Slide>
      </Fragment>
    );
  }

  /**
   * Callback fired when the value of the Tabs component changes.
   * @param {Object} event The event source of the callback.
   * @param {Number} value The index of the selected tab.
   * @private
   */
  handleTabChange(event, value) {
    this.setState({
      tabValue: value
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

  /**
   * Callback fired when the search button is clicked.
   * @private
   */
  handleSearchClick() {
    this.setState({
      isSearchOn: true
    });
  }
};

export default DEAppBar;