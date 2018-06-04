import Router from './router';

import '../../css/app.css';

window.onpopstate = (e) => {
  Router.navigateTo(e.state.page, e.state);
};

window.onload = () => {
  history.replaceState({}, 'Browse Shows', 'browse');
  Router.navigateTo('browse');
};
