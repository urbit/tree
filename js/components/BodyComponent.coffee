clas    = require 'classnames'

load       = require './LoadComponent.coffee'
query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

TreeActions = require '../actions/TreeActions.coffee'
TreeStore   = require '../stores/TreeStore.coffee'

Comments    = require './CommentsComponent.coffee'
Plan        = require './PlanComponent.coffee'

util        = require '../utils/util.coffee'

recl   = React.createClass
rele   = React.createElement
{div,h1,h3,p,img,a,input}  = React.DOM

# named = (x,f)->  f.displayName = x; f
  
extras =
  spam: recl
    displayName: "Spam"
    render: ->
      if document.location.hostname isnt 'urbit.org'
        return (div {})
      (div {className:'spam'},
        (a {href:"http://urbit.org#sign-up"}, "Sign up")
        " for our newsletter."
      )

  logo: recl 
    displayName: "Logo"
    render: ->
      {color} = @props
      if color is "white" or color is "black"  # else?
        src = "//storage.googleapis.com/urbit-extra/logo/logo-#{color}-100x100.png"
      (a {href:"http://urbit.org",style:{border:"none"}}, 
       (img {src,className:"logo first"})
      )

  date: recl
    displayName: "Date"
    render: -> (div {className:'date'}, @props.date)

  title: recl
    displayName: "Title"
    render: -> (h1 {className:'title'}, @props.title)

  image: recl
    displayName: "Image"
    render: -> (img {src:@props.image}, "")

  preview: recl
    displayName: "Preview"
    render: -> (p {className:'preview'}, @props.preview)

  author: recl
    displayName: "Author"
    render: -> (h3 {className:'author'}, @props.author)

  plan: Plan


  next: query {
    path:'t'
    kids:
      name:'t'
      head:'r'
      meta:'j'
  }, recl
    displayName: "Next"
    render: ->
      curr = @props.kids[@props.curr]
      if curr?.meta?.next
        keys = util.getKeys @props.kids
        if keys.length > 1
          index = keys.indexOf(@props.curr)
          next = index+1
          if next is keys.length then next = 0
          next = keys[next]
          next = @props.kids[next]

          if next
            return (div {className:"link-next"},
              (a {href:"#{@props.path}/#{next.name}"}, "Next: #{next.meta.title}")
            )
      return (div {},"")

  comments: Comments

  footer: recl
    displayName: "Footer"
    render: ->
      containerClas = clas
        footer: true
        container: (@props.container is 'false')
      footerClas = clas
        'col-md-12': (@props.container is 'false')
      (div {className:containerClas,key:'footer-container'}, [
        (div {className:footerClas,key:'footer-inner'}, [
          "This page was served by an Urbit."
          (a {href:"mailto:urbit@urbit.org"}, "urbit@urbit.org")
        ])
      ])

module.exports = query {
  body:'r'
  name:'t'
  path:'t'
  meta:'j'
  sein:'t'
}, (recl
  displayName: "Body"
  stateFromStore: -> {curr:TreeStore.getCurr()}
  getInitialState: -> @stateFromStore()
  _onChangeStore: -> if @isMounted() then @setState @stateFromStore()
  componentDidMount: -> TreeStore.addChangeListener @_onChangeStore

  render: ->
    extra = (name,props={})=> 
      if @props.meta[name]? 
        if (_.keys props).length is 0
          props[name] = @props.meta[name]
        props.key = name
        React.createElement extras[name], props

    innerClas = {body:true}
    if @props.meta.anchor isnt 'none' and @props.meta.navmode isnt 'navbar'
      innerClas['col-md-10'] = true
      innerClas['col-md-offset-3'] = true
    if @props.meta.navmode is 'navbar' and @props.meta.container isnt 'false'
      innerClas['col-md-9'] = true
      innerClas['col-md-offset-1'] = true
    innerClas = clas innerClas

    bodyClas = clas (@props.meta.layout?.split ',')

    parts = [
      extra 'spam'
      extra 'logo', color: @props.meta.logo
      extra 'plan'
      reactify @props.body, 'body'
      extra 'next', {dataPath:@props.sein,curr:@props.name}
      extra 'comments'
      extra 'footer', {container:@props.meta.container}
    ]

    if @props.meta.type is "post"
      parts.splice(
        1
        0
        extra 'date'
        extra 'title'
        extra 'image'
        extra 'preview'
        extra 'author'
      )

    div {dataPath:@state.curr,key:@state.curr},[
      div {className:innerClas,'data-path':@props.path,key:'body-inner'},[
        (div {
            key:"body"+@props.path
            id: 'body'
            className: bodyClas
            }, parts
        )
      ]
    ]
), (recl
  render: -> 
    (div {id:'body', className:"col-md-offset-3 col-md-10"}, rele(load))
)
