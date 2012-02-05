// var test = require('testling');

var util = require('util');
var tf = require('tastyfork');

module.exports = {

  'pushes changes to origin': function(beforeExit, assert) {
    util.log('push....');
    var origin = tf.create();
    var obj = origin.merge({id: 'x', foo: 'poo'});
    
    var local = tf.create(origin);
    local.pull();
    var obj = local.get('x');
    obj.foo = 'moo';
    local.merge(obj);
    
    // Before
    assert.eql({id: 'x', foo: 'poo', ver: 0}, origin.get('x'));
    assert.eql({id: 'x', foo: 'moo', ver: 1}, local.get('x'));
    
    local.push();
    
    // After
    assert.eql({id: 'x', foo: 'moo', ver: 1}, origin.get('x'));
    assert.eql({id: 'x', foo: 'moo', ver: 1}, local.get('x'));
  
  },
  
}
