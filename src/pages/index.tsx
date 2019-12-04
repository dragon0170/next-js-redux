import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Nav from 'components/Nav';
import { connect } from 'react-redux';
import { StoreState } from 'store/configureStore';
import { bindActionCreators } from 'redux';
import { actionCreators as testActions } from 'store/test/action';
import Link from 'next/link';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

interface Props {
  nickname: string;
  error: string;
  TestActions: typeof testActions;
}

const Home: NextPage<Props> = ({ nickname, error, TestActions }) => (
  <div>
    <Head>
      <title>Ticle</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <p>{nickname}</p>
      <input value={nickname} onChange={(e) => {TestActions.changeNickname(e.currentTarget.value)}} />
      <button onClick={() => {TestActions.signIn()}}>Get Info!</button>
      {error !== '' && <p>{error}</p>}
      <Title>Welcome to Next.js!</Title>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <Link href="/test">
        <a>to test</a>
      </Link>
      <div className="row">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <a href="https://nextjs.org/learn" className="card">
          <h3>Next.js Learn &rarr;</h3>
          <p>Learn about Next.js by following an interactive tutorial!</p>
        </a>
        <a
          href="https://github.com/zeit/next.js/tree/master/examples"
          className="card"
        >
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Next.js GitHub.</p>
        </a>
      </div>
    </div>

    <style jsx>
      {`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
      `}
    </style>
  </div>
);

Home.getInitialProps = async (props): Promise<Props> => {
  const { ctx }: any = props;
  // ctx.store.dispatch(testActions.getInfo());
  return null;
};

export default connect(
  ({ test }: StoreState) => ({
    nickname: test.get('nickname'),
    error: test.get('error'),
  }),
  dispatch => ({
    TestActions: bindActionCreators(testActions, dispatch),
  }),
)(Home);
