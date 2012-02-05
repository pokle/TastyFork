
var util = require('util');
var tf = require('tastyfork');

module.exports = {

  'two users simultaneously edit the same object': function(beforeExit, assert) {
    var origin = tf.create();
    var obj = origin.merge({id: 'todo1', text: 'Clean my ears'});

    var user1 = tf.create(origin);
    var user2 = tf.create(origin);
    
    user1.pull();
    user2.pull();
    
    // user1 edits the todo
    {
      var t1 = user1.get('todo1');
      t1.text = 'Clean my hears';
      user1.merge(t1);
      user1.push();
    }

    assert.eql({"id":"todo1","text":"Clean my hears","ver":1}, origin.get('todo1'));
    
    // In the meantime, user2 edits it as well
    {
      var t1 = user2.get('todo1');
      t1.text = 'Clean my bears';
      user1.merge(t1);
      user1.push(); // *** BOOM - will be rejected ***
    }
    
    assert.eql({"id":"todo1","text":"Clean my hears","ver":1}, origin.get('todo1'));
  }
  
};