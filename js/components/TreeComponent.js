// top level tree component should get rendered to document.body
// and only render two components, head and nav
// each one can determine whether or not it's a container.

import query from './Async.js';

import clas from 'classnames';

let recf = React.createFactory;
let recl = React.createClass;

let head = recf(require('./NavComponent.js'));
let body = recf(require('./BodyComponent.js'));

let {div} = React.DOM;

export default query({
  body:'r',
  name:'t',
  path:'t',
  meta:'j',
  sein:'t'
}, (recl({
  displayName: "Tree",

  render() {
    let treeClas = clas({
      container: this.props.meta.container !== 'false'});

    return (div({className:treeClas},[
      (head({key:'head-container'}, "")),
      (body({key:'body-container'}, ""))
    ]));
  }
}))
);
