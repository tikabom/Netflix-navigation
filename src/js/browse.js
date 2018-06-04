import Router from './router';
import Api from './api';

import '../../css/browse.css';

const Headline = require('../templates/headline.hbs');
const BrowseContent = require('../templates/browse.hbs');

class Browse {
  constructor() {
    this.focusedRow = 0;
    this.focusedCol = 0;

    Api.getBrowseData().then((shows) => {
      this.shows = shows;
      this.focusedShow = this.shows[this.focusedRow].data[this.focusedCol];
    });

    this.keyDownHandler = this.onKeyDown.bind(this);
  }

  /*
   * setFocusedShow sets the row/col in the shows grid and the newly focused show
   */
  setFocusedShow(focusedRow, focusedCol) {
    this.focusedRow = focusedRow;
    this.focusedCol = focusedCol;
    this.focusedShow = this.shows[focusedRow].data[focusedCol];
  }

  /*
   * onKeyDown handles user interation with the Browse page
   * Up (38): Move focus to prior row, and update the show title and display art above
   * Left (37): Move focus to the next column to the left, and update the show title and display art above
   * Right (39): Move focus to the next column to the right, and update the show title and display art above
   * Down (40): Move focus to next row, and update the show title and display art above
   * Enter (13): Change to the Details page for the focused show
   */
  onKeyDown(e) {
    e.preventDefault();
    const showElement = document.getElementsByClassName('selected')[0];
    if (e.keyCode == '13') {
      const state = {
        page: 'details',
        focusedShow: this.focusedShow
      };
      window.removeEventListener('keydown', this.keyDownHandler);
      history.pushState(state, this.focusedShow.title, 'details');
      Router.navigateTo('details', state);
      return;
    } else if (e.keyCode == '38') {
      const idx = $(showElement).index();
      if (this.focusedRow > 0) {
        const up = showElement.parentElement.previousElementSibling.previousElementSibling.
        children[idx];
        $(up).addClass('selected');
        $(showElement).removeClass('selected');
        this.setFocusedShow(this.focusedRow - 1, this.focusedCol);
      }
    } else if (e.keyCode == '40') {
      const idx = $(showElement).index();
      if (this.focusedRow < this.shows.length - 1) {
        const down = showElement.parentElement.nextElementSibling.nextElementSibling.
        children[idx];
        $(down).addClass('selected');
        $(showElement).removeClass('selected');
        this.setFocusedShow(this.focusedRow + 1, this.focusedCol);
      }
    } else if (e.keyCode == '37') {
      if (this.focusedCol > 0) {
        const left = showElement.previousElementSibling;
        $(left).addClass('selected');
        $(showElement).removeClass('selected');
        this.setFocusedShow(this.focusedRow, this.focusedCol - 1);
      }
    } else if (e.keyCode == '39') {
      if (this.focusedCol < this.shows[this.focusedRow].data.length - 1) {
        const right = showElement.nextElementSibling;
        $(right).addClass('selected');
        $(showElement).removeClass('selected');
        this.setFocusedShow(this.focusedRow, this.focusedCol + 1);
      }
    } else return;

    this.renderHeadline();
  }

  renderHeadline() {
    document.getElementById('headline').innerHTML = Headline(this.focusedShow);
  }

  render() {
    this.renderHeadline();
    document.getElementById('content').innerHTML = BrowseContent({ shows: this.shows });
    window.addEventListener('keydown', this.keyDownHandler);
    this.setFocusedShow(0, 0);
    $(document.getElementById('browseLists').getElementsByTagName('ul')[0].getElementsByTagName('li')[0]).
    addClass('selected');
  }
}

const browse = new Browse();

export default browse;
