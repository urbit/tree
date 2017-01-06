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

let DEFER_USER = false;

export default query({comt:'j', path:'t', spur:'t'}, recl({
    displayName: "Post",
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
      let title = this.refs.in.title.value;
      let comment = this.refs.in.comment.value;
      let path = this.props.path || "/"; // XX deal with root path
      TreeActions.addPost(path,this.props.spur,title,comment);
      return e.preventDefault();
    },

    onChange(e) { return this.setState({value:e.target.value}); },

    render() {
      let _attr = {};
      if (this.state.loading === true) { _attr.disabled = "true"; }
      let titleInput = input(_.create(_attr, {
                           type: "text",
                           name: "title",
                           placeholder: "Title"
                         }));
      let bodyTextArea = textarea(_.create(_attr, {
                              type:"text",
                              name:"comment",
                              value:this.state.value,
                              onChange: this.onChange
                            }));
      let postButton = input(_.create(_attr, {
                            type:"submit",
                            value:"Post",
                            className:"btn btn-primary"
                          }));

      return (div({},
        (div({className:"add-post"},
          (form({ref:"in",onSubmit: this.onSubmit},
            (rele(Ship,{ship:this.state.user})),
            titleInput,
            bodyTextArea,
            postButton
          ))
        ))
      ));
    }
})
);
