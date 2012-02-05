// var test = require('testling');

var util = require('util');
var tf = require('tastyfork');

module.exports = {

  'works like a map': function(beforeExit, assert) {
    var repo = tf.create();
    
    repo.set('a', 1);
    repo.set('b', 3);
    repo.set('a', 2);
    
    assert.equal(2, repo.get('a'));
    assert.equal(3, repo.get('b'));
  },

  'pulling brings in changes from origin': function(beforeExit, assert) {
    var origin = tf.create();
    origin.set('a', 1);
    
    var local = tf.create(origin);

    assert.equal(undefined, local.get('a')); // Before
    local.pull();
    assert.equal(1, local.get('a')); // After
  },

  "pulling doesn't destroy un-sync'd local changes": function(beforeExit, assert) {

    var origin = tf.create();
    origin.set('color', "pink");
    
    var local = tf.create(origin);
    local.set('kind', 'mooo'); // Supposedly un-sync'd local change

    // Before
    assert.equal("mooo", local.get('kind'));
    assert.equal(undefined, local.get('color'));
    
    local.pull();
    
    // After
    assert.equal("mooo", local.get('kind'));  // Unaffected
    assert.equal("pink", local.get('color')); // Updated
  },

  "Local changes don't affect the origin": function(beforeExit, assert) {
    var origin = tf.create();
    origin.set('a', 1);
    
    var local = tf.create(origin);
    local.pull();
    local.set('a', 7);
    
    assert.equal(1, origin.get('a'));
  },

  
}
