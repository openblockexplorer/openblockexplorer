/**
 * @file constants
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const Constants = Object.freeze({
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
});

export default Constants;
