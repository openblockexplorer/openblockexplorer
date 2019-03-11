/**
 * @file BlocksPage
 * @copyright Copyright (c) 2018-2019 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React, { Component } from "react";
import Constants from '../../constants';
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';

const StyledTypography = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-weight: regular;
    font-size: 1em;
    color: ${props => props.theme.colorBodyText};
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    font-weight: bold;
    font-size: 2em;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
  }
`;

class BlocksPage extends Component {
  render() {
    return (
      <div style={{ marginTop: '32px', marginLeft: '32px' }}>
        <ExplorerTypography>Blocks</ExplorerTypography>
        <StyledTypography>Blocks page coming soon.</StyledTypography>
      </div>
    );
  }
}

export default BlocksPage;
