'use strict';

var Feed = function(local, remote) {
  this.db = new PouchDB(local);

  if (remote) {
    this.remote = new PouchDB(remote);
    this._startSync();
  }
};

/**
 * [_startSync description]
 */
Feed.prototype._startSync = function() {
  this.db.sync(this.remote, {
    live: true
  }).on('change', function(change) {
    console.log(change);
  }).on('error', function(err) {
    console.log(err);
  });
};

/**
 * [getIds description]
 * @return {[type]}
 */
Feed.prototype.getIds = function() {
  return this.db.allDocs({
    limit: 10
  }).then(function(docs) {
      var ids = [];
      docs.rows.forEach(function(doc) {
        if (!doc.id.match('_design')) {
          ids.push(doc.id);
        }
      });

      return ids;
  });
};

/**
 * [getIds description]
 * @param {[type]}   id [description]
 * @return {Promise}
 */
Feed.prototype.getDocById = function(id) {
  return this.db.get(id);
};
