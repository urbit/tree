class loading extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Links_loading';
  }
  home() { return this.props.goTo('/'); }
  render() {
    return (<div
      className="ctrl loading"
      data-path={this.props.dataPath}
      key="nav-loading"
    >
      <div className="links">
        <div className="icon">
          <div className="home" onClick={this.home} />
        </div>
        <ul className="nav">
          <li className="nav-item selected">
            <a className="nav-link">{this.props.curr}</a>
          </li>
        </ul>
      </div>
    </div>
    );
  }
}

export default loading;
