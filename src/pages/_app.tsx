import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore, { deserialize, serialize } from 'store/configureStore';
import { Store } from 'redux';

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }): Promise<{ pageProps }> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render(): React.ReactElement {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(createStore, {
  serializeState: state => serialize(state),
  deserializeState: state => deserialize(state),
})(withReduxSaga(MyApp));
