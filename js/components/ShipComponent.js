let recl   = React.createClass;
let {div}  = React.DOM;

export default recl({
  render() {
    let attr = {
      "data-alias":`~${window.tree.util.shortShip(this.props.ship)}`,
      className:'ship'
    };
    return (div(attr,"~",this.props.ship));
  }
});
