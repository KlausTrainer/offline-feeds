var App = function(feed) {
  this.feed = new Feed('feeds', 'http://localhost:5984/feeds');

  this.ids = [];
  this.initEvents();
  this.init();
};

App.prototype.init = function() {
  this.feed.getIds()
    .then(this.onGetIds.bind(this))
    .then(this.getDoc.bind(this))
    .then(this.render);
};

/**
 * [onGetIds description]
 * @param {[type]} ids [description]
 */
App.prototype.onGetIds = function(ids) {
  this.ids = ids;
  this.current = 0;
};

/**
 * [initEvents description]
 */
App.prototype.initEvents = function() {
  document.querySelector('.next')
    .addEventListener('click', this.next.bind(this));
};

App.prototype.next = function() {
  this.current = this.current + 1;
  this.getDoc().then(this.render);
};

/**
 * [getDoc description]
 * @param {[type]} id [description]
 * @return {Promise}
 */
App.prototype.getDoc = function(id) {
  this.current = id || this.current;
  return this.feed.getDocById(this.ids[this.current]);
};

/**
 * [getDoc description]
 * @param {[type]} doc [description]
 */
App.prototype.render = function(doc) {
  yfrBars.render('post', {
    title: doc.title,
    body: doc.object.summary
  });
};

var app = new App();
