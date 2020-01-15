import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="/static/scss/vendor/antd.css" rel="stylesheet" />
          <link href="/static/scss/vendor/bootstrap.min.css" rel="stylesheet" />
          <link href="/static/scss/base/typography.css" rel="stylesheet" />
          <link href="/static/scss/base/ionicons.min.css" rel="stylesheet" />
          <link href="/static/scss/base/flaticons.css" rel="stylesheet" />
          <link href="/static/scss/base/reset.css" rel="stylesheet" />
        </Head>
        <body>
          <div id="fb-root" />
          <Main />
          <NextScript />
        </body>
        <div id="portal" />
      </Html>
    );
  }
}

export default MyDocument;
