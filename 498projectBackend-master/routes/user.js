var User = require('../models/user.js');
var makejson = require('./makeJSON.js'); 
var _ = require('underscore');
var mongoose = require('mongoose');

module.exports = function(router) {

  var userRoute = router.route('/users/:id');

  userRoute.get(function(req, res) {
      User.findOne({'fbid':req.params.id}, function(err, doc){
          var message = "";
          if (err || doc===null || doc.length===0){
              message = "User not found";
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
  userRoute.put(function(req, res) {
          User.findOneAndUpdate({'fbid':req.params.id}, req.body, {"new": true}, function(err, doc){
          if (err){
              message = "This email already exists";
              data = [];
              console.log(req.params.id);
              console.log(req.body);
              console.log(err);
              res.status(404);
          }
          else{
              res.status(200);
              data = doc;
              console.log(data);
              message = "OK";
          }
          res.json({"message": message, "data": doc});
      });
  });
  userRoute.delete(function(req, res) {
      if (!(mongoose.Types.ObjectId.isValid(req.params.id))){
          res.status(404);
          res.json({"message": "User not found", "data": []});
      }
      else{
          User.findByIdAndRemove(req.params.id, function(err, doc){
              if ((err) || (doc===null)){
                  res.status(404);
                  res.json({"message": "User not found", "data": []});
              }
              else{
                  res.status(200);
                  res.json({"message": "User deleted", "data": []});
              }
          });
       }
   });
  return router;
}
