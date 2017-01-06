let recl = React.createClass;
let {span,div} = React.DOM;

export default recl({ 
  displayName: "Load",
  getInitialState() { return {anim: 0}; },
  
  componentDidMount() { return this.interval = setInterval(this.setAnim, 100); },

  componentWillUnmount() { return clearInterval(this.interval); },

  setAnim() {
    let anim = this.state.anim+1;
    if (anim > 3) { anim = 0; }
    return this.setState({anim});
  },

  render() { return (span({className:`loading state-${this.state.anim}`}, '')); }
});
