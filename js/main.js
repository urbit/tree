import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TreeStore from './TreeReducer';
import { setCurrentPath, addComponents, actions } from './TreeActions';

import components from './components/Components';
import Tree from './components/TreeComponent'
// import Nav from './components/NavComponent';
// import Body from './components/BodyComponent';

import util from './utils/util';

const store = createStore(TreeStore, applyMiddleware(thunk));

$(() => {
  window.tree.util = {
    components,
    store,
    actions,
  };

  const frag = util.fragpath(window.location.pathname.replace(/\.[^\/]*$/, ''));
  store.dispatch(setCurrentPath(frag, true));
  store.dispatch(addComponents(components));

  ReactDOM.render(
    <Provider store={store}>
      <Tree />
    </Provider>,
    document.getElementById('tree'));
});
