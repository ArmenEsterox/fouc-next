import React from 'react';
import App from 'next/app';
import DefaultLayout from 'components/shared/Layouts/default';
import { getUser} from 'utils';
import UserContext from 'components/UserContext';
import 'static/scss/global.scss';
import API from 'lib/axiosEnv';
import {initSocket} from 'lib/socketClient';

class AppWrapper extends App {
  static async getInitialProps({Component, ctx}) {
    let relayData = {};
    if (ctx && ctx.req) {
      API.setToken(ctx.req.cookies.token);
    }

    if (Component.getInitialProps) {
      relayData = await Component.getInitialProps(ctx);
    }
    if (Component.Layout && Component.Layout.getInitialProps) {
      await Component.Layout.getInitialProps(ctx);
    }

    if (ctx && ctx.req) {
      return { user: ctx.req.user, relayData };
    } else {
      return {user: getUser(), relayData};
    }
  }

  constructor(props) {
    super(props);
    this.state = {user: props.user, socketAuth: false};
    if (typeof window !== 'undefined' && props.user) {
      initSocket();
    }
  }

  render() {
    const { Component, pageProps, relayData } = this.props;
    const Layout = Component.Layout || DefaultLayout;

    return (
      <UserContext.Provider value={{user: this.state.user, setNewUser: (newUser) => {
          this.setState({user: newUser});
        }}}
      >
        <Layout>
          <Component {...pageProps} {...relayData} />
        </Layout>
      </UserContext.Provider>
    );
  }
}

export default AppWrapper;
