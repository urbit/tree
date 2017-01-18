import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TreeContainer from './components/TreeContainer';
import TreeStore from './TreeReducer';

const store = createStore(TreeStore, applyMiddleware(thunk));

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <TreeContainer />
    </Provider>,
    document.getElementById('tree'));
});

// import util from './utils/util';
// import scroll from './utils/scroll';
//
// import TreeActions from './actions/TreeActions';
// import Components from './components/Components';
// import TreeComponent from './components/TreeComponent';
//
// $(() => {
//   window.tree.util = util;
//
//   scroll.init();
//
//   if (document.location.pathname.substr(-1) !== '/') {
//     history.replaceState({}, '',
//     `${document.location.pathname}/
//       ${document.location.search}
//       ${document.location.hash}`,
//     );
//   }
//
//   // we load modules that may need to send actions up, so we attach
//   // the actions to window here.
//   window.tree.actions = TreeActions;
//
//   // reactify has virtual components which themselves need to call
//   // reactify.  to do this, we register the components after the fact
//   window.tree.actions.addVirtual(Components);
//
//   const frag = util.fragpath(window.location.pathname.replace(/\.[^\/]*$/, ''));
//   window.tree.actions.setCurr(frag, true);
//   window.tree.actions.loadPath(frag, window.tree.data);
//   if (window.tree.sein != null) {
//     window.tree.actions.loadSein(frag, window.tree.sein);
//   }
//   window.urb.ondataupdate = () => {
//     for(const dat in window.urb.datadeps) {
//       window.urb.dewasp(dat);
//     }
//     return window.tree.actions.clearData();
//   };
//
//   const main = React.createFactory(TreeComponent);
//   ReactDOM.render(main({}, ''), document.getElementById('tree'));
//   return true;
// });
