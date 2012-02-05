var util = require('util');
var _ = require('underscore');

var Repo = function(origin) {
  var self = this;
  
  self.origin = origin;
  self.store = {};
  
  self.set = function(k,v) {
    self.store[k] = v;
  }
  
  self.get = function(k,v) {
    return self.store[k];
  }
  
  self.merge = function(k,v) {
    self.store[k] = v;  
  }
  
  self.changes = function() {
    return _.clone(self.store);
  }
  
  self.pull = function(k,v) {
    if (self.origin) {
      _.each(self.origin.changes(), function(v,k){self.merge(k,v)});
    }
  }
};


exports.create = function(origin) {
  return new Repo(origin);
}