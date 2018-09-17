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
import Constants from '../../constants';

const FooterToolbar = styled(Toolbar)`
  && {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 72px;
    text-align: center;
    background: ${Constants.COLOR_DFINITY_BLACK};
    color: ${Constants.COLOR_TEXT_DARKER};
  }
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
    /* This margin offset needs to be set dynamically!!! */
    margin-top: -54px;
    background: ${Constants.COLOR_DFINITY_BLUE_TRANSPARENT};
    color: ${Constants.COLOR_TEXT_DARK};
    &:hover {
      background: ${Constants.COLOR_DFINITY_BLUE};
      color: ${Constants.COLOR_TEXT_LIGHT};
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
class Footer extends React.Component {
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    loadCSS(
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <FooterToolbar>
        {/* Need to refine this technique of creating margins!!! */}
        <Grid container alignItems='center' justify='center'>
          <Grid container alignItems='center' wrap='nowrap' style={{width: '1140px'}}>
            <Grid container alignItems='flex-start' justify='flex-start'>
              <Grid item>
                <CopyrightTypography color='inherit'>
                  © 2018 dfinityexplorer contributors | All rights reserved
                </CopyrightTypography>
              </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center'>
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
                      Get notified when DFINITY Explorer goes live!
                    </NotifiedTypography>
                  </label>
                </Grid>
              </form>
              {/* End MailChimp Signup Form */}
            </Grid>
            <Grid container alignItems='center' justify='flex-end'>
              <Grid item>
              <AwesomeIconButton color='inherit' href='https://twitter.com/dfinityexplorer'>
                <AwesomeIcon className='fa fa-twitter' />
              </AwesomeIconButton>
              </Grid>
              <Grid item>
              <AwesomeIconButton color='inherit' href='https://www.facebook.com/dfinityexplorer'>
                <AwesomeIcon className='fa fa-facebook-f' />
              </AwesomeIconButton>
              </Grid>
              <Grid item>
              <AwesomeIconButton color='inherit' href='https://github.com/dfinityexplorer/dfinityexplorer'>
                <AwesomeIcon className='fa fa-github' />
              </AwesomeIconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FooterToolbar>
    );
  }
};

export default Footer;
