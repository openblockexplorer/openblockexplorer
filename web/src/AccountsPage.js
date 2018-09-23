/**
 * @file AccountsPage
 * @copyright Copyright (c) 2018 Todd Kitchens and dfinityexplorer contributors
 * @license MIT License
 */

 import React, { Component } from "react";
 import Constants from './constants';
 import styled from 'styled-components';
 import {
   // AppBar,
   // Grid,
   // IconButton,
   // Input,
   // Slide,
   // Tab,
   // Tabs,
   // Toolbar,
   Typography,
   // Zoom
 } from '@material-ui/core';
 // import FadeTable from './Components/FadeTable/Fade'

 const StyledTypography = styled(Typography)`
   && {
     font-weight: regular;
     font-size: 1em;
     margin-left: 25px;
     font-family: ${Constants.FONT_PRIMARY};
     color: ${Constants.COLOR_TEXT_LIGHT};
   }
 `;

 const ExplorerTypography = styled(StyledTypography)`
   && {
     font-weight: bold;
     font-size: 2em;
     margin-left: 25px;
     margin-top: 10px;
     letter-spacing: 0;
     color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
   }
 `;

class AccountsPage extends Component {
  render() {
    return (
      <div style={{'marginTop': '40px'}}>
        <ExplorerTypography>Accounts</ExplorerTypography>
        <StyledTypography>Accounts page coming soon.</StyledTypography>
      </div>
    );
  }
}

export default AccountsPage;
