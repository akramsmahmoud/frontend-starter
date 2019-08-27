// import external dependencies
import '../styles/main.scss'

// Import everything from autoload
//import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import about from './routes/about';
/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  about,
});

// Load Events
(function () {
  routes.loadEvents()
})();