import clas from 'classnames';
import util from '../utils/util';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';
import reactify from './Reactify';

class Kids extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Kids';
  }

  render() {
    const kids = util.sortKids(this.props.kids, this.props.sortBy);

    const kidsClas = clas(
      { kids: true },
      this.props.className);

    const kidClas = clas({
      'col-md-4': (this.props.grid === 'true'),
    });

    const _kids = [];
    Array.from(kids).forEach((elem) => {
      const body = (reactify(elem.body, null, { basePath: elem.path }));
      _kids.push(
        (<div key={elem.name} id={elem.name} className={kidClas}>
          {body}
        </div>));
      _kids.push(<hr />);
    });

    return <div className={kidsClas} key="kids">{_kids}</div>;
  }
}

Kids.propTypes = ContainerPropTypes;

export default Container({
  kids: {
    name: 't',
    bump: 't',
    body: 'r',
    meta: 'j',
    path: 't',
  } }, Kids);
