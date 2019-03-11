/**
 * @file DEAppBar
 * @copyright Copyright (c) 2018-2019 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slide,
  SvgIcon,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Zoom
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import zIndex from '@material-ui/core/styles/zIndex';
import Downshift from 'downshift';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent'
import querySearchAutoComplete from '../../graphql/querySearchAutoComplete';
import { Breakpoints, getBreakpoint, isBreakpointLessOrEqualTo, isBreakpointGreaterOrEqualTo } from '../../utils/breakpoint';
import Constants from '../../constants';
import dfinityExplorerLogo from './dfinity-explorer-logo.png';

const StyledAppBar = styled(AppBar)`
  && {
    background: ${props => props.theme.colorAppBarBackground};
    /* AppBar is above Drawer */
    z-index: ${zIndex.drawer + 1};
  }
`;

const SearchAppBar = styled(AppBar)`
  && {
    background: white;
    /* AppBar is above Drawer */
    z-index: ${zIndex.drawer + 1};
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: 12px;
    padding-right: 12px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`;

const SearchToolbar = styled(Toolbar)`
  && {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 12px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 8px;
      padding-right: 4px;
    }
  }
`;

const ImgProductIcon = styled.img`
  && {
    margin-left: 12px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      margin-left: 0px;
    }
  }
`;

// Specify font-size in px rather than rem for app name, since it should not change based on browser
// settings.
const TypographyAppName = styled(Typography)`
  && {
    font-family: 'Istok Web', sans-serif;
    font-weight: bold;
    font-size: 20px;
    user-select: none;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      font-size: 14px;
    }
  }
`;

const TypographyDfinity = styled(TypographyAppName)`
  && {
    margin-left: 12px;
    letter-spacing: 12px;
    color: ${props => props.theme.colorAppBarDfinityText};
    border-right: 1px solid ${props => props.theme.colorAppBarDfinityText};
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      margin-left: 8.4px;
      letter-spacing: 8.4px;
    }
  }
`;

const TypographyExplorer = styled(TypographyAppName)`
  && {
    margin-left: 14px;
    letter-spacing: 7.5px;
    color: ${props => props.theme.colorAppBarExplorerText};
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      margin-left: 9.8px;
      letter-spacing: 5.25px;
    }
  }
`;

// Need to use new breakpoint method here and elsewhere, but probably call GetBreakpoint without drawer from render()!!!
const InputSearch = styled(Input)`
  && {
    /* margin-top is used to center the Input vertically, and depends on font-size. */
    margin-top: 0.375rem;
    color: ${props => props.theme.colorSearchText};
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_H6};
    @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
      margin-top: 0.625rem;
      /* font-size "Body 2" is not small enough to fit a hash, but this is smallest we should go. */
      font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
    }
  }
`;

/**
 * List for search auto-complete list.
 */
const ListSearch = styled(List)`
  && {
    /* The List component has top and bottom padding of 8px. Remove it. */
    padding-top: 0px;
    padding-bottom: 0px;
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_1};
    color:  ${props => props.theme.colorSearchText};
    @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
      font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
    }
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      /* This font size is smaller than Material Design standards, but fits a auto-complete hash. */
      /* BUG: A full hash pushes the close button off of the screen with this font size!!! */
      /* This bug existed in old code too, but you could see a tiny bit of the close button!!! */
      /* It seems like this could have to do with style={{ flexGrow: '1' }}>!!! */
      /* For now, changing the font size smaller than 0.5625rem to avoid bug!!! */
      /* font-size: 0.5625rem; this is the size we would like!!! */
      font-size: 7px;
    }
  }
`;

/**
 * ListItem for search auto-complete list.
 */
const ListItemSearch = styled(ListItem)`
  && {
    /* Use them for the highlighted/focused color!!! */
    background: ${props => props.highlighted ? Constants.COLOR_GRAY_ON_WHITE : 'initial'};
  }
`;

/**
 * SearchIcon for search auto-complete list.
 */
const SearchIconListSearch = styled(SearchIcon)`
  && {
    color: ${props => props.theme.colorSearchIcon};
    /* Sizes here are based on ListSearch font-sizes. */
    width: ${Constants.MATERIAL_FONT_SIZE_BODY_1};
    height: ${Constants.MATERIAL_FONT_SIZE_BODY_1};
    margin-right: calc(${Constants.MATERIAL_FONT_SIZE_BODY_1} / 2);
    @media (max-width: ${Constants.BREAKPOINT_MAX_SM + 'px'}) {
      width: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
      height: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
      margin-right: calc(${Constants.MATERIAL_FONT_SIZE_BODY_2} / 2);
    }
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      /* BUG: 0.5625rem is the size we would like (see above)!!! */
      width: 7px;
      height: 7px;
      margin-right: calc(7px / 2);
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: ${props => props.theme.colorAppBarTextButton};
    &:hover {
      color: ${props => props.theme.colorAppBarButtonHover};
    }
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  && {
    width: 24px;
    height: 24px;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    width: 32px;
    height: 32px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      width: 24px;
      height: 24px;
    }
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  && {
    width: 32px;
    height: 32px;
    @media (max-width: ${Constants.BREAKPOINT_MAX_XS + 'px'}) {
      width: 24px;
      height: 24px;
    }
  }
`;

const StyledSwipeableDrawer = styled(({ ...other }) => (
  <SwipeableDrawer {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${Constants.DRAWER_WIDTH + 'px'};
    background: ${props => props.theme.colorDrawerBackground};
  }
`;

const StyledDrawer = styled(({ ...other }) => (
  <Drawer {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${Constants.DRAWER_WIDTH + 'px'};
    background: ${props => props.theme.colorDrawerBackground};
  }
`;

const DrawerListItemIcon = styled(ListItemIcon)``;

const DrawerListItemText = styled(({ ...other }) => (
  <ListItemText {...other} classes={{ primary: 'primary' }} />
))``;

const DrawerListItem = styled(ListItem)`
  && {
    ${DrawerListItemIcon} {
      color: ${
        props => props.selected ?
          props.theme.colorAppBarMenuIconSelected :
          props.theme.colorAppBarTextButton
      };
    }
    ${DrawerListItemText} {
      margin-left: -8px;
      & .primary {
        font-family: ${Constants.FONT_PRIMARY};
        font-size: ${Constants.MATERIAL_FONT_SIZE_BUTTON};
        font-weight: ${props => props.selected ? 600 : 400};
        color: ${
          props => props.selected ?
            props.theme.colorAppBarMenuIconSelected :
            props.theme.colorAppBarTextButton
        };
      }
    }
  }
`;

// DCM 2019-02-02: I tried for a few hours to change the "selected" background color of a ListItem
// using styled-components, but I was unsuccessful even though it seems like the code below should
// work. I was able to change the color using the Material-UI withStyles() technique of styling:
// https://stackoverflow.com/questions/50371315/how-to-override-material-ui-menuitem-selected-background-color
// However, that technique does not have access to props, so it would not work well with the way
// we're currently doing theming. There is likely a way to get this working in a way that does not
// use styled-components, but the "selected" background color is not important enough to spend the
// time on this issue right now.
/*const DrawerListItem = styled(({ ...other }) => (
  <ListItem classes={{ selected: 'selected' }} {...other} />
))`
  && {
    background: pink;
    &:focus {
      background: cyan;
    }
    &:hover {
      background: red;
    }
    // All of the above colors work, but the "selected" background color does not work.
    & .selected {
      background: blue !important;
    }
  }
`;*/

/**
 * The App Bar provides content and actions related to the current screen.
 */
class DEAppBar extends ResponsiveComponent {
  static propTypes = {
    /**
     * Callback fired when the App Bar is resized.
     */
    handleAppBarResize: PropTypes.func,
    /**
     * Callback fired when the desktop drawer (large screens) menu button is clicked.
     */
    handleDesktopDrawerMenuClick: PropTypes.func.isRequired,
    /**
     * Callback fired when the mobile drawer (small screens) menu button is clicked.
     */
    handleMobileDrawerMenuClick: PropTypes.func.isRequired,
    /**
     * True if the desktop drawer (large screens) is open.
     */    
    isDesktopDrawerOpen: PropTypes.bool.isRequired,
    /**
     * True if the mobile drawer (small screens) is open.
     */    
    isMobileDrawerOpen: PropTypes.bool.isRequired,
    /**
     * Object containing information about the current react-router location.
     */
    location: PropTypes.object.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object
  };

  /**
   * Create a DEAppBar object.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      isSearchOn: false,
      searchQuery: ''
    };

    this.toolbarDivRef = React.createRef();

    this.maxSearchAutoCompleteItems = 6;

    // Bind to make 'this' work in callbacks.
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleDownshiftStateChange = this.handleDownshiftStateChange.bind(this);
    this.handleDownshiftChange = this.handleDownshiftChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.isActiveRoute = this.isActiveRoute.bind(this);
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
        {/* Toolbar shim to compensate for AppBar position='fixed'. */}
        <div ref={this.toolbarDivRef}>
          <Toolbar />
        </div>
        <Slide direction='down' in={isSearchOn} timeout={200} mountOnEnter unmountOnExit>
          <SearchAppBar elevation={2}>
            {this.getToolbarSearchContent()}
          </SearchAppBar>
        </Slide>
        <Slide direction='down' in={!isSearchOn} timeout={200} mountOnEnter unmountOnExit>
          <StyledAppBar elevation={2}>
            {this.getToolbarDefaultContent()}
          </StyledAppBar>
        </Slide>
        {this.getDrawer()}
      </Fragment>
    );
  }

  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree).
   * @public
   */
  componentDidMount() {
    super.componentDidMount();

    // Pass App Bar height to owner.
    if (this.props.handleAppBarResize)
      this.props.handleAppBarResize(this.toolbarDivRef.current.offsetHeight);
  }

  /**
   * Force the component to re-render when the window is resized.
   * @private
   */
  handleWindowResize() {
    super.handleWindowResize();

    // Pass App Bar height to owner.
    if (this.props.handleAppBarResize)
      this.props.handleAppBarResize(this.toolbarDivRef.current.offsetHeight);

    // Close the mobile drawer (small screens) when screen is resized larger, so that it does not
    // reappear when the screen is resized smaller.
    if (isBreakpointGreaterOrEqualTo(Breakpoints.MD) && this.props.isMobileDrawerOpen)
      this.props.handleMobileDrawerMenuClick();
  }

  /**
   * Return the elements for the search toolbar based on the current breakpoint.
   * @return {Object} The elements for the search toolbar based on the current breakpoint.
   * @private
   */
  getToolbarSearchContent() {
    return (
      <SearchToolbar variant='dense'>
        <Grid container direction='row' justify='space-between' alignItems='flex-start' wrap='nowrap'>
          <Grid item style={{ flexGrow: '1' }}>
            <Downshift
              onStateChange={this.handleDownshiftStateChange}
              onChange={this.handleDownshiftChange}
              selectedItem={this.state.searchQuery}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
              }) => (
                <div>
                  <form onSubmit={this.handleSearchSubmit}>
                    <InputSearch
                      {...getInputProps({
                        autoFocus: true,
                        disableUnderline: true,
                        fullWidth: true,
                        placeholder: 'Search for block, transaction, or address'
                      })}
                    />
                  </form>
                  <Query
                    query={querySearchAutoComplete}
                    variables={{ query: inputValue, first: this.maxSearchAutoCompleteItems }}
                  >
                    {({ loading, error, data }) => {
                      if (loading || error || !data.searchAutoComplete || !isOpen)
                        return <ListSearch />;
                      return (    
                        <ListSearch {...getMenuProps()}>
                          {data.searchAutoComplete.items.map((item, index) => (
                            <ListItemSearch
                              disableGutters
                              highlighted={highlightedIndex === index}
                              {...getItemProps({
                                key: item,
                                index,
                                item
                              })}
                            >
                              <ListItemIcon>
                                <SearchIconListSearch />
                              </ListItemIcon>
                              {item}
                            </ListItemSearch>
                          ))}
                        </ListSearch>
                      );
                    }}
                  </Query>
                </div>
              )}
            </Downshift>
          </Grid>
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
      </SearchToolbar>
    );
  }

  /**
   * Return the elements for the toolbar based on the current breakpoint.
   * @return {Object} The elements for the toolbar based on the current breakpoint.
   * @private
   */
  getToolbarDefaultContent() {
    if (isBreakpointLessOrEqualTo(Breakpoints.SM)) {
      return (
        <StyledToolbar>
          <Grid container direction='column'>
            <Grid container alignItems='center' wrap='nowrap'>
              <Grid item>
                <StyledIconButton onClick={this.props.handleMobileDrawerMenuClick}>
                  <StyledMenuIcon />
                </StyledIconButton>
              </Grid>
              {this.getAppTitle()}
              <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
                <Grid item>
                  {this.getSearchButton()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledToolbar>
      );
    }
    else {
      return (
        <StyledToolbar>
          <Grid container alignItems='center' wrap='nowrap'>
            <Grid item>
              <StyledIconButton onClick={this.props.handleDesktopDrawerMenuClick}>
                <StyledMenuIcon />
              </StyledIconButton>
            </Grid>
            {this.getAppTitle()}
            <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
              <Grid item>
                {this.getSearchButton()}
              </Grid>
            </Grid>
          </Grid>
        </StyledToolbar>
      );
    }  
  }

  /**
   * Return the elements for the app title based on the current breakpoint.
   * @return {Object} The elements for the app title based on the current breakpoint.
   * @private
   */
  getAppTitle() {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to='/'
      >
        <Grid container alignItems='center' justify='flex-start' wrap='nowrap'>
          <Grid item>
            <ImgProductIcon
              src={dfinityExplorerLogo}
              height={this.getProductIconHeight()}
              alt='logo'
            >
            </ImgProductIcon>
          </Grid>
          <Grid item>
            <TypographyDfinity>DFINITY</TypographyDfinity>
          </Grid>
          <Grid item>
            <TypographyExplorer>ExpIorer</TypographyExplorer>
          </Grid>
        </Grid>
      </Link>
    );
  }

  /**
   * Return the height of the product icon based on the current breakpoint.
   * @return {Number} The height of the product icon based on the current breakpoint.
   * @private
   */
  getProductIconHeight() {
    if (isBreakpointLessOrEqualTo(Breakpoints.XS))
      return 23.8;
    else
      return 34;
  }

  /**
   * Return the elements for the drawer based on the current breakpoint.
   * @return {Object} The elements for the drawer based on the current breakpoint.
   * @private
   */
  getDrawer() {
    // The Material Design documentation states: "Modal drawer: In a responsive layout grid, at a
    // defined minimum breakpoint of at least 600dp width, a standard drawer should be replaced with
    // a modal drawer." We use a modal drawer for breakpoints xs and sm (i.e., up to 960px).
    if (isBreakpointLessOrEqualTo(Breakpoints.SM)) {
      return (
        <StyledSwipeableDrawer
          open={this.props.isMobileDrawerOpen}
          onOpen={this.props.handleMobileDrawerMenuClick}
          onClose={this.props.handleMobileDrawerMenuClick}
        >
          <div onClick={this.props.handleMobileDrawerMenuClick}>
            {this.getDrawerContent()}
          </div>
        </StyledSwipeableDrawer>
      );
    }
    else {
      return (
        <StyledDrawer variant='persistent' open={this.props.isDesktopDrawerOpen}>
          {this.getDrawerContent()}
        </StyledDrawer>
      );
    }  
  }

  /**
   * Return the elements for the drawer content based on the current breakpoint.
   * @return {Object} The elements for the drawer content based on the current breakpoint.
   * @private
   */
  getDrawerContent() {
    /* Use constants for paths such as 'blocks' everywhere in code!!! */
    return (
      <Fragment>
        {/* Shim to compensate for AppBar position='fixed'. */}
        <Toolbar/>
        <List>
          {/* Could change this to be more generic by calling map() on an array of route objects
              which contain info such as: path, menu text, and icon.
              See: https://stackoverflow.com/questions/50801093/material-ui-drawer-selection-how-to-route
          */}
          <DrawerListItem button component={Link} to='/' selected={this.isActiveRoute('/')}>
            <DrawerListItemIcon>
              <HomeIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='Home' selected={this.isActiveRoute('/')} />
          </DrawerListItem>
          <Divider />
          <DrawerListItem button component={Link} to='/blocks' selected={this.isActiveRoute('/blocks')}>
            <DrawerListItemIcon>
              <SvgIcon>
                <path d={Constants.ICON_SVG_PATH_BLOCK} />
              </SvgIcon>
            </DrawerListItemIcon>
            <DrawerListItemText primary='Blocks' selected={this.isActiveRoute('/blocks')} />
          </DrawerListItem>
          <DrawerListItem button component={Link} to='/txs' selected={this.isActiveRoute('/txs')}>
            <DrawerListItemIcon>
              <SvgIcon>
                <path d={Constants.ICON_SVG_PATH_TPS} />
              </SvgIcon>
            </DrawerListItemIcon>
            <DrawerListItemText primary='Transactions' />
          </DrawerListItem>
          <DrawerListItem button component={Link} to='/accounts' selected={this.isActiveRoute('/accounts')}>
            <DrawerListItemIcon>
              <AccountCircleIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='Accounts' />
          </DrawerListItem>            
          <DrawerListItem button component={Link} to='/contracts' selected={this.isActiveRoute('/contracts')}>
            <DrawerListItemIcon>
              <DescriptionIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='Contracts' />
          </DrawerListItem>
          <Divider />
          <DrawerListItem button component={Link} to='/about' selected={this.isActiveRoute('/about')}>
            <DrawerListItemIcon>
              <InfoIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='About' />
          </DrawerListItem>
        </List>
      </Fragment>
    );
  }

  /**
   * Return the elements for the search button on the current breakpoint.
   * @return {Object} The elements for the search button based on the current breakpoint.
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
  
 /**
   * Callback fired any time the internal state of the Downshift component changes.
   * @param {Object} changes The properties that have changed since the last state change.
   * @private
   */
  handleDownshiftStateChange(changes) {
    const { inputValue } = changes;
    if (inputValue) {
      this.setState({
        searchQuery: inputValue
      });
    }
  }

  /**
   * Callback fired when the value of the Downshift component changes.
   * @param {Object} selectedItem The item that was just selected.
   * @private
   */
  handleDownshiftChange(selectedItem) {
    this.performSearch(selectedItem);
  }

  /**
   * Callback fired when the SearchAppBar form is submitted.
   * @param {Object} event The event source of the callback.
   * @private
   */
  handleSearchSubmit(event) {
    event.preventDefault();
    this.performSearch(this.state.searchQuery);
  }

  /**
   * Perform a search based on the specified search query.
   * @param {String} searchQuery The search quert to use for the search.
   * @private
   */
  performSearch(searchQuery) {
    this.setState({
      isSearchOn: false,
      searchQuery: ''
    });
    if (this.props.routerRef)
      this.props.routerRef.history.push(`/search/${searchQuery}`);
  }

  /**
   * Return true if the specified route matches the current route, false otherwise.
   * @param {String} routeName The name of the route to check.
   * @return {Boolean} True if the specified route matches the current route, false otherwise.
   * @private
   */
  isActiveRoute(routeName) {
    return this.props.location.pathname === routeName;
  }
};

export default withRouter(DEAppBar);