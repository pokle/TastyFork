var util = require('util');
var _ = require('underscore');

var Repo = function(origin) {
  var self = this;
  
  self.origin = origin;
  self.store = {};
  
  self.get = function(id) {
    return _.clone(self.store[id]);
  }
  
  self.__create = function(obj) {
    obj.ver = 0;
    self.store[obj.id] = obj;
    return _.clone(obj);
  }

  self.merge = function(obj) {
    if (!obj.id) {
      throw new Error('obj missing id ' + obj);
    }

    var stored = self.store[obj.id];
    if (!stored) {
      return self.__create(obj);
    }

    if (stored.ver === obj.ver) {
      obj.ver = stored.ver + 1;
      self.store[obj.id] = obj;
      return _.clone(obj);
    } else {
      return undefined;
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