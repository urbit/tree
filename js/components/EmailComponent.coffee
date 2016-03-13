reactify    = require './Reactify.coffee'

recl = React.createClass
{div,p,button,input} = React.DOM

module.exports = recl
  displayName: "email"

  getInitialState: -> {submit:false,email:""}

  onClick: -> @submit()
  onChange: (e) -> 
    email = e.target.value
    @setState {email:e.target.value}
    valid = (email.indexOf('@') != -1 && 
      email.indexOf('.') != -1 && 
      email.length > 7 && 
      email.split(".")[1].length > 1 &&
      email.split("@")[0].length > 0 &&
      email.split("@")[1].length > 4)
    @$email.toggleClass 'valid',valid
    @$email.removeClass 'error'
    if e.keyCode is 13 
      if valid is true 
        @submit()
        e.stopPropagation()
        e.preventDefault()
        return false
      else
        @$email.addClass 'error'

  submit: ->
    $.post @props.dataPath,{email:@$email.val()},() =>
      @setState {submit:true}

  componentDidMount: -> @$email = $('input.email')

  render: ->
    if @state.submit is false
      submit = @props.submit ? "Sign up"
      cont = [
        (input {key:"field",className:"email",placeholder:"your@email.com",@onChange,value:@state.email})
        (button {key:"submit",className:"submit",@onClick}, submit)
      ]
    else
      cont = [(div {className:"submitted"},"Got it. Thanks!")]
    (p {className:"email",id:"sign-up"}, cont)
