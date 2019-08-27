import lazyload from '../common/lazyload'

export default {
  init() {
    // JavaScript to be fired on all pages
    new lazyload();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
