let recl = React.createClass;
let {div,textarea} = React.DOM;

export default recl({
  render() { return div({}, textarea({ref:'ed', value:this.props.value})); },
  componentDidMount() {
    return CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.ed), {
      readOnly:true,
      lineNumbers:true
    }
    );
  }
});
