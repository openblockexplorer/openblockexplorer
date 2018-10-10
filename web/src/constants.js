/**
 * @file constants
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const Constants = Object.freeze({
  // Server URIs have to change for production!!!
  URI_SERVER_HTTP: 'http://localhost:4000',
  URI_SERVER_WEB_SOCKETS: 'ws://localhost:4000',
  URI_CDN_FONT_AWESOME:
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  URI_CDN_GOOGLE_FONTS: 'https://fonts.googleapis.com/css?family=Istok+Web|Nunito+Sans',
  URI_DFINITY_EXPLORER_TWITTER: 'https://twitter.com/dfinityexplorer',
  URI_DFINITY_EXPLORER_FACEBOOK: 'https://www.facebook.com/dfinityexplorer',
  URI_DFINITY_EXPLORER_GITHUB: 'https://github.com/dfinityexplorer/dfinityexplorer',
  COLOR_DFINITY_BLACK: 'rgb(41, 42, 46)', // from dfinity.org/press
  COLOR_DFINITY_BLACK_LIGHTER: 'rgb(73, 75, 82)', //  COLOR_DFINITY_BLACK scaled lighter
  COLOR_DFINITY_BLACK_DARKER: 'rgb(27, 28, 31)', // COLOR_DFINITY_BLACK scaled darker
  COLOR_DFINITY_LIGHT_ORANGE: 'rgb(250, 177, 59)', // from dfinity.org/press
  COLOR_DFINITY_BLUE: 'rgb(0, 129, 255)', // from dfinity.org/press
  COLOR_DFINITY_BLUE_TRANSPARENT: 'rgb(0, 129, 255, 0.75)',
  COLOR_TEXT_LIGHT: 'white',
  COLOR_TEXT_DARK: 'rgb(190, 191, 192)', // rgb(255, 255, 255, 0.7) on COLOR_DFINITY_BLACK, matches Material-UI Tab opacity
  COLOR_TEXT_DARKER: 'rgb(148, 149, 151)', // rgb(255, 255, 255, 0.5) on COLOR_DFINITY_BLACK
  COLOR_TEXT_DARKEST: 'rgb(106, 106, 109)', // rgb(255, 255, 255, 0.3) on COLOR_DFINITY_BLACK
  FONT_PRIMARY: '\'Nunito Sans\', sans-serif',
  BREAKPOINT_XS: 0,
  BREAKPOINT_SM: 600,
  BREAKPOINT_MD: 960,
  BREAKPOINT_LG: 1280,
  BREAKPOINT_XL: 1920,
  BREAKPOINT_LG_MAX_WIDTH: 1140, // from Bootstrap
  FOOTER_HEIGHT: 72
});

export default Constants;
