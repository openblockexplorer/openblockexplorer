/**
 * @file Footer
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

import React from 'react';
import styled from 'styled-components';
import { loadCSS } from 'fg-loadcss';
import { Button, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import MailIcon from '@material-ui/icons/MailOutline';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent'
import Constants from '../../constants';

const FooterToolbar = styled(Toolbar)`
  && {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${Constants.FOOTER_HEIGHT + 'px'};
    text-align: center;
    background: ${Constants.COLOR_DFINITY_BLACK};
    color: ${Constants.COLOR_TEXT_DARKER};
    padding-left: 8;
    padding-right: 8;
  }
`;

const ContentGrid = styled(Grid)`
  && {
    max-width: ${Constants.BREAKPOINT_LG_MAX_WIDTH + 'px'};
`;

const OneThirdGrid = styled(Grid)`
  && {
    width: 33.33%;
`;

const FooterTypography = styled(Typography)`
  && {
    font-family: ${Constants.FONT_PRIMARY};
  }
`;

const CopyrightTypography = styled(FooterTypography)`
  && {
    font-size: 12px;
  }
`;

const NotifiedTypography = styled(FooterTypography)`
  && {
    font-size: 1.0em;
  }
`;

const SubscribeButton = styled(Button)`
  && {
    margin-top: -54px;
    background: ${Constants.COLOR_DFINITY_BLUE_TRANSPARENT};
    color: ${Constants.COLOR_TEXT_DARK};
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      margin-top: 0px;
    }
    &:hover {
      background: ${Constants.COLOR_DFINITY_BLUE};
      color: ${Constants.COLOR_TEXT_LIGHT};
    }
  }
`;

const AwesomeIconButtonGrid = styled(Grid)`
  && {
    @media (max-width: ${Constants.BREAKPOINT_SM + 'px'}) {
      min-width: 35px;
    }
  }
`;

const AwesomeIconButton = styled(IconButton)`
  && {
    &:hover {
      color: ${Constants.COLOR_TEXT_LIGHT};
    }
  }
`;

const AwesomeIcon = styled(Icon)`
  && {
    font-size: 20px;
  }
`;

/**
 * The Footer provides information related to the current screen.
 */
class Footer extends ResponsiveComponent {
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    super.componentDidMount();

    loadCSS(Constants.URI_CDN_FONT_AWESOME, document.querySelector('#insertion-point-jss'));
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <FooterToolbar>
        <Grid container alignItems='center' justify='center'>
          <ContentGrid container alignItems='center' wrap='nowrap'>
            <OneThirdGrid container alignItems='flex-start' justify='flex-start'>
              <Grid item>
                <CopyrightTypography color='inherit'>
                  {this.getCopyrightText()}
                </CopyrightTypography>
              </Grid>
            </OneThirdGrid>
            <OneThirdGrid container alignItems='center' justify='center'>
              {/* Begin MailChimp Signup Form */}
              <form action='https://dfinityexplorer.us18.list-manage.com/subscribe/post?u=059dc252f5f0cea2fec413c42&amp;id=4ebbd6c248' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups  */}
                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true'>
                  <input type='text' name='b_059dc252f5f0cea2fec413c42_4ebbd6c248' tabIndex='-1' value='' />
                </div>
                <Grid item>
                  <div className='clear'>
                    <SubscribeButton variant='fab' type='submit'>
                      <MailIcon />
                    </SubscribeButton>
                  </div>
                </Grid>
                <Grid item>
                  <label htmlFor='mce-EMAIL'>
                    <NotifiedTypography color='inherit'>
                      {this.getNotifiedText()}
                    </NotifiedTypography>
                  </label>
                </Grid>
              </form>
              {/* End MailChimp Signup Form */}
            </OneThirdGrid>
            <OneThirdGrid container alignItems='center' justify='flex-end' wrap='nowrap'>
              <AwesomeIconButtonGrid item>
                <AwesomeIconButton color='inherit' href={Constants.URI_DFINITY_EXPLORER_TWITTER}>
                  <AwesomeIcon className='fa fa-twitter' />
                </AwesomeIconButton>
              </AwesomeIconButtonGrid>
              <AwesomeIconButtonGrid item>
                <AwesomeIconButton color='inherit' href={Constants.URI_DFINITY_EXPLORER_FACEBOOK}>
                  <AwesomeIcon className='fa fa-facebook-f' />
                </AwesomeIconButton>
              </AwesomeIconButtonGrid>
              <AwesomeIconButtonGrid item>
                <AwesomeIconButton color='inherit' href={Constants.URI_DFINITY_EXPLORER_GITHUB}>
                  <AwesomeIcon className='fa fa-github' />
                </AwesomeIconButton>
              </AwesomeIconButtonGrid>
            </OneThirdGrid>
          </ContentGrid>
        </Grid>
      </FooterToolbar>
    );
  }

  /**
   * Return the text for the CopyrightTypography element.
   * @return {Object} the text for the CopyrightTypography element.
   * @public
   */
   getCopyrightText() {
    if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches)
      return '© 2018 dfinityexplorer';
    else if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_MD + 'px)').matches)
      return '© 2018 dfinityexplorer contributors';
    else
      return '© 2018 dfinityexplorer contributors | All rights reserved';
  }

  /**
   * Return the text for the NotifiedTypography element.
   * @return {Object} the text for the NotifiedTypography element.
   * @public
   */
  getNotifiedText() {
    if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_SM + 'px)').matches)
      return '';
    else if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_MD + 'px)').matches)
      return 'Get notified!';
    else if (window.matchMedia('(max-width: ' + Constants.BREAKPOINT_LG + 'px)').matches)
      return 'Get notified when DE goes live!';
    else
      return 'Get notified when DFINITY Explorer goes live!';
  }
};

export default Footer;
