import browse from './browse';
import details from './details';

const Router = {
  navigateTo(page, state={}) {
    switch (page) {
      case 'details':
        details.setFocusedShow(state.focusedShow);
        details.render();
        $('#app').removeClass().addClass('detailsPage');
        break;
      case 'browse':
      default:
        browse.render();
        $('#app').removeClass().addClass('browsePage');
        break;
    }
  }
}

export default Router;
