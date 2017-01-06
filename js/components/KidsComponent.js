import clas from 'classnames';

import util from '../utils/util.js';

import reactify from './Reactify.js';
import query from './Async.js';

let recl = React.createClass;
let {div,a,ul,li,hr} = React.DOM;

export default query({kids: {name:'t', bump:'t', body:'r', meta:'j', path:'t'}}, recl({
  displayName: "Kids",
  render() {
    let kids = util.sortKids(this.props.kids, this.props.sortBy);

    let kidsClas = clas(
      {kids:true},
      this.props.className);

    let kidClas = clas({
      "col-md-4":(this.props.grid === 'true')});

    let _kids = [];
    for (let elem of Array.from(kids)) {
      let body = (reactify(elem.body, null, {basePath:elem.path}));
      _kids.push([
        (div({key:elem.name,id:elem.name,className:kidClas}, body)),
        (hr({}))
      ]);
    }

    return div({className:kidsClas,key:"kids"}, _kids);
  }
})
);
