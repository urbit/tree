import util from '../utils/util.js';
import clas from 'classnames';
import reactify from './Reactify.js';
import query from './Async.js';

let recl = React.createClass;
let {ul,li,a} = React.DOM;

export default query({
    kids: {
      head:'r',
      meta:'j',
      name:'t',
      path:'t',
      bump:'t'
    }
  }, recl({
  displayName:"Siblings",
  toText(elem){ return reactify.walk(elem,
                             ()=> '',
                             s=> s,
                             ({c})=> (c != null ? c : []).join('')); },
  render() {
    let kids = util.sortKids(this.props.kids, this.props.meta.navsort);

    let navClas = {
      nav: true,
      'col-md-12': (this.props.meta.navmode === 'navbar')
    };
    if (this.props.className) { navClas[this.props.className] = true; }
    navClas = clas(navClas);

    return ul({className:navClas}, kids.map(({head,meta={},name,path}) => {
      let selected = name === this.props.curr;
      if (this.props.meta.navselect) {
        selected = name === this.props.meta.navselect;
      }
      let href = util.basepath(path);
      head = meta.title;
      if (head == null) { head = this.toText(head); }
      if (!head) { head = name; }
      let className = clas({
        "nav-item": true,
        selected
      });
      if (meta.sibsclass) {
        className += ` ${clas(meta.sibsclass.split(","))}`;
      }
      return (li({className,key:name},
        (a({className:"nav-link",href,onClick:this.props.closeNav}, head))));
    }
    )
    );
  }
  })
);
