import clas from 'classnames';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';

import TreeStore from '../stores/TreeStore';
import { toggleNav, closeNav } from '../TreeActions';
import SibsComponent from './SibsComponent';
import DpadComponent from './DpadComponent';

import Loading from './NavLoadingComponent';

const Sibs = React.createFactory(SibsComponent);
const Dpad = React.createFactory(DpadComponent);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

class NavBody extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.displayName = 'Links';
    this.state = TreeStore.getNav();
  }

  onClick() { return this.toggleFocus(); }

  onMouseOver() { return this.toggleFocus(true); }

  onMouseOut() { return this.toggleFocus(false); }

  onTouchStart() { this.ts = Number(Date.now()); }

  onTouchEnd() { dt = this.ts - Number(Date.now()); }  // XX dt? unused.

  toggleNav() { this.props.dispatch(toggleNav()); }

  closeNav() { this.props.dispatch(closeNav()); }

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
      'col-md-1': (this.props.meta.navmode === 'navbar'),
    });
    const itemsClass = clas({
      items: true,
      'col-md-11': (this.props.meta.navmode === 'navbar'),
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

NavBody.propTypes = ContainerPropTypes;

export default Container({
  path: 't',
  kids: {
    name: 't',
    head: 'r',
    meta: 'j',
  },
}, NavBody, Loading);
