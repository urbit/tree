let recl = React.createClass;
let name = (displayName,component)=> _.extend(component, {displayName});
let {div} = React.DOM;

export default name("ImagePanel", ({src})=>
  div({
    className:"image-container",
    style:{backgroundImage:`url('${src}')`}
  })
);
