import clas from 'classnames';

// top level tree component should get rendered to document.body
// and only render two components, head and nav
// each one can determine whether or not it's a container.

import query from './Async';

import Nav from './NavComponent';
import Body from './BodyComponent';

const head = React.createFactory(Nav);
const body = React.createFactory(Body);

const { div } = React.DOM;

export default query({
  body:'r',
  name:'t',
  path:'t',
  meta:'j',
  sein:'t'
}, (React.createClass({
  displayName: "Tree",

  render() {
    const treeClas = clas({
      container: this.props.meta.container !== 'false' });

    return (div({ className: treeClas }, [
      (head({key:'head-container'}, "")),
      (body({key:'body-container'}, ""))
    ]));
  }
}))
);
