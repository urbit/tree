import clas from 'classnames';

// top level tree component should get rendered to document.body
// and only render two components, head and nav
// each one can determine whether or not it's a container.

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';

import Nav from './NavComponent';
import Body from './BodyComponent';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Tree';
  }

  render() {
    const treeClas = clas({
      container: this.props.meta.container !== 'false' });

    return (<div className={treeClas}>
      <Nav key="head-contanier" />
      <Body key="body-contanier" />
    </div>);
  }
}

Tree.propTypes = ContainerPropTypes;

export default Container({
  body: 'r',
  name: 't',
  path: 't',
  meta: 'j',
  sein: 't',
}, Tree);
