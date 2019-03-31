/**
 * @file globalStyle
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import { createGlobalStyle } from 'styled-components';
import Constants from '../constants';

/**
 * StyledComponent that handles global styles.
 */
export const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.colorBodyBackground};
   }
`
/**
 * The styled-components ThemeProvider light theme.
 */
export const themeLight = {
  // Should use constants for all!!!
  colorAboutBackgroundPrimary: 'white',
  colorAboutBackgroundSecondary: '#F8F9FA', // Wikipedia (verified)
  //!!!colorAboutBackgroundSecondary: '#FAFAFA', // YouTube (verified), Google Translate (verified), DFINITY
  //!!! colorAboutCardSymbolBackground: Constants.COLOR_DFINITY_BLACK_DARKER,
  //!!! colorAboutCardBackground: 'rgb(243, 243, 243)', // use constant!!!
  colorAboutButtonBackground: '#007DBC',
  colorAboutButtonText: Constants.COLOR_TEXT_LIGHT,
  colorAboutButtonHoverBackground: '#009DDD',
  colorAboutButtonHoverText: Constants.COLOR_TEXT_LIGHT,
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: 'white',
  colorAppBarBackground: 'white',
  colorAppBarTextButton: Constants.COLOR_LIGHT_TEXT_FADED,
  colorAppBarMenuIconSelected: '#007DBC',//!!!Constants.COLOR_DFINITY_BLUE,
  colorAppBarButtonHover: 'black',
  colorAppBarDfinityText: 'black',
  colorAppBarExplorerText: '#007DBC', //'#F98E00', // use constant for "500" version of light orange!!! //'#FA9F00', is 400
  colorBodyBackground: '#F8F9FA', // Wikipedia (verified)
  colorBodyText: '#202124', // Google text (verified)
  colorBodyTextDim: '#5F6368', // Material Design (verified), and several Google websites
  colorBodyTextLink: '#007DBC',
  // It seems odd to use an array for the icon color, but not the background and text colors!!!
  colorDashCardDBackground: 'white',//'#F07200', //'#D54C1C', //'#E3531F', //'#D54C1C', //'#BB4015', //Constants.COLOR_TWITTER_BLUE,
  colorDashCardCBackground: 'white',//'#C40059', //'#AF0056', //'#C40059', //'#AF0056', //'#89004F', //Constants.COLOR_TWITTER_PURPLE,
  colorDashCardBBackground: 'white',//'#722B8D', //'#632684', //'#722B8D', //'#632684', //'#471E73', //Constants.COLOR_TWITTER_GREEN,
  colorDashCardABackground: 'white',//'#007DBC', //'#006DA8', //'#004E88', //Constants.COLOR_TWITTER_ORANGE,
  colorDashCardIcon: ['#007DBC', '#722B8D', '#C40059', '#F07200'],
  // Actual DFINITY symbol colors.
  // colorDashCardIcon: ['rgb(41, 171, 226)', 'rgb(99, 38, 132)', 'rgb(237, 30, 121)', 'rgb(251, 176, 59)'],
  colorDashCardIconOpacity: 1.0,
  colorDashCardText: 'black',//'white',
  colorFooterBackground: '#F5F5F5',
  colorFooterTextIcon: '#909090', // YouTube (verified)
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E', //  Material Design icon(verified)
  colorFooterIconHover: 'white',
  colorTableBackgroundPrimary: 'white',
  colorTableBackgroundSecondary: '#F8F9FA' // Wikipedia (verified)
}

/**
 * The styled-components ThemeProvider dark theme.
 */
export const themeDark = {
  // Remove any of these colorAbout's that aren't used!!!
  // These two colors are actually pretty close to DFINITY darker and dark!!!
  colorAboutBackgroundPrimary: '#1B1B1B', // MacOS Finder, etc.
  colorAboutBackgroundSecondary: '#262626', // MacOS Finder
  //!!! colorAboutCardSymbolBackground: Constants.COLOR_DFINITY_BLACK_DARKER,
  //!!! colorAboutCardBackground: Constants.COLOR_DFINITY_BLACK_DARKER,
  colorAboutButtonBackground: '#007DBC',
  colorAboutButtonText: '#DCDCDC',
  colorAboutButtonHoverBackground: '#009DDD',
  colorAboutButtonHoverText: Constants.COLOR_TEXT_LIGHT,
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: '#262626',
  colorAppBarBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorAppBarTextButton: Constants.COLOR_DARK_TEXT_FADED,
  colorAppBarMenuIconSelected: 'white',
  colorAppBarButtonHover: Constants.COLOR_DARK_TEXT,
  colorAppBarDfinityText: Constants.COLOR_DARK_TEXT,
  colorAppBarExplorerText: Constants.COLOR_DFINITY_LIGHT_ORANGE, // '#0090CF'!!!
  colorBodyBackground: '#1B1B1B', // MacOS Finder, etc.
  colorBodyText: '#DCDCDC', // MacOS Calendar, iTunes
  colorBodyTextDim: '#DCDCDC', // MacOS Calendar, iTunes
  colorBodyTextLink: '#0090CF',
  colorDashCardABackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardBBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardCBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardDBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardIcon: ['white', 'white', 'white', 'white'],
  colorDashCardIconOpacity: 0.5,
  colorDashCardText: 'white',
  colorDrawerBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorFooterBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK
  colorFooterTextIcon: '#808080', // Netflix (verified)
  colorFooterIconHover: 'white',
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E', //  Material Design icon (verified)
  colorTableBackgroundPrimary: '#262626', // MacOS Finder
  colorTableBackgroundSecondary: '#1B1B1B' // MacOS Finder, etc.
}
