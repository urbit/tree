let recl = React.createClass;
let rele = React.createElement;

import TreeActions from '../actions/TreeActions.js';

let waitingScripts = null;  // null = none waiting, [] = one in flight, [...] = blocked
let appendNext = function() { 
  if (waitingScripts == null) {
    return;
  }
  if (waitingScripts.length === 0) {
    return waitingScripts = null;
  } else {
    return document.body.appendChild(waitingScripts.shift());
  }
};

// Script eval shim
export default recl({
  displayName:"Script",
  componentDidMount() {
    let s = document.createElement('script');
    _.assign(s, this.props);
    TreeActions.registerScriptElement(s);
    s.onload = appendNext;
    this.js = s;
    if (waitingScripts != null) {
      return waitingScripts.push(s);
    } else {
      waitingScripts = [s];
      return appendNext();
    }
  },

  componentWillUnmount() { 
    if (this.js.parentNode === document.body) {
      return document.body.removeChild(this.js);
    }
  },
    
  render() {  return rele("script", this.props); }
});
