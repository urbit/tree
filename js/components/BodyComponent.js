import clas from 'classnames';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';
import reactify from './Reactify';

import Loading from './BodyLoadingComponent';
import extras from './BodyExtras';

const { div } = React.DOM;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Body';
  }

  render() {
    const extra = (name, props = {}) => {
      if (this.props.meta[name] != null) {
        if ((_.keys(props)).length === 0) {
          props[name] = this.props.meta[name];
        }
        props.key = name;
        return React.createElement(extras[name], props);
      } return null;
    };

    let innerClas = { body: true };
    if ((this.props.meta.anchor !== 'none') &&
      (this.props.meta.navmode !== 'navbar')) {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-3'] = true;
    }
    if ((this.props.meta.navmode === 'navbar') &&
      (this.props.meta.container !== 'false')) {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-1'] = true;
    }
    innerClas = clas(innerClas);

    let bodyClas = clas(
      (__guard__(this.props.meta.layout, x => x.split(','))));
    if (this.props.meta.type &&
      (bodyClas.indexOf(this.props.meta.type) === -1)) {
      bodyClas += ` ${this.props.meta.type}`;
    }

    const parts = [
      extra('spam'),
      extra('logo', { color: this.props.meta.logo }),
      // extra 'plan'
      reactify(this.props.body, 'body'),
      extra('next', {
        dataPath: this.props.sein,
        curr: this.props.name,
        meta: this.props.meta,
      }),
      extra('comments'),
      extra('footer', { container: this.props.meta.container }),
    ];

    if (this.props.meta.type === 'post') {
      parts.splice(
        1,
        0,
        extra('date'),
        extra('title'),
        extra('image'),
        extra('preview'),
        extra('author'),
      );
    }

    return div({ 'data-path': this.props.path, key: this.props.path }, [
      div({
        className: innerClas,
        'data-path': this.props.path,
        key: 'body-inner' }, [
        (div({
          key: `body${this.props.path}`,
          id: 'body',
          className: bodyClas }, parts)),
        ]),
    ]);
  }
}

Body.propTypes = ContainerPropTypes;

export default Container({
  body: 'r',
  name: 't',
  path: 't',
  meta: 'j',
  sein: 't',
}, Body, Loading);
