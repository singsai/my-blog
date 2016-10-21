import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// eslint-disable-next-line no-use-before-define
const webpackRequireContext = require.context('markdown-with-front-matter!./_posts', false, /\.md$/);
const blogs = webpackRequireContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/\.\/([^\.]+)\.*/)[1], webpackRequireContext(fileName)), new Map())

import 'github-markdown-css';
const blogIndex = (blogs) => () => <ul>{[...blogs.keys()].map(path => <li key={path}><Link to={'/'+path}>{blogs.get(path).title || path}</Link></li>)}</ul>;
const blogWrapper = ({ __content }) => () => <div><Link to='/'>« Back to blog</Link><hr /><div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}}></div></div>;

import { Link, IndexRoute, Router, Route, browserHistory } from 'react-router';
const reactRoutes = [<IndexRoute key='index' component={blogIndex(blogs)} />].concat([...blogs.keys()].map(path => <Route key={path} path={path} component={blogWrapper(blogs.get(path))} />));

<Route path="/">{reactRoutes}</Route>

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">{reactRoutes}</Route>
  </Router>,
  document.getElementById('root')
);
