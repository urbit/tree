import clas from 'classnames';
import util from '../utils/util';

import Container from './TreeContainer';
import ContainerPropTypes from './TreeContainerPropTypes';
import reactify from './Reactify';

const { div,pre,span,a,ul,li,h1 } = React.DOM;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'List';
  }

  renderList(elems) {
    const result = [];
    Array.from(elems).forEach((elem) => {
      let preview;
      let linked;
      const item = elem.name;
      const meta = elem.meta != null ? elem.meta : {};
      const path = `${this.props.path}/${item}`;
      if (meta.hide != null) { return; }
      let href = util.basepath(path);
      if (this.props.linkToFragments != null) { href = `#${item}`; }
      if (this.props.childIsFragment != null) {
        href = `${util.basepath(this.props.path)}#${item}`;
      }
      if (meta.link) { href = meta.link; }
      const parts = [];
      let title = null;

      if (meta.title) {
        if (this.props.dataType === 'post') {
          title =
            <a href={href}>
              <h1 className='title'>
                {meta.title}
              </h1>
            </a>
        } else {
          title = <h1 className='title'>meta.title</h1>
        }
      }
      if (!title && (elem.head.c.length > 0)) {
        title = elem.head;
      }
      if (!title) {
        title = <h1 className='title'>item</h1>
      }

      if (!this.props.titlesOnly) {        // date
        let _date = meta.date;
        if (!_date || (_date.length === 0)) { _date = ''; }
        const date = <div className='date'>{_date}</div>
        parts.push(date);
      }

      parts.push(title);

      if (!this.props.titlesOnly) {         // metadata
        if (this.props.dataType === 'post') {
          if (meta.image) {           // image
            const image = 
              <a href={ href }>
                <img src= { meta.image } />
              </a>
            parts.push(image);
          }
        }
        if (this.props.dataPreview) {         // preview
          if (!meta.preview) {
            parts.push(...(elem.snip.c.slice(0, 2)));
          } else {
            if (meta.preview) {
              preview = <p className='preview'>{meta.preview}</p>
            } else {
              preview = elem.snip;
            }
            parts.push(preview);
          }
        }
        if (this.props.dataType === 'post') {
          if (meta.author) {          // author
            const author = <h3 className='author'>{meta.author}</h3>
            parts.push(author);
          }
          const cont = <a href={href} className='continue'>'Read more'</a>
          parts.push(cont);
          linked = true;
        }
      }

      let node = reactify({'div':[{},...parts]});
      if (linked == null) {
        const _clas = clas({ preview: (this.props.dataPreview != null) });
        node = (<a href={href} className={_clas}>{node}</a>);
      }

      result.push(<li key={item}>{node}</li>);
    });

    return result;
  }

  render() {
    const k = clas(
      { list: true },
      this.props.dataType,
      { default: this.props['data-source'] === 'default' },
      this.props.className);

    const kids = this.renderList((util.sortKids(this.props.kids, this.props.sortBy)));
    if ((kids.length !== 0) || (this.props.is404 == null)) {
      return (<ul className={k}>{kids}</ul>);
    }

    return (<div className={k}>
      <h1 className="red inverse block error">Error: Empty path</h1>
      <div>
        <pre>{this.props.path}</pre>
        <span>is either empty or does not exist.</span>
      </div>
    </div>);
  }
}

List.propTypes = ContainerPropTypes;

export default Container({
  path: 't',
  kids: {
    snip: 'r',
    head: 'r',
    meta: 'j',
    bump: 't',
    name: 't',
  },
}, List);
