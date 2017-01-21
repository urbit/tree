import util from '../utils/util';

const Ship = function render(props) {
  return (<div
    data-alias={`~${util.shortShip(props.ship)}`}
    className="ship"
  >
    {props.ship}
  </div>);
};

Ship.propTypes = { ship: React.PropTypes.string };

export default Ship;
