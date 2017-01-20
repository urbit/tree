import codemirror from './CodeMirror';
import search from './SearchComponent';
import list from './ListComponent';
import kids from './KidsComponent';
import toc from './TocComponent';
import email from './EmailComponent';
import module from './ModuleComponent';
import script from './ScriptComponent';
import plan from './PlanComponent';
import panel from './PanelComponent';
import post from './PostComponent';
import imagepanel from './ImagepanelComponent';
import load from './LoadComponent';
import ship from './ShipComponent';

export default {
  codemirror,
  search,
  list,
  kids,
  toc,
  email,
  module,
  script,
  plan,
  panel,
  post,
  imagepanel,
  load,
  ship,
  lost: React.createClass({
    render() {
      return (<lost>{this.props.children}</lost>);
    } })
};
