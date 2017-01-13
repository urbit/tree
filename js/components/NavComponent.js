import clas from 'classnames';
import util from '../utils/util';
import query from './Async';
import reactify from './Reactify';
import TreeStore from '../stores/TreeStore';
import TreeActions from '../actions/TreeActions';
import NavBody from './NavBodyComponent';

const { div } = React.DOM;

const Nav = React.createClass({
  displayName: 'Nav',
  stateFromStore() {
    return TreeStore.getNav();
  },
  getInitialState() {
    return _.extend(this.stateFromStore(), {
      url: window.location.pathname
    });
  },
  _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },

  componentWillUnmount() {
    clearInterval(this.interval);
    $('body').off('click', 'a');
    return TreeStore.removeChangeListener(this._onChangeStore);
  },

  componentDidUpdate() {
    this.setTitle();
    return this.checkRedirect();
  },

  componentDidMount() {
    this.setTitle();

    window.onpopstate = this.pullPath;

    TreeStore.addChangeListener(this._onChangeStore);

    let _this = this;
    $('body').on('click', 'a', function(e) {
      // allow cmd+click
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return true;
      }
      let href = $(this).attr('href');
      if (__guard__(href, x => x[0]) === "#") {
        return true;
      }
      if (href && !/^https?:\/\//i.test(href)) {
        let url = new URL(this.href);
        if (!/http/.test(url.protocol)) { // mailto: bitcoin: etc.
          return;
        }
        e.preventDefault();
        let {
          basepath
        } = urb.util;
        if (basepath("", url.pathname) !== basepath("", document.location.pathname)) {
          document.location = this.href;
          return;
        }
        if (url.pathname.substr(-1) !== "/") {
          url.pathname += "/";
        }
        return _this.goTo(url.pathname + url.search + url.hash);
      }
    });
    return this.checkRedirect();
  },

  checkRedirect() {
    if (this.props.meta.redirect) {
      return setTimeout((() => (this.goTo(this.props.meta.redirect))), 0);
    }
  },

  setTitle() {
    let title = $('#body h1').first().text() || this.props.name;
    if (__guard__(this.props.meta, x => x.title)) {
      ({
        title
      } = this.props.meta);
    }
    let {
      path
    } = this.props;
    if (path === "") {
      path = "/";
    }
    return document.title = `${title} - ${path}`;
  },

  pullPath() {
    let l = document.location;
    let path = l.pathname + l.search + l.hash;
    return this.setPath(path, false);
  },

  setPath(path, hist) {
    if (hist !== false) {
      history.pushState({}, "", path);
    }
    let next = util.fragpath(path.split('#')[0]);
    if (next !== this.props.path) {
      return TreeActions.setCurr(next);
    }
  },

  reset() {
    return $("html,body").animate({
      scrollTop: 0
    });
  },
  // $('#nav').attr 'style',''
  // $('#nav').removeClass 'scrolling m-up'
  // $('#nav').addClass 'm-down m-fixed'

  goTo(path) {
    this.reset();
    return this.setPath(path);
  },

  render() {
    if (this.props.meta.anchor === 'none') {
      return (div({}, ""));
    }

    let navClas = clas({
      container: this.props.meta.container === 'false'
    });

    let kidsPath = this.props.sein;
    if (this.props.meta.navpath) {
      kidsPath = this.props.meta.navpath;
    }

    let kids = [(NavBody({
      curr: this.props.name,
      dataPath: kidsPath,
      meta: this.props.meta,
      sein: this.props.sein,
      goTo: this.goTo,
      key: "nav"
    }, "div"))];

    if (this.state.subnav) {
      kids.push(reactify({
        gn: this.state.subnav,
        ga: {
          open: this.state.open,
          toggle: TreeActions.toggleNav
        },
        c: []
      }, "subnav"));
    }

    return div({
      id: 'head',
      className: navClas
    }, kids);
  }
})

export default query({
  sein: 't',
  path: 't',
  name: 't',
  meta: 'j'
}, Nav);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
