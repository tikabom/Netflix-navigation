const Api = {
  /*
   * getBrowseData returns data to be bound to browse page
   * returns browseShows (a grid of shows)
   * each row in browseShows consists of an object with props title: Title for the list of shows,
   * data: list of show metadata
   */
  getBrowseData() {
    return Promise.resolve($.getJSON('metadata/metadata.json')).then((shows) => {
      const myshows = shows.filter((show, i) => i < 5).map((show) => {
        show.boxart = `assets/boxart/${show.videoId}.jpg`;
        show.displayart = `assets/displayart/${show.videoId}.jpg`;
        return show;
      });
      const newshows = shows.filter((show, i) => i >= 5 && i < 10).map((show) => {
        show.boxart = `assets/boxart/${show.videoId}.jpg`;
        show.displayart = `assets/displayart/${show.videoId}.jpg`;
        return show;
      });
      const browseShows = [
        {
          title: 'My list',
          data: myshows
        },
        {
          title: 'New Releases',
          data: newshows
        }
      ];
      return browseShows;
    });
  }
};

export default Api;
