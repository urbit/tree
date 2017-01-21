import clas from 'classnames';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';
import reactify from './Reactify';

import { addComment } from '../TreeActions';

import Ship from './ShipComponent';

const { div, h2, form, textarea, input } = React.DOM;

const DEFER_USER = true;

const Comment = ({ time, user, body, loading = false }) => {
  const commentClas = clas('comment', { loading });
  const comment = (reactify(body, 'comt', { components: {} }));
  return (<div className={commentClas}>
    <span>{window.urb.util.toDate(new Date(time))}</span>
    <h2><Ship ship={user} /></h2>
    {comment}
  </div>);
};

Comment.propTypes = {
  time: React.PropTypes.number,
  user: React.PropTypes.string,
  body: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Comments';
    this.state = {
      loading: false,
      value: '',
      user: urb.user != null ? urb.user : '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (!DEFER_USER) {
      return urb.init(() => this.setState({ user: urb.user }));
    } return null;
  }

  componentDidUpdate(_props) {
    if (urb.user && !this.state.user) {
      this.setState({ user: urb.user != null ? urb.user : '' });
    }
    if (this.props.comt.length > _props.comt.length) {
      return this.setState({ loading: false });
    }
  }

  onSubmit(e) {
    this.props.dispatch(addComment(this.props.path,
      this.props.spur,
      this.state.value));
    this.setState({
      value: '',
      loading: {
        loading: true,
        body: {
          gn: 'p',
          c: [this.state.value] },
        time: Date.now(),
      },
    });
    e.preventDefault();
    return false;
  }

  onChange(e) { return this.setState({ value: e.target.value }); }

  render() {
    const addCommentForm = (<div key="add-comment" className="add-comment">
      <form onSubmit={this.onSubmit}>
        <Ship ship={this.state.user} />
        <textarea
          disabled={this.state.loading}
          type="text"
          name="comment"
          value={this.state.value}
          onChange={this.onChange}
        />
        <input
          disabled={this.state.loading}
          type="submit"
          value="Add comment"
          className="btn btn-primary"
        />
      </form>
    </div>);

    let comments = this.props.comt.map((props, key) => {
      return React.createElement(Comment, _.extend({ key }, props));
    });
    if (this.state.loading !== false) {
      const newComment = React.createElement(Comment,
        _.extend({ key: 'loading' },
          this.state.loading,
          { user: this.state.user }));
      comments.unshift(newComment);
    }

    let reverse = false;
    if (this.props.meta.comments) {
      reverse = Array.from(this.props.meta.comments.split(' ')).includes('reverse');
    }

    if (reverse) {
      comments = comments.reverse();
      return (<div>
        <div key="comments" className="comments">
          {comments}
          {addCommentForm}
        </div>
      </div>);
    }
    return (<div>
      <div key="comments" className="comments">
        {addCommentForm}
        {comments}
      </div>
    </div>);
  }
}

Comments.propTypes = ContainerPropTypes;

export default Container({
  comt: 'j',
  path: 't',
  spur: 't',
  meta: 'j' }, Comments);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
