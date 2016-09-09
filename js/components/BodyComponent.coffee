clas    = require 'classnames'

load       = require './LoadComponent.coffee'
query      = require './Async.coffee'
reactify   = require './Reactify.coffee'

ForaActions = require '../actions/ForaActions.coffee'
TreeActions = require '../actions/TreeActions.coffee'
TreeStore   = require '../stores/TreeStore.coffee'

Comments    = require './CommentsComponent.coffee'
# Plan        = require './PlanComponent.coffee'

util        = require '../utils/util.coffee'

name   = (displayName,component)-> _.extend component, {displayName}
recl   = React.createClass
rele   = React.createElement
{div,h1,h3,p,img,a,input,button,textarea}  = React.DOM

# named = (x,f)->  f.displayName = x; f

Editor = query {down:'t'}, ({down})->
  textarea defaultValue: down.replace(util.FRONTMATTER,'')

extras =
  spam: name "Spam", ->
      if document.location.hostname isnt 'urbit.org'
        return (div {})
      (div {className:'spam'},
        (a {href:"http://urbit.org#sign-up"}, "Sign up")
        " for our newsletter."
      )

  logo: name "Logo", ({color})->
      if color is "white" or color is "black"  # else?
        src = "//media.urbit.org/logo/logo-#{color}-100x100.png"
      (a {href:"http://urbit.org",style:{border:"none"}},
       (img {src,className:"logo first"})
      )

  date: name "Date", ({date})-> (div {className:'date'}, date)

  title: recl
    displayName: "Title"
    render: ->
      {title,edit} = @props
      div {},
        if !edit
          (h1 {className:'title'}, title)
        else
          (input {className:'title', defaultValue:title})

  image: name "Image", ({image})-> (img {src:image})

  preview: name "Preview", ({preview})-> (p {className:'preview'}, preview)

  author: name "Author", ({author})-> (h3 {className:'author'}, author)

  # plan: Plan


  next: query {
    path:'t'
    kids:
      name:'t'
      head:'r'
      meta:'j'
  }, name "Next", ({curr,path,kids})->
      if kids[curr]?.meta?.next
        keys = util.getKeys kids
        if keys.length > 1
          index = keys.indexOf(curr)
          next = index+1
          if next is keys.length then next = 0
          next = keys[next]
          next = kids[next]

          if next
            return (div {className:"link-next"},
              (a {href:"#{path}/#{next.name}"}, "Next: #{next.meta.title}")
            )
      return (div {},"")

  editable: ({setEdit,runEdit,edit,meta})->
    if !urb.user then return div {} # XX non-logged-in
    if ("~" + urb.user) != meta.author # not our post
      return div {}
    if !edit
      div {}, button {onClick:setEdit}, "Edit"
    else
      div {}, button {onClick:runEdit}, "Save"
  comments: Comments

  footer: name "Footer", ({container})->
      containerClas = clas
        footer: true
        container: (container is 'false')
      footerClas = clas
        'col-md-12': (container is 'false')
      (div {className:containerClas,key:'footer-container'}, [
        (div {className:footerClas,key:'footer-inner'}, [
          "This page was made by Urbit. Feedback: "
          (a {href:"mailto:urbit@urbit.org"}, "urbit@urbit.org")
          " "
          (a {href:"https://twitter.com/urbit_"}, "@urbit_")
        ])
      ])

module.exports = query {
  body:'r'
  name:'t'
  path:'t'
  meta:'j'
  sein:'t'
  spur:'t'
}, (recl
  displayName: "Body"
  stateFromStore: -> {curr:TreeStore.getCurr()}
  getInitialState: -> _.extend {edit:no}, @stateFromStore()
  _onChangeStore: -> if @isMounted() then @setState @stateFromStore()
  componentDidMount: -> TreeStore.addChangeListener @_onChangeStore

  setEdit: -> @setState {'edit'}
  runEdit: ->
    ForaActions.editPost @props.spur,
      $(ReactDOM.findDOMNode @refs.title).find('input').val()
      $(ReactDOM.findDOMNode @refs.body).find('textarea').val()
    @setState {edit: false}
  render: ->
    extra = (name,props={})=>
      if @props.meta[name]?
        props[name] = @props.meta[name]
        props.key = name
        React.createElement extras[name], props

    innerClas = {body:true}
    if @props.meta.anchor isnt 'none' and @props.meta.navmode isnt 'navbar'
      innerClas['col-md-9'] = true
      innerClas['col-md-offset-3'] = true
    if @props.meta.navmode is 'navbar' and @props.meta.container isnt 'false'
      innerClas['col-md-9'] = true
      innerClas['col-md-offset-1'] = true
    innerClas = clas innerClas

    bodyClas = clas (@props.meta.layout?.split ',')
    if @props.meta.type && bodyClas.indexOf(@props.meta.type) is -1
      bodyClas += " #{@props.meta.type}"

    if @state.edit
      body = rele Editor, {key:'editor', ref:'body'}
    else
      body = reactify @props.body, 'body'
      
    parts = [
      extra 'spam'
      extra 'logo', color: @props.meta.logo
      # extra 'plan'
      body
      extra 'next', {dataPath:@props.sein,curr:@props.name}
      extra 'editable', {@setEdit,@runEdit,meta:@props.meta,edit:@state.edit}
      extra 'comments'
      extra 'footer', {container:@props.meta.container}
    ]

    if @props.meta.type is "post"
      parts.splice(
        1
        0
        extra 'date'
        extra 'title', {edit:@state.edit, ref:'title'}
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
    (div {id:'body', className:"col-md-offset-3 col-md-9"}, rele(load))
)
