import { setNav, clearNav } from '../TreeActions';

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Module';
  }

  componentDidMount() {
    setTimeout(() =>
      this.props.dispatch(setNav(
        this.props["nav:title"],
        ((this.props["nav:no-dpad"] != null) ? false : undefined),
        ((this.props["nav:no-sibs"] != null) ? false : undefined),
        this.props["nav:subnav"])), 0);  // XX dispatch while dispatching
  }

  componentWillUnmount() {
    // reset tree store state
    return setTimeout((() => clearNav()), 0);
  }

  render() {
    return (<div className="module">{this.props.children}</div>);
  }
}

export default Module;
