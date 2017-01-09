import clas from 'classnames';

import util from '../utils/util';
import query from './Async';
import reactify from './Reactify';

import TreeStore from '../stores/TreeStore';
import TreeActions from '../actions/TreeActions';

// unused
// let BodyComponent = React.createFactory(require('./BodyComponent'));

import SibsComponent from './SibsComponent'
import DpadComponent from './DpadComponent'

const Sibs = React.createFactory(SibsComponent);
const Dpad = React.createFactory(DpadComponent);

let recl = React.createClass;
let rend = ReactDOM.render;
let {div,a,ul,li,button} = React.DOM;

let Nav = React.createFactory(query({
    path:'t',
    kids: {
      name:'t',
      head:'r',
      meta:'j'
    }
  }, (recl({
    displayName: "Links",
    stateFromStore() { return TreeStore.getNav(); },
    getInitialState() { return this.stateFromStore(); },
    _onChangeStore() { if (this.isMounted()) { return this.setState(this.stateFromStore()); } },
    componentDidMount() { return TreeStore.addChangeListener(this._onChangeStore); },
    componentWillUnmount() { return TreeStore.removeChangeListener(this._onChangeStore); },

    onClick() { return this.toggleFocus(); },
    onMouseOver() { return this.toggleFocus(true); },
    onMouseOut() { return this.toggleFocus(false); },
    onTouchStart() { return this.ts = Number(Date.now()); },
    onTouchEnd() { let dt;
    return dt = this.ts - Number(Date.now()); },

    _home() {
      return this.props.goTo(this.props.meta.navhome ? this.props.meta.navhome : "/");
    },

    toggleFocus(state) { return $(ReactDOM.findDOMNode(this)).toggleClass('focus',state); },
    toggleNav() { return TreeActions.toggleNav(); },
    closeNav() { return TreeActions.closeNav(); },

    render() {
      let sub;
      let attr = {
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        onClick: this.onClick,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        'data-path':this.props.dataPath
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
        navbar:     (this.props.meta.navmode === 'navbar'),
        ctrl:       true,
        open:       (this.state.open === true)
      };
      if (this.props.meta.layout) {
        for (let v of Array.from(this.props.meta.layout.split(","))) {
          navClas[v.trim()] = true;
        }
      }
      navClas = clas(navClas);
      let iconClass = clas({
        icon: true,
        'col-md-1':(this.props.meta.navmode === 'navbar')
      });

      attr = _.extend(attr,{className:navClas,key:"nav"});

      let title = this.state.title ? this.state.title : "";
      let dpad  = (this.state.dpad !== false) && (__guard__(this.props.meta, x => x.navdpad) !== "false") ?
          (Dpad(this.props,""))
        : "";
      let sibs  = (this.state.sibs !== false) && (__guard__(this.props.meta, x1 => x1.navsibs) !== "false") ?
          (Sibs(_.merge(_.clone(this.props),{closeNav: this.closeNav}), ""))
        : "";

      let itemsClass = clas({
        items: true,
        'col-md-11':(this.props.meta.navmode === 'navbar')
      });

      if (this.props.meta.navsub) {
        let subprops = _.cloneDeep(this.props);
        subprops.dataPath = subprops.meta.navsub;
        delete subprops.meta.navselect;
        subprops.className = 'subnav';
        sub = Sibs(_.merge(subprops,{toggleNav: this.toggleNav}), "");
      }

      let toggleClas = clas({
        'navbar-toggler':true,
        show:(this.state.subnav != null)
      });

      return (div(attr, [
        div({className:linksClas,key:"links"}, [
          (div({className:iconClass}, [
            (div({className:'home',onClick:this._home}, "")),
            (div({className:'app'}, title)),
            dpad,
            (button({
              className:toggleClas,
              type:'button',
              onClick:this.toggleNav}, "☰"))
          ])),
          (div({className:itemsClass}, [
            sibs,
            sub
          ]))
        ])
      ]));
    }
  })),  recl({
    displayName: "Links_loading",
    _home() { return this.props.goTo("/"); },
    render() {
      return div({
          className:"ctrl loading",
          "data-path":this.props.dataPath,
          key:"nav-loading"
        },
        div({className:'links'},
          div({className:'icon'},
            (div({className:'home',onClick:this._home}, ""))),
          ul({className:"nav"},
            li({className:"nav-item selected"},
              a({className:"nav-link"}, this.props.curr))
          )
        )
      );
    }
  })
)
);

export default query({
  sein:'t',
  path:'t',
  name:'t',
  meta:'j'
  },(recl({
  displayName: "Nav",
  stateFromStore() { return TreeStore.getNav(); },
  getInitialState() { return _.extend(this.stateFromStore(),{url: window.location.pathname}); },
  _onChangeStore() { if (this.isMounted()) { return this.setState(this.stateFromStore()); } },

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
      if (e.shiftKey || e.ctrlKey || e.metaKey) { return true; }
      let href = $(this).attr('href');
      if (__guard__(href, x => x[0]) === "#") { return true; }
      if (href && !/^https?:\/\//i.test(href)) {
        let url = new URL(this.href);
        if (!/http/.test(url.protocol)) {  // mailto: bitcoin: etc.
          return;
        }
        e.preventDefault();
        let {basepath} = urb.util;
        if (basepath("",url.pathname) !== basepath("",document.location.pathname)) {
          document.location = this.href;
          return;
        }
        if (url.pathname.substr(-1) !== "/") {
          url.pathname += "/";
        }
        return _this.goTo(url.pathname+url.search+url.hash);
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
    if (__guard__(this.props.meta, x => x.title)) { ({ title } = this.props.meta); }
    let { path } = this.props;
    if (path === "") { path = "/"; }
    return document.title = `${title} - ${path}`;
  },

  pullPath() {
    let l = document.location;
    let path = l.pathname+l.search+l.hash;
    return this.setPath(path,false);
  },

  setPath(path,hist) {
    if (hist !== false) {
      history.pushState({},"",path);
    }
    let next = util.fragpath(path.split('#')[0]);
    if (next !== this.props.path) {
      return TreeActions.setCurr(next);
    }
  },

  reset() {
    return $("html,body").animate({scrollTop:0});
  },
    // $('#nav').attr 'style',''
    // $('#nav').removeClass 'scrolling m-up'
    // $('#nav').addClass 'm-down m-fixed'

  goTo(path) {
    this.reset();
    return this.setPath(path);
  },

  render() {
    if (this.props.meta.anchor === 'none') { return (div({}, "")); }

    let navClas = clas({
      container: this.props.meta.container === 'false'});

    let kidsPath = this.props.sein;
    if (this.props.meta.navpath) { kidsPath = this.props.meta.navpath; }

    let kids = [(Nav({
          curr:this.props.name,
          dataPath:kidsPath,
          meta:this.props.meta,
          sein:this.props.sein,
          goTo:this.goTo,
          key:"nav"
        }, "div"))];

    if (this.state.subnav) {
      kids.push(reactify({
          gn:this.state.subnav,
          ga:{open:this.state.open,toggle:TreeActions.toggleNav},
          c:[]
        }, "subnav")
      );
    }

    return div({id:'head', className:navClas}, kids);
  }
  }))
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
