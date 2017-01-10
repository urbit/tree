import clas from 'classnames';

import reactify from './Reactify';
import query from './Async';

import util from '../utils/util';

let recl = React.createClass;
let {div,pre,span,a,ul,li,h1} = React.DOM;

export default query({
    path:'t',
    kids: {
      snip:'r',
      head:'r',
      meta:'j',
      bump:'t',
      name:'t'
    }
  }, recl({
  displayName: "List",

  render() {
    let k = clas(
      {list: true},
      this.props.dataType,
      {default: this.props['data-source'] === 'default'},
      this.props.className);
    let kids = this.renderList((util.sortKids(this.props.kids, this.props.sortBy)));
    if ((kids.length !== 0) || (this.props.is404 == null)) {
      return (ul({className:k}, kids));
    }

    return div({className:k},
      h1({className:'red inverse block error'}, 'Error: Empty path'),
      div({},
        pre({}, this.props.path),
        span({}, 'is either empty or does not exist.'))
    );
  },

  renderList(elems){
    return (() => {
      let result = [];
      for (let elem of Array.from(elems)) {
        var linked, preview;
        let item = elem.name;
        let meta = elem.meta != null ? elem.meta : {};
        let path = this.props.path+"/"+item;
        if (meta.hide != null) { continue; }
        let href = util.basepath(path);
        if (this.props.linkToFragments != null) { href=`#${item}`; }
        if (this.props.childIsFragment != null) { href=(util.basepath(this.props.path))+"#"+item; }
        if (meta.link) { href = meta.link; }
        let parts = [];
        let title = null;

        if (meta.title) {
          if (this.props.dataType === 'post') {
            title = {
              gn: 'a',
              ga: {href},
              c: [{
                gn: 'h1',
                ga: {className:'title'},
                c: [meta.title]
              }]
            };
          } else {
            title = {
              gn: 'h1',
              ga: {className:'title'},
              c: [meta.title]
            };
          }
        }
        if (!title && (elem.head.c.length > 0)) {
          title = elem.head;
        }
        if (!title) {
          title = {
            gn: 'h1',
            ga: {className:'title'},
            c: [item]
          };
        }

        if (!this.props.titlesOnly) {        // date
          let _date = meta.date;
          if (!_date || (_date.length === 0)) { _date = ""; }
          let date = {
            gn: 'div',
            ga: {className: 'date'},
            c: [_date]
          };
          parts.push(date);
        }

        parts.push(title);

        if (!this.props.titlesOnly) {         // metadata
          if (this.props.dataType === 'post') {
            if (meta.image) {           // image
              let image = {
                gn: 'a',
                ga: {href},
                c: [{
                  gn: 'img',
                  ga: {
                    src: meta.image
                  }
                }]
              };
              parts.push(image);
            }
          }
          if (this.props.dataPreview) {         // preview
            if (!meta.preview) {
              parts.push(...(elem.snip.c.slice(0,2)));
            } else {
              if (meta.preview) {
                preview = {
                  gn: 'p',
                  ga: {className:'preview'},
                  c: [meta.preview]
                };
              } else {
                preview = elem.snip;
              }
              parts.push(preview);
            }
          }
          if (this.props.dataType === 'post') {
            if (meta.author) {          // author
                let author = {
                  gn: 'h3',
                  ga: {className:'author'},
                  c: [meta.author]
                };
                parts.push(author);
              }
            let cont = {
              gn: 'a',
              ga: {className:'continue',href},
              c: ['Read more']
            };
            parts.push(cont);
            linked = true;
          }
        }

        let node = reactify({gn:'div',c:parts});
        if (linked == null) {
          node = (a({
              href,
              className:(clas({preview:(this.props.dataPreview != null)}))
            },node));
        }

        result.push(li({key:item},node));
      }
      return result;
    })();
  }
  })
);
