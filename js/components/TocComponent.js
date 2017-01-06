import query from './Async.js';
import reactify from './Reactify.js';

let recl = React.createClass;
let {div} = React.DOM;


export default query({body:'r'}, recl({
  hash:null,
  displayName: "TableOfContents",

  _click(id){
    return function() { if (id) { return document.location.hash = id; } };
  },
    
  componentDidMount() {
    this.int = setInterval(this.checkHash,100);
    this.st = $(window).scrollTop();
    // $(window).on 'scroll',@checkScroll
    return this.$headers = $('#toc').children('h1,h2,h3,h4').filter('[id]');
  },

  checkScroll() {
    let st = $(window).scrollTop();
    if (Math.abs(this.st-st) > 10) {
      let hash = null;
      this.st = st;
      return (() => {
        let result = [];
        for (let v of Array.from(this.$headers)) { 
          let item;
          if (v.tagName === undefined) { continue; }
          let $h = $(v);
          let hst = ($h.offset().top-$h.outerHeight(true))+10;
          if (hst < st) {
            hash = $h.attr('id');
          }
          if ((hst > st) && (hash !== this.hash) && (hash !== null)) {
            this.hash = `#${hash}`;
            document.location.hash = hash;
            break;
          }
          result.push(item);
        }
        return result;
      })();
    }
  },

  checkHash() {
    if ((__guard__(document.location.hash, x => x.length) > 0) && (document.location.hash !== this.hash)) {
      let hash = document.location.hash.slice(1);
      return (() => {
        let result = [];
        for (let v of Array.from(this.$headers)) { 
          let item;
          let $h = $(v);
          if (hash === $h.attr('id')) {
            this.hash = document.location.hash;
            var offset = $h.offset().top - $h.outerHeight(true);
            setTimeout(() => $(window).scrollTop(offset
              , 10)
             );
            break;
          }
          result.push(item);
        }
        return result;
      })();
    }
  },

  componentWillUnmount() {
    return clearInterval(this.int);
  },

  collectHeader({gn,ga,c}) {
    let comp;
    if (this.props.match) { comp = (gn === this.props.match); } else {
      comp = (gn && (gn[0] === 'h') && (parseInt(gn[1]) !== NaN));
    }
    if (comp) {
      ga = _.clone(ga);
      ga.onClick = this._click(ga.id);
      delete ga.id;
      return {gn,ga,c};
    }
  },

  parseHeaders() {
    if (this.props.body.c) {
      for (let v of Array.from(this.props.body.c)) {
        if ((v.gn === 'div') && (__guard__(v.ga, x => x.id) === "toc")) {
          let contents = [
            {gn:"h1", ga:{className:"t"}, c:["Table of contents"]},
            ...(_.filter(v.c.map(this.collectHeader)))
          ];
          if (this.props.noHeader) { contents.shift(); }
          return {
            gn:"div",
            ga:{className:"toc"},
            c:contents
           };
        }
      }
    }
  },

  render() { return reactify(this.parseHeaders()); }
})
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}