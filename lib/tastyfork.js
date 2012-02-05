var util = require('util');
var _ = require('underscore');

var Repo = function(origin) {
  var self = this;
  
  self.origin = origin;
  self.store = {};
  
  self.get = function(id) {
    return _.clone(self.store[id]);
  }

  self.merge = function(obj) {
    if (!obj.id) {
      throw new Error('obj missing id ' + obj);
    }

    var stored = self.store[obj.id];
    if (!stored) {
      obj.ver = 0;
      self.store[obj.id] = obj;
      return _.clone(obj);
    }

    console.log('merging', obj);
    console.log('   into', stored);

    var nextver = stored.ver + 1;
    if (nextver === obj.ver) {
      self.store[obj.id] = obj;
      return _.clone(obj);
    } else {
      util.log("rejecting because its version isn't " + nextver + ": " + 
               util.inspect(obj));
      return _.clone(stored);
    }
  }
  
  self.changes = function() {
    return _.clone(self.store);
  }
  
  self.pull = function(k,v) {
    if (self.origin) {
      _.each(self.origin.changes(), self.merge);
    }
  }
};


exports.create = function(origin) {
  return new Repo(origin);
}