import clas from 'classnames';

import load from './LoadComponent.js';
import query from './Async.js';
import reactify from './Reactify.js';

import TreeActions from '../actions/TreeActions.js';

import util from '../utils/util.js';

import Ship from './ShipComponent.js';

let recl   = React.createClass;
let rele   = React.createElement;
let {div,p,h2,img,a,form,textarea,input,code}  = React.DOM;

let DEFER_USER = true;

let Comment = ({time,user,body,loading=false}) =>
  div({className:(clas("comment", {loading}))},
     `${window.urb.util.toDate(new Date(time))}`,
     (h2({}, (rele(Ship, {ship:user})))),
     (reactify(body,"comt",{components:{}}))
  )
;

export default query({comt:'j', path:'t', spur:'t', meta:'j'}, recl({
    displayName: "Comments",
    getInitialState() {
      return {
        loading:null,
        value:"",
        user: urb.user != null ? urb.user : ""
      };
    },
      
    componentDidMount() {
      if (!DEFER_USER) {
        return urb.init(() => this.setState({user:urb.user}));
      }
    },
        
    componentDidUpdate(_props){
      if (urb.user && !this.state.user) {
        this.setState({user: urb.user != null ? urb.user : ""});
      }
      if (this.props.comt.length > _props.comt.length) {
        return this.setState({loading:null});
      }
    },

    onSubmit(e) {
      let {value} = this.refs.in.comment;
      TreeActions.addComment(this.props.path, this.props.spur, value);
      this.setState({
        value:"",
        loading:{'loading': 'loading', body:{gn:'p',c:[value]}, time:Date.now()}});
      return e.preventDefault();
    },

    onChange(e) { return this.setState({value:e.target.value}); },

    render() {
      let left;
      let _attr = {};
      if (this.state.loading === true) { _attr.disabled = "true"; }
      let textareaAttr = _.create(_attr, {
                              type:"text",
                              name:"comment",
                              value:this.state.value,
                              onChange: this.onChange
                            });
      let inputAttr = _.create(_attr, {
                            type:"submit",
                            value:"Add comment",
                            className:"btn btn-primary"
                          });
      
      let addComment = 
        (div({key:'add-comment',className:"add-comment"},
          (form({ref:"in",onSubmit: this.onSubmit},
            (rele(Ship,{ship:this.state.user})),
            (textarea(textareaAttr)),
            (input(inputAttr))
          ))
        ));

      let comments = this.props.comt.map((props,key)=> rele(Comment, _.extend({key}, props)));
      
      comments.unshift(((this.state.loading != null) ?
        rele(Comment, _.extend({key:'loading'}, this.state.loading, {user: this.state.user})) : undefined
      )
      );

      if (Array.from((left = __guard__(this.props.meta.comments, x => x.split(" "))) != null ? left : []).includes("reverse")) {
        comments = comments.reverse();
        return (div({}, [
          (div({key:'comments',className:"comments"}, comments)),
          addComment
        ]));
      } else {
        return (div({}, [
          addComment,
          (div({key:'comments',className:"comments"}, comments))
        ]));
      }
    }
})
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}