var requestToFind = function(req){
    var _ = require('underscore');
    var findObj = {'conditions': {}, 'projection': {}, 'options': {}};
      if (_.has(req.query, 'where')){
        findObj.conditions = eval("("+req.query.where+")");
      }
      else{
        findObj.conditions = {};
      }
      if (_.has(req.query, 'sort')){
        findObj.options.sort = eval("("+req.query.sort+")");
      }
      if (_.has(req.query, 'select')){
        findObj.projection = eval("("+req.query.select+")");
      }
      if (_.has(req.query, 'limit')){
        findObj.options.limit = eval("("+req.query.limit+")");
      }
      if (_.has(req.query, 'count')){
        findObj.options.count = eval("("+req.query.sort+")");
      }
      if (_.has(req.query, 'skip')){
        findObj.options.skip = eval("("+req.query.skip+")");
      }
      return findObj;
}
    
module.exports = requestToFind;
