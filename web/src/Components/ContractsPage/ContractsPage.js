/**
 * @file ContractsPage
 * @copyright Copyright (c) 2018-2019 Dylan Miller, Todd Kitchens, and dfinityexplorer contributors
 * @license MIT License
 */

import React from "react";
import Constants from '../../constants';
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';
import TrackablePage from '../TrackablePage/TrackablePage'

const StyledTypography = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
    font-size: 1em;
    color: ${props => props.theme.colorBodyText};
  }
`;

const ExplorerTypography = styled(StyledTypography)`
  && {
    font-weight: 400;
    font-size: 2em;
    color: ${Constants.COLOR_DFINITY_LIGHT_ORANGE};
  }
`;

class ContractsPage extends TrackablePage {
  render() {
    return (
      <div style={{ marginTop: '32px', marginLeft: '32px' }}>
        <ExplorerTypography>Contracts</ExplorerTypography>
        <StyledTypography>Contracts page coming soon.</StyledTypography>
      </div>
    );
  }
}

export default ContractsPage;
