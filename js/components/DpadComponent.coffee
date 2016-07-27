util = require '../utils/util.coffee'

recl = React.createClass
{div,a} = React.DOM

Arrow = (name,path)->
  href = util.basepath path
  (a {href,key:"#{name}",className:"#{name}"},"")

module.exports = Dpad = ({sein,curr,kids,meta})->
  arrowUp =
    if sein
      if meta.navuptwo
        Arrow "up", sein.replace /\/[^\/]*$/, "" # strip last path element
      else
        Arrow "up", sein

  arrowSibs = (
    keys = util.getKeys kids
    if keys.length > 1
      index = keys.indexOf(curr)
      prev = index-1
      next = index+1
      if prev < 0 then prev = keys.length-1
      if next is keys.length then next = 0
      prev = keys[prev]
      next = keys[next]
    if sein
      if sein is "/" then sein = "" 
      div {},
        if prev then Arrow "prev", "#{sein}/#{prev}"
        if next then Arrow "next", "#{sein}/#{next}"
  )
        
  (div {className:'dpad',key:'dpad'}, arrowUp, arrowSibs)
