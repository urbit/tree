import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TreeStore from './TreeReducer';
import { setCurrentPath } from './TreeActions';

import Body from './components/BodyComponent';

import util from './utils/util';

const store = createStore(TreeStore, applyMiddleware(thunk));

$(() => {
  const frag = util.fragpath(window.location.pathname.replace(/\.[^\/]*$/, ''));
  store.dispatch(setCurrentPath(frag, true));

  ReactDOM.render(
    <Provider store={store}>
      <Body />
    </Provider>,
    document.getElementById('tree'));
});
