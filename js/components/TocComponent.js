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

  collectHeader(elem) {
    let name = _.keys(elem)[0]
    if( (this.props.match && (name === this.props.match)) ||
        (name[0] === 'h' && (parseInt(name[1]) !== NaN)))
    {
      var [attrs,...kids] = elem[name]
      attrs = _.clone(attrs);
      attrs.onClick = this._click(attrs.id);
      delete attrs.id;
      return {[name]:[attrs,...kids]}
    }
  },

  parseHeaders() {
    if (this.props.body['div']) {
      for (let v of Array.from(this.props.body['div'].slice(1))) {
        if (v['div'])
          var [attrs,...children] = v['div']
          if(attrs.id === "toc") {
            let contents = _.filter(children.map(this.collectHeader))
            return {
              "div":[
                {className:"toc"},
                (this.props.noHeader ? "" : <h1 className='t'>Table of contents</h1>),
                ...contents
             ]};
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
