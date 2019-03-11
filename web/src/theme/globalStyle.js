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
  colorAboutCardText: '#202124', // Google text (verified)
  colorAboutCardTextDim: '#5F6368', // Material Design (verified), and several Google websites
  colorAboutCardTextLink: '#007DBC',
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: 'white',
  colorAppBarBackground: 'white',
  colorAppBarTextButton: Constants.COLOR_LIGHT_TEXT_FADED,
  colorAppBarMenuIconSelected: '#007DBC',//!!!Constants.COLOR_DFINITY_BLUE,
  colorAppBarButtonHover: 'black',
  colorAppBarTabText: 'black', // modified by Material-UI Tab opacity 
  colorAppBarDfinityText: 'black',
  colorAppBarExplorerText: '#F98E00', // use constant for "500" version of light orange!!! //'#FA9F00', is 400
  /* Twitter background */
  // HERE: android.com might have the best 2/3-tone alternating backgrounds
  // Perhaps the text should not be true black, maybe even use darker text for headings. See various google sites
  // Consider a blue panel as on https://www.box.com/industries/financial-services, could work for light and dark.
  /*!!! colorBodyBackground: 'rgb(231, 236, 239)', */
  // waymo.com is 238, 238, 238
  // Visual Studio Code is 243, 243, 243.
  // Android.com background is 245, 245, 245. They even have third color: 236, 239, 241
  //  Youtube regular: drawer is 245, 245, 245, and body is 250, 250, 250
  //  Youtube info: 245, 245, 245 and white
  // Google maps is 245, 245, 245
  // box.com uses 248, 249, 249 or 249, 249, 249 or 245, 246, 248. They even have a third color: 221, 230, 236 or 234, 238, 243	
  // Google play background is 238, 238, 238
  // Google Play dashboard: 241, 241, 241 from screenshots
  // cloud.google.com is 247, 247, 247 or 248, 248, 248
  // developers.google.com is 247, 247, 247
  // docs.google.com is 248, 249, 250
  // pay.google.com is 248, 248, 248
  // anchor.fm is 248, 248, 248
  // tensorflow.org is 241, 243, 244!!!
  /* byrushan background */
  colorBodyBackground: 'rgb(243, 243, 243)', // use constant!!!
  colorBodyText: Constants.COLOR_LIGHT_TEXT,
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
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E' //  Material Design icon(verified)
}
// Youtube footer is 33, 33, 33



// GitHub App Bar black: 36, 41, 45
// Visual Studio Code drawer black is 44, 44, 44

// Black text
// calendar.google.com: dark - 61 64 67
// Google maps: 33, 33, 33
// developers.google.com: 33, 33, 33
// Google Play is: 51, 51, 51
// news.google.com: dark - 32 33 35, light - 99 100 101
// box.com About text is 47, 62, 78, but differs elsewhere
// YouTube doesn't use black for text, they use 10, 10, 10 or 40, 40, 40

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
  colorAboutCardText: '#DCDCDC', // MacOS Calendar, iTunes
  colorAboutCardTextDim: '#DCDCDC', // MacOS Calendar, iTunes
  colorAboutCardTextLink: '#0090CF',
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: '#262626',
  colorAppBarBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorAppBarTextButton: Constants.COLOR_DARK_TEXT_FADED,
  colorAppBarMenuIconSelected: 'white',
  colorAppBarButtonHover: Constants.COLOR_DARK_TEXT,
  colorAppBarTabText: Constants.COLOR_DARK_TEXT, // modified by Material-UI Tab opacity 
  colorAppBarDfinityText: Constants.COLOR_DARK_TEXT,
  colorAppBarExplorerText: Constants.COLOR_DFINITY_LIGHT_ORANGE,
  colorBodyBackground: '#1B1B1B', //!!!Constants.COLOR_DFINITY_BLACK_DARKER,
  colorBodyText: Constants.COLOR_DARK_TEXT,
  colorDashCardABackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardBBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardCBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardDBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorDashCardIcon: ['white', 'white', 'white', 'white'],
  colorDashCardIconOpacity: 0.5,
  colorDashCardText: 'white',
  colorDrawerBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK,
  colorFooterBackground: '#262626', //!!!Constants.COLOR_DFINITY_BLACK
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E' //  Material Design icon (verified)
}
