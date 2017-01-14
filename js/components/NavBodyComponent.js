import clas from 'classnames';
import query from './Async';
import TreeStore from '../stores/TreeStore';
import TreeActions from '../actions/TreeActions';
import SibsComponent from './SibsComponent';
import DpadComponent from './DpadComponent';

const Sibs = React.createFactory(SibsComponent);
const Dpad = React.createFactory(DpadComponent);

const {
  div,
  a,
  ul,
  li,
  button,
} = React.DOM;

// const body = React.createClass({
class body extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.displayName = 'Links';
    this.state = this.stateFromStore();
  }
  stateFromStore() { return TreeStore.getNav(); }
  _onChangeStore() {
    if (this.mounted) {
      return this.setState(this.stateFromStore());
    } return null;
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
  _home() {
    const home = this.props.meta.navhome ? this.props.meta.navhome : '/';
    return this.props.goTo(home);
  }
  toggleFocus(state) {
    return $(ReactDOM.findDOMNode(this)).toggleClass('focus', state);
  }
  toggleNav() { return TreeActions.toggleNav(); }
  closeNav() { return TreeActions.closeNav(); }
  render() {
    let attr = {
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onClick: this.onClick,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      'data-path': this.props.dataPath
    };
    if (_.keys(window).indexOf("ontouchstart") !== -1) {
      delete attr.onMouseOver;
      delete attr.onMouseOut;
    }

    const linksClas = clas({
      links: true,
      subnav: (this.props.meta.navsub != null)
    });
    let navClas = {
      navbar: (this.props.meta.navmode === 'navbar'),
      ctrl: true,
      open: (this.state.open === true)
    };
    if (this.props.meta.layout) {
      for (let v of Array.from(this.props.meta.layout.split(","))) {
        navClas[v.trim()] = true;
      }
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
      key: "nav"
    });

    if (this.props.meta.navsub) {
      let subprops = _.cloneDeep(this.props);
      subprops.dataPath = subprops.meta.navsub;
      delete subprops.meta.navselect;
      subprops.className = 'subnav';
      SubSibsComponent = Sibs(_.merge(subprops, {
        toggleNav: this.toggleNav
      }), "");
    }

    const toggleClas = clas({
      'navbar-toggler': true,
      show: (this.state.subnav != null)
    });

    return (<div className={navClas} key="nav">
      <div className={linksClas} key="links">
        <div className={iconClass}>
          <div className="home" onClick={this._home} />
          <div className="app">{this.state.title ? this.state.title : ''}</div>
          {((this.state.dpad !== false) &&
            (__guard__(this.props.meta, x => x.navdpad) !== "false")) &&
            <Dpad
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

    // return (div(attr, [
    //   div({
    //     className: linksClas,
    //     key: "links"
    //   }, [
    //     (div({
    //       className: iconClass
    //     }, [
    //       (div({
    //         className: 'home',
    //         onClick: this._home
    //       }, "")),
    //       (div({
    //         className: 'app'
    //       }, title)),
    //       dpad,
    //       (button({
    //         className: toggleClas,
    //         type: 'button',
    //         onClick: this.toggleNav
    //       }, "☰"))
    //     ])),
    //     (div({
    //       className: itemsClass
    //     }, [
    //       sibs,
    //       sub
    //     ]))
    //   ])
    // ]));
  }
}

const loading = React.createClass({
  displayName: "Links_loading",
  _home() {
    return this.props.goTo("/");
  },
  render() {
    return div({
        className: "ctrl loading",
        "data-path": this.props.dataPath,
        key: "nav-loading"
      },
      div({
          className: 'links'
        },
        div({
            className: 'icon'
          },
          (div({
            className: 'home',
            onClick: this._home
          }, ""))),
        ul({
            className: "nav"
          },
          li({
              className: "nav-item selected"
            },
            a({
              className: "nav-link"
            }, this.props.curr))
        )
      )
    );
  }
})

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
