var Task = require('../models/task.js');
var makejson = require('./makeJSON.js'); 
var _ = require('underscore');
var mongoose = require('mongoose');

module.exports = function(router) {

  var taskRoute = router.route('/tasks/:id');

  taskRoute.get(function(req, res) {
          Task.findById(req.params.id, function(err, doc){
              var message = "";
              if (err||doc===null){
                  message = "Task not found";
                  data = [];
                  res.status(404);
              }
              else{
                  res.status(200);
                  message = "OK";
                  data = doc;
              }
              res.json({"message": message, "data": doc});
          })
  });
  taskRoute.put(function(req, res) {
      if (!(mongoose.Types.ObjectId.isValid(req.params.id))){
          res.status(404);
          res.json({"message": "Task not found", "data": []});
      }
      else{
              Task.findByIdAndUpdate(req.params.id, req.body, {"new": true, "runValidators": true}, function(err, doc){
              if (err){
                  message = "We don't know what happened";
                  data = [];
                  res.status(404);
              }
              else{
                  res.status(200);
                  data = doc;
                  message = "OK";
              }
              res.json({"message": message, "data": doc});
              });
          }
  });
  taskRoute.delete(function(req, res) {
      if (!(mongoose.Types.ObjectId.isValid(req.params.id))){
          res.status(404);
          res.json({"message": "Task not found", "data": []});
      }
      else{
          Task.findByIdAndRemove(req.params.id, function(err, doc){
              if ((err) || (doc===null)){
                  res.status(404);
                  res.json({"message": "Task not found", "data": []});
              }
              else{
                  res.status(200);
                  res.json({"message": "Task deleted", "data": []});
              }
          });
       }
   });
  return router;
}
