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

const body = React.createClass({
  displayName: "Links",
  stateFromStore() {
    return TreeStore.getNav();
  },
  getInitialState() {
    return this.stateFromStore();
  },
  _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },
  componentDidMount() {
    return TreeStore.addChangeListener(this._onChangeStore);
  },
  componentWillUnmount() {
    return TreeStore.removeChangeListener(this._onChangeStore);
  },

  onClick() {
    return this.toggleFocus();
  },
  onMouseOver() {
    return this.toggleFocus(true);
  },
  onMouseOut() {
    return this.toggleFocus(false);
  },
  onTouchStart() {
    return this.ts = Number(Date.now());
  },
  onTouchEnd() {
    let dt;
    return dt = this.ts - Number(Date.now());
  },

  _home() {
    return this.props.goTo(this.props.meta.navhome ? this.props.meta.navhome : "/");
  },

  toggleFocus(state) {
    return $(ReactDOM.findDOMNode(this)).toggleClass('focus', state);
  },
  toggleNav() {
    return TreeActions.toggleNav();
  },
  closeNav() {
    return TreeActions.closeNav();
  },

  render() {
    let sub;
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

    let linksClas = clas({
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
    let iconClass = clas({
      icon: true,
      'col-md-1': (this.props.meta.navmode === 'navbar')
    });

    attr = _.extend(attr, {
      className: navClas,
      key: "nav"
    });

    let title = this.state.title ? this.state.title : "";
    let dpad = (this.state.dpad !== false) && (__guard__(this.props.meta, x => x.navdpad) !== "false") ?
      (Dpad(this.props, "")) :
      "";
    let sibs = (this.state.sibs !== false) && (__guard__(this.props.meta, x1 => x1.navsibs) !== "false") ?
      (Sibs(_.merge(_.clone(this.props), {
        closeNav: this.closeNav
      }), "")) :
      "";

    let itemsClass = clas({
      items: true,
      'col-md-11': (this.props.meta.navmode === 'navbar')
    });

    if (this.props.meta.navsub) {
      let subprops = _.cloneDeep(this.props);
      subprops.dataPath = subprops.meta.navsub;
      delete subprops.meta.navselect;
      subprops.className = 'subnav';
      sub = Sibs(_.merge(subprops, {
        toggleNav: this.toggleNav
      }), "");
    }

    let toggleClas = clas({
      'navbar-toggler': true,
      show: (this.state.subnav != null)
    });

    return (div(attr, [
      div({
        className: linksClas,
        key: "links"
      }, [
        (div({
          className: iconClass
        }, [
          (div({
            className: 'home',
            onClick: this._home
          }, "")),
          (div({
            className: 'app'
          }, title)),
          dpad,
          (button({
            className: toggleClas,
            type: 'button',
            onClick: this.toggleNav
          }, "☰"))
        ])),
        (div({
          className: itemsClass
        }, [
          sibs,
          sub
        ]))
      ])
    ]));
  }
})

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
