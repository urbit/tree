import clas from 'classnames';

import load from './LoadComponent.js';
import query from './Async.js';
import reactify from './Reactify.js';

import TreeActions from '../actions/TreeActions.js';
import TreeStore from '../stores/TreeStore.js';

import Comments from './CommentsComponent.js';
// Plan        = require './PlanComponent.js'

import util from '../utils/util.js';

let name   = (displayName,component)=> _.extend(component, {displayName});
let recl   = React.createClass;
let rele   = React.createElement;
let {div,h1,h3,p,img,a,input}  = React.DOM;

// named = (x,f)->  f.displayName = x; f

let extras = {
  spam: name("Spam", function() {
      if (document.location.hostname !== 'urbit.org') {
        return (div({}));
      }
      return (div({className:'spam'},
        (a({href:"http://urbit.org#sign-up"}, "Sign up")),
        " for our newsletter."
      ));
  }),

  logo: name("Logo", function({color}){
      let src;
      if ((color === "white") || (color === "black")) {  // else?
        src = `//media.urbit.org/logo/logo-${color}-100x100.png`;
      }
      return (a({href:"http://urbit.org",style:{border:"none"}},
       (img({src,className:"logo first"}))
      ));
  }),

  date: name("Date", ({date})=> div({className:'date'}, date)),

  title: name("Title", ({title})=> h1({className:'title'}, title)),

  image: name("Image", ({image})=> img({src:image})),

  preview: name("Preview", ({preview})=> p({className:'preview'}, preview)),

  author: name("Author", ({author})=> h3({className:'author'}, author)),

  // plan: Plan


  next: query({
    path:'t',
    kids: {
      name:'t',
      head:'r',
      meta:'j',
      bump:'t'
    }
  }, name("Next", function({curr,meta,path,kids}){
      if (__guard__(__guard__(kids[curr], x1 => x1.meta), x => x.next)) {
        let keys = util.getKeys(kids, meta.navsort);
        if (keys.length > 1) {
          let index = keys.indexOf(curr);
          let next = index+1;
          if (next === keys.length) { next = 0; }
          next = keys[next];
          next = kids[next];

          if (next) {
            return (div({className:"link-next"},
              (a({href:`${path}/${next.name}`}, `Next: ${next.meta.title}`))
            ));
          }
        }
      }
      return (div({},""));
  })
  ),

  comments: Comments,

  footer: name("Footer", function({container}){
      let containerClas = clas({
        footer: true,
        container: (container === 'false')
      });
      let footerClas = clas({
        'col-md-12': (container === 'false')});
      return (div({className:containerClas,key:'footer-container'}, [
        (div({className:footerClas,key:'footer-inner'}, [
          "This page was made by Urbit. Feedback: ",
          (a({href:"mailto:urbit@urbit.org"}, "urbit@urbit.org")),
          " ",
          (a({href:"https://twitter.com/urbit_"}, "@urbit_"))
        ]))
      ]));
  })
};

export default query({
  body:'r',
  name:'t',
  path:'t',
  meta:'j',
  sein:'t'
}, (recl({
  displayName: "Body",
  stateFromStore() { return {curr:TreeStore.getCurr()}; },
  getInitialState() { return this.stateFromStore(); },
  _onChangeStore() { if (this.isMounted()) { return this.setState(this.stateFromStore()); } },
  componentDidMount() { return TreeStore.addChangeListener(this._onChangeStore); },

  render() {
    let extra = (name,props)=> {
      if (props == null) { props = {}; }
      if (this.props.meta[name] != null) {
        if ((_.keys(props)).length === 0) {
          props[name] = this.props.meta[name];
        }
        props.key = name;
        return React.createElement(extras[name], props);
      }
    };

    let innerClas = {body:true};
    if ((this.props.meta.anchor !== 'none') && (this.props.meta.navmode !== 'navbar')) {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-3'] = true;
    }
    if ((this.props.meta.navmode === 'navbar') && (this.props.meta.container !== 'false')) {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-1'] = true;
    }
    innerClas = clas(innerClas);

    let bodyClas = clas((__guard__(this.props.meta.layout, x => x.split(','))));
    if (this.props.meta.type && (bodyClas.indexOf(this.props.meta.type) === -1)) {
      bodyClas += ` ${this.props.meta.type}`;
    }

    let parts = [
      extra('spam'),
      extra('logo', {color: this.props.meta.logo}),
      // extra 'plan'
      reactify(this.props.body, 'body'),
      extra('next', {dataPath:this.props.sein,curr:this.props.name,meta:this.props.meta}),
      extra('comments'),
      extra('footer', {container:this.props.meta.container})
    ];

    if (this.props.meta.type === "post") {
      parts.splice(
        1,
        0,
        extra('date'),
        extra('title'),
        extra('image'),
        extra('preview'),
        extra('author')
      );
    }

    return div({dataPath:this.state.curr,key:this.state.curr},[
      div({className:innerClas,'data-path':this.props.path,key:'body-inner'},[
        (div({
            key:`body${this.props.path}`,
            id: 'body',
            className: bodyClas
            }, parts
        ))
      ])
    ]);
  }})
), (recl({
  render() {
    return (div({id:'body', className:"col-md-offset-3 col-md-9"}, rele(load)));
  }
}))
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}