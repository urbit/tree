TreePersistence   = require '../persistence/TreePersistence.coffee' # XX separate talk persistence
TreeActions       = require './TreeActions.coffee'

module.exports = 
  addComment: (pax,sup,txt)->
    TreePersistence.put {pax,sup,txt}, "talk-comment", "talk", (err,res)=>
      if !err?
        TreeActions.clearData()

  addPost: (pax,sup,hed,txt)->
    TreePersistence.put {pax,sup,hed,txt}, "talk-fora-post", "talk", (err,res)=>
      if !err?
        TreeActions.clearData()
        history.pushState {},"",".."
        TreeActions.setCurr pax

  editPost: (sup,hed,txt)->
    TreePersistence.put {sup,hed,txt}, "talk-fora-post-edit", "talk", (err,res)=>
      if !err?
        TreeActions.clearData()
