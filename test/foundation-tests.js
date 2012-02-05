// var test = require('testling');

var util = require('util');
var tf = require('tastyfork');

module.exports = {

  'merges a new object as version 0': function(beforeExit, assert) {
    var repo = tf.create();
    var obj = repo.merge({id: 'x', foo: 'poo'});
    
    assert.eql({id: 'x', foo: 'poo', ver: 0}, obj);
  },

  'merges an existing object with one plus the version': function(beforeExit, assert) {
    var repo = tf.create();
    var obj = repo.merge({id: 'x', foo: 'poo'});

    obj.foo = 'yow';
    
    var updated = repo.merge(obj);
    assert.eql({id: 'x', foo: 'yow', ver: 1}, updated);
  },
  
  'rejects merge with incorrect version': function(beforeExit, assert) {
    var repo = tf.create();
    var obj = repo.merge({id: 'x', foo: 'poo'});

    obj.ver = obj.ver + 100;
    obj.foo = 'yow';
    
    var updated = repo.merge(obj);
    assert.eql(undefined, updated); // Rejected
  }
}
