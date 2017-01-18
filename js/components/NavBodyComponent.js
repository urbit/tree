import clas from 'classnames';
import query from './Async';
import TreeStore from '../stores/TreeStore';
import TreeActions from '../actions/TreeActions';
import SibsComponent from './SibsComponent';
import DpadComponent from './DpadComponent';

import loading from './NavLoadingComponent';

const Sibs = React.createFactory(SibsComponent);
const Dpad = React.createFactory(DpadComponent);

// const body = React.createClass({
class body extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.displayName = 'Links';
    this.state = TreeStore.getNav();
  }
  componentDidMount() {
    this.mounted = true;
    return TreeStore.addChangeListener(this._onChangeStore);
  }
  componentWillUnmount() {
    this.mounted = false;
    return TreeStore.removeChangeListener(this._onChangeStore);
  }
  onClick() { return this.toggleFocus(); }
  onMouseOver() { return this.toggleFocus(true); }
  onMouseOut() { return this.toggleFocus(false); }
  onTouchStart() { this.ts = Number(Date.now()); }
  onTouchEnd() { dt = this.ts - Number(Date.now()); }  // XX dt? unused.
  _onChangeStore() {
    if (this.mounted) {
      this.state = TreeStore.getNav();
    }
  }
  _home() {
    const home = this.props.meta.navhome ? this.props.meta.navhome : '/';
    return this.props.goTo(home);
  }
  toggleFocus(state) {
    return $(ReactDOM.findDOMNode(this)).toggleClass('focus', state);
  }
  toggleNav() { TreeActions.toggleNav(); }
  closeNav() { TreeActions.closeNav(); }
  render() {
    let attr = {
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onClick: this.onClick,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      'data-path': this.props.dataPath,
    };
    if (_.keys(window).indexOf('ontouchstart') !== -1) {
      delete attr.onMouseOver;
      delete attr.onMouseOut;
    }

    const linksClas = clas({
      links: true,
      subnav: (this.props.meta.navsub != null),
    });
    let navClas = {
      navbar: (this.props.meta.navmode === 'navbar'),
      ctrl: true,
      open: (this.state.open === true),
    };
    if (this.props.meta.layout) {
      this.props.meta.layout.split(',').forEach((v) => {
        navClas[v.trim()] = true;
        return true;
      });
    }
    navClas = clas(navClas);
    const iconClass = clas({
      icon: true,
      'col-md-1': (this.props.meta.navmode === 'navbar')
    });
    const itemsClass = clas({
      items: true,
      'col-md-11': (this.props.meta.navmode === 'navbar')
    });

    attr = _.extend(attr, {
      className: navClas,
      key: 'nav',
    });

    let SubSibsComponent;
    if (this.props.meta.navsub) {
      const subprops = _.cloneDeep(this.props);
      subprops.dataPath = subprops.meta.navsub;
      delete subprops.meta.navselect;
      subprops.className = 'subnav';
      SubSibsComponent = Sibs(_.merge(subprops, {
        toggleNav: this.toggleNav,
      }), '');
    }

    const toggleClas = clas({
      'navbar-toggler': true,
      show: (this.state.subnav != null),
    });

    return (<div className={navClas} key="nav">
      <div className={linksClas} key="links">
        <div className={iconClass}>
          <div className="home" onClick={this._home} />
          <div className="app">{this.state.title ? this.state.title : ''}</div>
          {((this.state.dpad !== false) &&
            (__guard__(this.props.meta, x => x.navdpad) !== "false")) &&
            <Dpad
              dataPath={this.props.dataPath}
              sein={this.props.sein}
              curr={this.props.curr}
              kids={this.props.kids}
              meta={this.props.meta}
            />
          }
          <button
            className={toggleClas}
            type="button"
            onClick={this.toggleNav}
          >☰
          </button>
        </div>
        <div className={itemsClass}>
          {((this.state.sibs !== false) &&
            (__guard__(this.props.meta, x1 => x1.navsibs) !== "false")) &&
            <Sibs
              className={this.props.className}
              dataPath={this.props.dataPath}
              sein={this.props.sein}
              curr={this.props.curr}
              kids={this.props.kids}
              meta={this.props.meta}
              closeNav={this.closeNav}
            />
          }
          {this.props.meta.navsub && <SubSibsComponent />}
        </div>
      </div>
    </div>);
  }
}

export default React.createFactory(query({
  path: 't',
  kids: {
    name: 't',
    head: 'r',
    meta: 'j',
  },
}, body, loading));

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
