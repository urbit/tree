class Email extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'email';
    this.state = { submit: false, email: '' };
  }

  componentDidMount() { this.$email = $('input.email'); }

  onClick() { return this.submit(); }

  onChange(e) {
    const email = e.target.value;
    this.setState({ email: e.target.value });
    const valid = ((email.indexOf('@') !== -1) &&
      (email.indexOf('.') !== -1) &&
      (email.length > 7) &&
      (email.split('.')[1].length > 1) &&
      (email.split('@')[0].length > 0) &&
      (email.split('@')[1].length > 4));
    this.$email.toggleClass('valid', valid);
    this.$email.removeClass('error');
    if (e.keyCode === 13) {
      if (valid === true) {
        this.submit();
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      return this.$email.addClass('error');
    } return null;
  }

  submit() {
    return $.post(this.props.dataPath,
        { email: this.$email.val() },
        () => { this.setState({ submit: true }); },
      );
  }

  render() {
    let cont;
    if (this.state.submit === false) {
      const submit = this.props.submit != null ? this.props.submit : 'Sign up';
      cont = (<span>
        <input
          key="field"
          className="email"
          placeholder="your@email.com"
          onChange={this.onChange}
          value={this.state.email}
        />
        <button
          key="submit"
          className="submit btn"
          onClick={this.onClick}
        >
          {submit}
        </button>
      </span>);
    } else {
      cont = <div className="submitted">Got it. Thanks!</div>;
    }
    return (<p className="email" id="sign-up">{cont}</p>);
  }
}

Email.propTypes = {
  dataPath: React.PropTypes.string,
  submit: React.PropTypes.string,
};

export default Email;
