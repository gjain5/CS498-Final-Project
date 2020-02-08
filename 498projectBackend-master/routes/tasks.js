var Task = require('../models/task.js');
var makejson = require('./makeJSON.js'); 
var _ = require('underscore');

module.exports = function(router) {

  var tasksRoute = router.route('/tasks');
  tasksRoute.get(function(req, res) {
      var ret = makejson(req);
          Task.find(ret.conditions, function(err, docs){
              var message = "";
              var data = [];
              if (err){
                  message = "Could not execute query";
                  res.status(500);
              }
              else{
                  res.status(200);
                  data = docs;
                  message = "OK";
              }
              res.json({"message": message, "data": data});
          });
  });
  tasksRoute.options(function(req, res) {
      res.writeHead(200);
      res.end();
  });
  tasksRoute.post(function(req, res) {
          
          var task = new Task(req.body);
          task.save(function(err){
              if(err){
                  res.status(500);
                  res.json({"message": "We dont know what happened", "data": []});
              }
              else{
                  res.status(201);
                  res.json({"message": "Task added", "data": task});
              }
          });
  });
  return router;
}
