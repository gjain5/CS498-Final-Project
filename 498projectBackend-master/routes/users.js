var User = require('../models/user.js');
var makejson = require('./makeJSON.js'); 
var _ = require('underscore');

module.exports = function(router) {

  var usersRoute = router.route('/users');

  usersRoute.get(function(req, res) {
      var result = makejson(req);    
      if (_.has(req.query, 'count')){
          User.countAndFind(result.conditions, result.projection, result.options, function(err, docs, docCount){
              var message = "";
              var data = [];
              if (err){
                  message = "Could not execute query";
                  res.status(500);
              }
              else{
                  res.status(200);
                  data = docCount;
                  message = "OK";
              }
              res.json({"message": message, "data": data});
          });
       }
       else{  
          User.find(result.conditions, result.projection, result.options, function(err, docs){
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
       }
  });
  usersRoute.options(function(req, res) {
      res.writeHead(200);
      res.end();
  });
  usersRoute.post(function(req, res) {
      var statusCode = 201;
      var message = "Validation error: "
      if (!(_.has(req.body, 'name'))){
            statusCode = 500;
            message += "A name is required "             
      } 
      if (statusCode === 500){
          res.status(500);
          res.json({"message": message, "data": []});
      }
      else{
          var user = new User(req.body); 
          user.save(function(err){
              if(err){
                  res.status(500);
                  res.json({"message": "This email already exists", "data": []});
              }
              else{
                  res.status(201);
                  res.json({"message": "User added", "data": user});
              }
          });
      }
  });
  return router;
}
