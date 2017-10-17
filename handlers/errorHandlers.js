// This is required if you are not going to use try catch,  we will just 
// forward to the chain and pick up errors with custom handlers based on 
// environment.
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};