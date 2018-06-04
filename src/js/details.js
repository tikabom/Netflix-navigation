import '../../css/details.css';

class Details {
  constructor() {
    this.keyDownHandler = this.onKeyDown.bind(this);
  }

  /*
   * onKeyDown handles user interaction with the Details browsePage
   * Up (38): Move focus to previous button
   * Down (40): Move focus to next button
   * Enter on Back button (13): Return to Browse page
   * Enter on Play, Rate, or Episodes buttons (13): Alert the button name and
   * video title (e.g. “Rate 13 Reasons Why”)
   */
  onKeyDown(e) {
    e.preventDefault();
    const selected = document.getElementsByClassName('selected')[0];
    if (e.keyCode == '13') {
      switch (selected.id) {
        case 'back':
          this.onBack();
          break;
        case 'play':
        case 'rate':
        case 'episodes':
          this.alertButtonAndVideoTitle(selected.value);
          break;
        default: break;
      }
    } else if (e.keyCode == '38') {
      if (selected.parentElement.previousElementSibling) {
        $(selected).removeClass('selected');
        $(selected.parentElement.previousElementSibling.children[0]).addClass('selected');
      }
    } else if (e.keyCode == '40') {
      if (selected.parentElement.nextElementSibling) {
        $(selected).removeClass('selected');
        $(selected.parentElement.nextElementSibling.children[0]).addClass('selected');
      }
    }
  }

  /*
   * setFocusedShow sets the show for the Details page
   */
  setFocusedShow(focusedShow) {
    this.focusedShow = focusedShow;
  }

  onBack() {
    window.removeEventListener('keydown', this.keyDownHandler);
    history.back();
  }

  alertButtonAndVideoTitle(button) {
    alert(`${button} ${this.focusedShow.title}`);
  }

  render() {
    $.get('src/templates/details.html', (content) => {
      document.getElementById('content').innerHTML = content;
      let inputs = document.getElementsByClassName('details')[0].getElementsByTagName('input');
      window.addEventListener('keydown', this.keyDownHandler);
      $(inputs[0]).addClass('selected');
    });
  }
}

const details = new Details();

export default details;
