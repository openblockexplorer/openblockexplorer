/**
 * @file index
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import Constants from './constants';
import App from './Components/App/App';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background: ${Constants.COLOR_DFINITY_BLACK_DARKER};
  }
`

ReactDOM.render(<App />, document.getElementById('root'));
