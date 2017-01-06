let recl       = React.createClass;
let {div}      = React.DOM;

export default {
  codemirror: require('./CodeMirror.js'),
  search:     require('./SearchComponent.js'),
  list:       require('./ListComponent.js'),
  kids:       require('./KidsComponent.js'),
  toc:        require('./TocComponent.js'),
  email:      require('./EmailComponent.js'),
  module:     require('./ModuleComponent.js'),
  script:     require('./ScriptComponent.js'),
  plan:       require('./PlanComponent.js'),
  panel:      require('./PanelComponent.js'),
  post:       require('./PostComponent.js'),
  imagepanel: require('./ImagepanelComponent.js'),
  load:       require('./LoadComponent.js'),
  ship:       require('./ShipComponent.js'),
  lost:       recl({render() { return (div({}, "<lost(", this.props.children, ")>")); }})
};
