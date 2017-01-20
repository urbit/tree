const { div, textarea } = React.DOM;

class CodeMirror extends React.Component {
  componentDidMount() {
    return CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.ed), {
      readOnly: true,
      lineNumbers: true,
    });
  }
  render() {
    return div({},
      textarea({ ref: 'ed', value: this.props.value }));
  }
}

export default CodeMirror;
