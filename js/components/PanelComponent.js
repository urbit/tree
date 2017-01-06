let recl = React.createClass;
let rele = React.createElement;
let {nav,ul,li,a} = React.DOM;

export default recl({
  getInitialState() { return {loaded:(urb.ship != null)}; },
  componentDidMount() { return urb.init(() => this.setState({'loaded': 'loaded'})); },
  render() {
    if ((urb.user == null) || (urb.user !== urb.ship)) {
      return (nav({className:"navbar panel"}, [
        (ul({className:"nav navbar-nav"},[
          (li({className:'nav-item pull-right'}, 
            (a({href:"/~~"}, "Log in"))))
        ]))
      ]));

    } else {
      return (nav({className:"navbar panel"}, [
        (ul({className:"nav navbar-nav"},[
          (li({className:"nav-item"}, 
            (a({href:"/~~/talk"}, "Talk")))),
          (li({className:"nav-item"}, 
            (a({href:"/~~/dojo"}, "Dojo")))),
          (li({className:"nav-item"}, 
            (a({href:"/~~/static"}, "Static")))),
          (li({className:'nav-item pull-right'}, 
            (a({href:"/~/away"}, "Log out"))))
        ]))
      ]));
    }
  }
});
