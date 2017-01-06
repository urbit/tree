let recl = React.createClass;
let {div,p,button,input} = React.DOM;

export default recl({
  displayName: "email",

  getInitialState() { return {submit:false,email:""}; },

  onClick() { return this.submit(); },
  onChange(e) {
    let email = e.target.value;
    this.setState({email:e.target.value});
    let valid = ((email.indexOf('@') !== -1) &&
      (email.indexOf('.') !== -1) &&
      (email.length > 7) &&
      (email.split(".")[1].length > 1) &&
      (email.split("@")[0].length > 0) &&
      (email.split("@")[1].length > 4));
    this.$email.toggleClass('valid',valid);
    this.$email.removeClass('error');
    if (e.keyCode === 13) {
      if (valid === true) {
        this.submit();
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else {
        return this.$email.addClass('error');
      }
    }
  },

  submit() {
    return $.post(this.props.dataPath,{email:this.$email.val()},() => {
      return this.setState({submit:true});
    });
  },

  componentDidMount() { return this.$email = $('input.email'); },

  render() {
    let cont;
    if (this.state.submit === false) {
      let submit = this.props.submit != null ? this.props.submit : "Sign up";
      cont = [
        (input({key:"field",className:"email",placeholder:"your@email.com",onChange: this.onChange,value:this.state.email})),
        (button({key:"submit",className:"submit btn",onClick: this.onClick}, submit))
      ];
    } else {
      cont = [(div({className:"submitted"},"Got it. Thanks!"))];
    }
    return (p({className:"email",id:"sign-up"}, cont));
  }
});
