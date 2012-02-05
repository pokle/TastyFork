// var test = require('testling');

var util = require('util');
var tf = require('tastyfork');

module.exports = {

  'pulling brings in changes from origin': function(beforeExit, assert) {
    var origin = tf.create();
    var obj = origin.merge({id: 'x', foo: 'poo'});
    
    var local = tf.create(origin);
  
    assert.equal(undefined, local.get('x')); // Before
    local.pull();
    assert.eql(obj, local.get('x')); // After
  },
  
  "pulling doesn't destroy un-sync'd local changes": function(beforeExit, assert) {
  
    var origin = tf.create();
    origin.merge({id: 'x', color: "pink"});
    
    var local = tf.create(origin);
    local.merge({id: 'y', kind: 'mooo'}); // Supposedly un-sync'd local change
  
    // Before
    assert.eql({id: 'y', kind: 'mooo', ver: 0}, local.get('y'));
    assert.eql(undefined, local.get('x'));
    
    local.pull();
    
    // After
    assert.eql({id: 'y',  kind: 'mooo', ver: 0}, local.get('y'));  // Unaffected
    assert.eql({id: 'x', color: 'pink', ver: 0}, local.get('x'));// Pulled
  },


  "Local changes don't affect the origin": function(beforeExit, assert) {
    var origin = tf.create();
    origin.merge({id: 'x', color: "pink"});

    var local = tf.create(origin);
    local.pull();
    local.merge({id: 'x', color: 'blue', ver: 0});

    assert.eql({id: 'x', color: 'blue', ver: 1},  local.get('x')); // Updated
    assert.eql({id: 'x', color: 'pink', ver: 0}, origin.get('x')); // Unaffected
  }
}
