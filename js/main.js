import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TreeStore from './TreeReducer';
import { setCurrentPath, addComponents, clearData, actions } from './TreeActions';

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
  window.urb.dependencyHandlers["data"] = () => { // XX in persistence?
    for(let dat in window.urb.dependencies){
      let type = window.urb.dependencies[dat]
      if(type == "data"){
        window.urb.delDependency(dat)
      }
    }
    store.dispatch(clearData())
  }

  ReactDOM.render(
    <Provider store={store}>
      <Tree />
    </Provider>,
    document.getElementById('tree'));
});
