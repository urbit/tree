import clas from 'classnames';

import Factory from './TreeContainer';
import Comments from './CommentsComponent';

import util from '../utils/util';

const name = (displayName, component) => _.extend(component, { displayName });
const { div, h1, h3, p, img, a } = React.DOM;

const extras = {
  spam: name('Spam', function () {
    if (document.location.hostname !== 'urbit.org') {
      return (<div />);
    }
    return (<div className="spam">
      <a href="http://urbit.org#sign-up">Sign up</a> for our newsletter.
    </div>);
  }),

  logo: name('Logo', ({ color }) => {
    let src;
    if ((color === 'white') || (color === 'black')) {  // else?
      src = `//media.urbit.org/logo/logo-${color}-100x100.png`;
    }
    return (a({ href:'http://urbit.org',style:{border:'none'}},
     (img({src,className:'logo first'}))
    ));
  }),

  date: name('Date', ({date})=> div({className:'date'}, date)),

  title: name('Title', ({title})=> h1({className:'title'}, title)),
  image: name('Image', ({image})=> img({src:image})),
  preview: name('Preview', ({preview})=> p({className:'preview'}, preview)),
  author: name('Author', ({author})=> h3({className:'author'}, author)),

  // plan: Plan


  next: Factory({
    path: 't',
    kids: {
      name: 't',
      head: 'r',
      meta:'j',
      bump:'t'
    }
  }, name('Next', function({curr,meta,path,kids}){
      if (__guard__(__guard__(kids[curr], x1 => x1.meta), x => x.next)) {
        let keys = util.getKeys(kids, meta.navsort);
        if (keys.length > 1) {
          let index = keys.indexOf(curr);
          let next = index+1;
          if (next === keys.length) { next = 0; }
          next = keys[next];
          next = kids[next];

          if (next) {
            return (div({className:'link-next'},
              (a({href:`${path}/${next.name}`}, `Next: ${next.meta.title}`))
            ));
          }
        }
      }
      return (div({},''));
  })
  ),

  comments: Comments,

  footer: name('Footer', function({container}){
      let containerClas = clas({
        footer: true,
        container: (container === 'false')
      });
      let footerClas = clas({
        'col-md-12': (container === 'false')});
      return (div({className:containerClas,key:'footer-container'}, [
        (div({className:footerClas,key:'footer-inner'}, [
          'This page was made by Urbit. Feedback: ',
          (a({href:'mailto:urbit@urbit.org'}, 'urbit@urbit.org')),
          ' ',
          (a({href:'https://twitter.com/urbit_'}, '@urbit_'))
        ]))
      ]));
  })
};

export default extras;
