
function log(req, res, next) {  
  console.log('Logging...');
  next(); //call next to move cycle to the route middleware
};

module.exports = log;