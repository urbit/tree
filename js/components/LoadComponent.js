class Load extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Load';
    this.state = { anim: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(this.setAnim.bind(this), 100);
  }

  componentWillUnmount() {
    return clearInterval(this.interval);
  }

  setAnim() {
    let anim = this.state.anim + 1;
    if (anim > 3) { anim = 0; }
    return this.setState({ anim });
  }

  render() {
    const clas = `loading state-${this.state.anim}`;
    return (<span className={clas} />);
  }
}

export default Load;
