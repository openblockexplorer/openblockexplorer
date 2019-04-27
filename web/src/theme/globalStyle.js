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
`;

/**
 * The styled-components ThemeProvider light theme.
 */
export const themeLight = {
  // Should use constants for all!!!
  isDark: false,
  colorAboutBackgroundPrimary: 'white',
  colorAboutBackgroundSecondary: '#F8F9FA', // Google Analytics (verified), Wikipedia (verified)
  //!!!colorAboutBackgroundSecondary: '#FAFAFA', // YouTube (verified), Google Translate (verified), DFINITY
  colorAboutButtonBackground: Constants.COLOR_DFINITY_BLUE_700,
  colorAboutButtonText: Constants.COLOR_TEXT_LIGHT,
  colorAboutButtonHoverBackground: Constants.COLOR_DFINITY_BLUE_500,
  colorAboutButtonHoverText: Constants.COLOR_TEXT_LIGHT,
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: 'white',
  colorAppBarBackground: 'white',
  colorAppBarTextButton: Constants.COLOR_LIGHT_TEXT_FADED, // (#4D4D4D)
  colorAppBarButtonHover: 'black',
  colorAppBarDfinityText: 'black', // consider matching to colorBodyText!!!
  colorAppBarExplorerText: Constants.COLOR_DFINITY_BLUE_700,
  colorBodyBackground: '#F8F9FA', // Wikipedia (verified)
  colorBodyText: '#202124', // Google text (verified)
  colorBodyTextDim: Constants.COLOR_LIGHT_BODY_TEXT_DIM_GOOGLE,
  colorBodyTextLink: Constants.COLOR_DFINITY_BLUE_700,
  colorDashCardBackground: 'white',
  // Remove extraneous colorDashCardIcon settings once finalized!!!
  //!!!colorDashCardIcon: [Constants.COLOR_DFINITY_BLUE_700, '#722B8D', '#C40059', '#F07200'],
  //!!!colorDashCardIcon: ['rgba(0, 125, 188, 1)', 'rgba(114, 43, 141, 0.8)', 'rgba(196, 0, 89, 0.8)', 'rgba(240, 114, 0, 0.8)'],
  //!!!colorDashCardIcon: [Constants.COLOR_DFINITY_BLUE_700, '#843196', '#DA005E', '#F68200'],
  colorDashCardIcon: [Constants.COLOR_DFINITY_BLUE_700, '#9440A6', '#DA005E', '#F79308'], // Ori's purple and orange
  // Actual DFINITY symbol colors.
  //!!!colorDashCardIcon: ['rgb(41, 171, 226)', 'rgb(99, 38, 132)', 'rgb(237, 30, 121)', 'rgb(251, 176, 59)'],
  colorDashCardIconOpacity: 1.0,
  colorDrawerBackground: 'white',
  colorDrawerDivider: Constants.COLOR_LIGHT_DRAWER_DIVIDER_GOOGLE,
  colorDrawerIcon: Constants.COLOR_LIGHT_DRAWER_ICON_GOOGLE,
  colorDrawerIconTextSelected: Constants.COLOR_DFINITY_BLUE_700,
  colorDrawerText: Constants.COLOR_LIGHT_DRAWER_TEXT_GOOGLE,
  colorChartBackground: 'white',
  colorChartTooltipBackground: 'rgba(255, 255, 255, 0.96)',
  colorChartAxes: Constants.COLOR_LIGHT_BODY_TEXT_DIM_GOOGLE,
  colorChartGrid: Constants.COLOR_LIGHT_DRAWER_DIVIDER_GOOGLE,
  colorChartText: Constants.COLOR_LIGHT_BODY_TEXT_DIM_GOOGLE,
  colorChartLine: Constants.COLOR_DFINITY_BLUE_700,
  colorChartActiveDotStroke: 'white',
  colorTableBackgroundPrimary: 'white',
  colorTableRowBorder: Constants.COLOR_LIGHT_DRAWER_DIVIDER_GOOGLE, // Google Maps drawer divider (verified)
  colorTableTextDim: '#909090', // YouTube, footer text dim (verified)
  colorFooterBackground: '#F5F5F5',
  colorFooterTextIcon: '#909090', // YouTube (verified)
  colorFooterIconHover: 'white',
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E' //  Material Design icon(verified)
}

/**
 * The styled-components ThemeProvider dark theme.
 */
export const themeDark = {
  isDark: true,
  colorAboutBackgroundPrimary: Constants.COLOR_DARK_BODY_DARKER_MAC_OS,
  colorAboutBackgroundSecondary: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorAboutButtonBackground: Constants.COLOR_DFINITY_BLUE_700,
  colorAboutButtonText: Constants.COLOR_DARK_TEXT_MAC_OS,
  colorAboutButtonHoverBackground: Constants.COLOR_DFINITY_BLUE_500,
  colorAboutButtonHoverText: Constants.COLOR_TEXT_LIGHT,
  colorAboutHeaderText: 'white',
  colorAboutTwitterBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorAppBarBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorAppBarTextButton: Constants.COLOR_DARK_TEXT_FADED,
  colorAppBarButtonHover: Constants.COLOR_DARK_TEXT,
  colorAppBarDfinityText: Constants.COLOR_DARK_TEXT,
  colorAppBarExplorerText: Constants.COLOR_DFINITY_LIGHT_ORANGE,
  colorBodyBackground: Constants.COLOR_DARK_BODY_DARKER_MAC_OS,
  colorBodyText: Constants.COLOR_DARK_TEXT_MAC_OS,
  colorBodyTextDim: Constants.COLOR_DARK_TEXT_MAC_OS,
  colorBodyTextLink: Constants.COLOR_DFINITY_BLUE_600,
  colorDashCardBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorDashCardIcon: ['white', 'white', 'white', 'white'],
  colorDashCardIconOpacity: 0.5,
  colorDrawerBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorDrawerDivider: Constants.COLOR_DARK_DRAWER_DIVIDER_YOUTUBE,
  colorDrawerIcon: Constants.COLOR_DARK_TEXT_FADED,
  colorDrawerIconTextSelected: 'white',
  colorDrawerText: Constants.COLOR_DARK_TEXT_FADED,
  colorChartBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorChartTooltipBackground: 'rgba(38, 38, 38, 0.96)',
  colorChartAxes: Constants.COLOR_DARK_FOOTER_TEXT_ICON_NETFLIX,
  colorChartGrid: Constants.COLOR_DARK_DRAWER_DIVIDER_MAC_OS,
  colorChartText: Constants.COLOR_DARK_TEXT_FADED,
  colorChartLine: Constants.COLOR_DFINITY_BLUE_600,
  colorChartActiveDotStroke: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorTableBackgroundPrimary: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorTableRowBorder: Constants.COLOR_DARK_DRAWER_DIVIDER_YOUTUBE,
  colorTableTextDim: '#717171', // YouTube (Dark), footer text dim (verified)
  colorFooterBackground: Constants.COLOR_DARK_BODY_LIGHTER_MAC_OS,
  colorFooterTextIcon: Constants.COLOR_DARK_FOOTER_TEXT_ICON_NETFLIX,
  colorFooterIconHover: 'white',
  colorSearchText: '#202124', // Google text (verified)
  colorSearchIcon: '#9E9E9E' //  Material Design icon (verified)
}
