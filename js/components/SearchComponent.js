import query from './Async.js';
import reactify from './Reactify.js';

let recl = React.createClass;
let {a,div,input} = React.DOM;


export default query({name:'t', kids: { sect:'j'}
}, recl({
  hash:null,
  displayName: "Search",
  getInitialState() { return {search: 'wut'}; },
  onKeyUp(e){ return this.setState({search: e.target.value}); },
  wrap(elem,dir,path){
    let c, ga, gn;
    if (path.slice(-1) === "/") { path = path.slice(0, -1); }
    let href = this.props.name+"/"+dir+path;
    if (__guard__(__guard__(elem, x1 => x1.ga), x => x.id)) {
      ({gn,ga,c} = elem);
      ga = _.clone(ga);
      href += `#${ga.id}`;
      delete ga.id;
      elem = {gn,ga,c};
    }
    return {gn:'div', c:[{gn:'a', ga:{href}, c:[elem]}]};
  },
    
  render() { return div({},
    input({onKeyUp: this.onKeyUp,ref:'inp',defaultValue:'wut'}),
    _(this.props.kids)
      .map(({sect},dir)=> (() => {
        let result = [];
        for (var path in sect) {
          let heds = sect[path];
          result.push(Array.from(heds).map((h) => this.wrap(h,dir,path)));
        }
        return result;
      })())
      .flatten()
      .flatten()
      .map(this.highlight)
      .filter()
      .take(50)
      .map(reactify)
      .value()
  ); },
    
  highlight(e){
    if (!this.state.search) { return e; }
    let got = false;
    let res = reactify.walk(e,
      ()=> null,
      s=> {
        let m = s.split(this.state.search);
        if (m[1] == null) { return [s]; }
        let lit = {gn:'span',c:[this.state.search],ga: {style: {background: '#ff6'
      }
      }};
        got = true;
        return [m[0], ..._.flatten((() => {
          let result = [];
          for (s of Array.from(m.slice(1))) {             result.push([lit,s]);
          }
          return result;
        })())];
      },
      ({gn,ga,c})=> ({gn,ga,c:_.flatten(c)}));
    if (got) { return res; }
  }
})
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}