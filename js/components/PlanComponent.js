import load from './LoadComponent.js';
import query from './Async.js';

import TreeActions from '../actions/TreeActions.js';

let recl = React.createClass;
let rele = React.createElement;
let {div,textarea,button,input,a,h6,code,span} = React.DOM;

let {table,tbody,tr,td}  = React.DOM;      // XX flexbox?
let Grid = function(props,...rows){ // Grid [[1,2],null,[3,4],[5,6]]
  let _td = x=> div({className:"td"}, x);
  let _tr = function(x){ if (x != null) { return (div({className:"tr"}, ...x.map(_td))); } };
  return (div(props, ...rows.map(_tr)));
};

export default query({
  plan:'j',
  beak:'t',
  path:'t'
}, recl({
  displayName: "Plan",
  getInitialState() {
    return {
      edit:false,
      plan:this.props.plan,
      focus: null,
      loaded:(urb.ship != null)
    };
  },

  componentDidMount() {
    return urb.init(() => this.setState({'loaded': 'loaded'}));
  },

  componentWillReceiveProps(props){
    if (_.isEqual(this.props.plan, this.state.plan)) {
      return this.setState({plan: props.plan});
    }
  },

  refInput(ref){
    return node=> {
      this[ref] = node;
      if (ref === this.state.focus) {
        return __guard__(node, x => x.focus());
      }
    };
  },

  saveInfo() {
    let plan = {who:this.who.value,loc:this.loc.value,acc:__guard__(this.props.plan, x => x.acc)};
    if (!_.isEqual(plan, this.state.plan)) {
      TreeActions.setPlanInfo(plan);
      this.setState({plan});
    }
    return this.setState({edit:false, focus:null});
  },

  render() {
    let accounts, editable, editButton;
    if (!this.state.loaded) {
      return (div({className:"plan"}, "Loading authentication info"));
    }
    let {beak,path} = this.props;
    let {acc,loc,who} = this.state.plan != null ? this.state.plan : {};
    let issuedBy =
      urb.sein !== urb.ship ?
        `~${urb.sein}`
      : "self";

    if (urb.user !== urb.ship) {
      editButton = null;
      editable = (ref,val,placeholder) => val != null ? val : placeholder;
    } else if (this.state.edit) {
      editButton =
        (button({
          className:'edit',
          onClick:() => {
            return this.saveInfo();
          }
          }, "Save"));
      editable = (ref,val,placeholder)=> {
        return input({
          placeholder,
          defaultValue:val,
          ref: (this.refInput(ref)),
          onKeyDown: ({keyCode})=> {
            if (keyCode === 13) {
              return this.saveInfo();
            }
          }
        });
      };
    } else {
      editButton =
        (button({
          className:'edit',
          onClick:() => {
            return (this.setState({edit:true}));
          }
          }, "Edit"));
      editable = (ref,val,placeholder)=> {
        let value = val != null ? val : placeholder;
        if (__guard__(this.props.plan, x => x[ref]) !== __guard__(this.state.plan, x1 => x1[ref])) {
          value = (rele(load, {}));
        }
        return (span({
          onClick: () => {
            return this.setState({edit:true, focus:ref});
          }
          }, value));
      };
    }

    if (!_.isEmpty(acc)) {
      accounts = ["Connected to:",   (div({},
        (() => {
        let result = [];
        for (let key in acc) {
          var val;
          let {usr,url} = acc[key];
          if (url == null) {
            val = key+"/"+usr;
          } else {
            val = (a({href:url}, key+"/"+usr));
          }
          result.push((div({key, className:'service'},val)));
        }
        return result;
      })()
         ))];
    } else {
        accounts = "";
      }

    return (div({className:"plan"},
       (div({className:"home"}, "")),
       (div({className:"mono"}, `~${urb.ship}`)),
       (who != null) || this.state.edit ? (h6({}, editable('who', who, "Sun Tzu"))) : undefined,
       (Grid({className:"grid"},
         ["Location:",       (editable('loc', loc, "Unknown"))],
         ["Issued by:",      (a({href:`//${urb.sein}.urbit.org`}, issuedBy))],
         ["Immutable link:", (a({href:beak+"/web"+path}, beak))],
         accounts
       )),
       editButton
    ));
  }
})
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}