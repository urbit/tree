import clas from 'classnames';
import util from '../utils/util';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';
import reactify from './Reactify';

import TreeActions from '../actions/TreeActions';

import NavBody from './NavBodyComponent';

const { div } = React.DOM;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

class Nav extends React.Component {
  static reset() {
    return $('html,body').animate({ scrollTop: 0 });
  }

  constructor(props) {
    super(props);
    this.displayName = 'Nav';
    this.state = { url: window.location.pathname };
  }

  componentDidMount() {
    this.setTitle();

    window.onpopstate = this.pullPath;

    // TreeStore.addChangeListener(this._onChangeStore);

    const _this = this;
    $('body').on('click', 'a', function click(e) {
      if (e.shiftKey || e.ctrlKey || e.metaKey) { return true; } // allow cmd+click
      const href = $(this).attr('href');
      if (__guard__(href, x => x[0]) === '#') { return true; } // ignore # links
      if (href && !/^https?:\/\//i.test(href)) {
        const url = new URL(this.href);
        if (!/http/.test(url.protocol)) { return true; } // mailto: bitcoin: etc.
        e.preventDefault();
        const { basepath } = urb.util;
        if (basepath('', url.pathname) !== basepath('', document.location.pathname)) {
          document.location = this.href;
          return true;
        }
        if (url.pathname.substr(-1) !== '/') { url.pathname += '/'; }
        return _this.goTo(url.pathname + url.search + url.hash);
      } return null;
    });
    return this.checkRedirect();
  }

  componentDidUpdate() {
    this.setTitle();
    return this.checkRedirect();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    $('body').off('click', 'a');
  }

  setTitle() {
    let title = $('#body h1').first().text() || this.props.name;
    if (__guard__(this.props.meta, x => x.title)) {
      ({ title } = this.props.meta);
    }
    let { path } = this.props;
    if (path === '') { path = '/'; }
    document.title = `${title} - ${path}`;
  }

  setPath(path, hist) {
    if (hist !== false) { history.pushState({}, '', path); }
    const next = util.fragpath(path.split('#')[0]);
    if (next !== this.props.path) {
      return TreeActions.setCurr(next);
    } return null;
  }

  pullPath() {
    const l = document.location;
    const path = l.pathname + l.search + l.hash;
    return this.setPath(path, false);
  }

  checkRedirect() {
    if (this.props.meta.redirect) {
      return setTimeout((() => (this.goTo(this.props.meta.redirect))), 0);
    } return null;
  }

  goTo(path) {
    this.reset();
    return this.setPath(path);
  }

  render() {
    if (this.props.meta.anchor === 'none') { return (<div />); }

    const navClas = clas({
      container: this.props.meta.container === 'false',
    });

    let kidsPath = this.props.sein;
    if (this.props.meta.navpath) {
      kidsPath = this.props.meta.navpath;
    }

    const kids = [];

    if (this.state.subnav) {
      kids.push(reactify({
        gn: this.state.subnav,
        ga: {
          open: this.state.open,
          toggle: TreeActions.toggleNav,
        },
        c: [],
      }, 'subnav'));
    }

    return (<div id="head" className={navClas}>
      <NavBody
        curr={this.props.name}
        dataPath={kidsPath}
        meta={this.props.meta}
        sein={this.props.sein}
        goTo={this.goTo}
        key="nav"
      />
      {kids}
    </div>);
  }
}

Nav.propTypes = ContainerPropTypes;

export default Container({
  sein: 't',
  path: 't',
  name: 't',
  meta: 'j',
}, Nav);
