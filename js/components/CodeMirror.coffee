recl = React.createClass
{div,textarea} = React.DOM

module.exports = recl
  render: -> div {}, textarea ref:'ed', value:@props.value
  componentDidMount: ->
    CodeMirror.fromTextArea ReactDOM.findDOMNode(@refs.ed),
      readOnly:true
      lineNumbers:true
