var util = require('util');
var _ = require('underscore');

var Repo = function(origin) {
  var self = this;
  
  self.origin = origin;
  self.current = {};
  self.all_changes = [];
  
  self.get = function(id) {
    return _.clone(self.current[id]);
  }
  
  self.__create = function(obj) {
    var curr = _.clone(obj);
    curr.ver = 0;
    self.current[curr.id] = curr;
    
    var change = _.clone(curr);
    self.all_changes.push(change);
    
    return _.clone(curr);
  }

  self.merge = function(obj) {

    if (!obj.id) {
      throw new Error('obj missing id ' + obj);
    }

    var target = self.current[obj.id];
    if (!target) {
      return self.__create(obj);
    }

    if (target.ver === obj.ver) {
      if (_.isEqual(target, obj)) {
        return _.clone(target);
      } else {
        var curr = _.clone(obj);
        curr.ver = curr.ver + 1;
        self.current[curr.id] = curr;
        
        var change = _.clone(obj);
        self.all_changes.push(change);
        
        return _.clone(curr);
      }
    } else {
      return undefined;
    }
  }
  
  self.merge_many = function(objs) {
    _.each(objs, function(obj) {
     var currentd = self.merge(obj);
     if (currentd) {
       console.log('  ', currentd);
     } else {
       console.log('! ', obj);
     }
    });
  }
  
  self.changes = function() {
    return _.clone(self.all_changes);
  }
  
  self.pull = function() {
    if (self.origin) {
      self.merge_many(self.origin.changes());
    } else {
      throw new Error('no origin no pull');
    }
  }
  
  self.push = function() {
    if (self.origin) {
      self.origin.merge_many(self.changes());
    } else {
      throw new Error('no origin no push');
    }
  }
};

exports.create = function(origin) {
  return new Repo(origin);
}