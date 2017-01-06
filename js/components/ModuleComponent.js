let recl = React.createClass;
let {div} = React.DOM;

import TreeActions from '../actions/TreeActions.js';

export default recl({
  displayName:"Module",
  
  componentDidMount() {
    return setTimeout(() => TreeActions.setNav({ 
        title:this.props["nav:title"],
        dpad:(this.props["nav:no-dpad"] != null) ? false : undefined,
        sibs:(this.props["nav:no-sibs"] != null) ? false : undefined,
        subnav:this.props["nav:subnav"]
      }
      , 0)
    );  // XX dispatch while dispatching
  },

  componentWillUnmount() {
    // reset tree store state
    return setTimeout((() => TreeActions.clearNav()), 0);
  },
    
  render() {  return (div({className:"module"}, this.props.children)); }
});
