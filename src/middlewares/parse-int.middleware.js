module.exports = function (req, res, next) {
  const queryStrings = req.query;
  //myapi.com?pageNum=5 -> es un string, hay que convertirno en el int
  for (const key in queryStrings) {
    const length = queryStrings[key].length;
    const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));
    if (isValid) {
      //convertir en entero.
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }
  req.query = queryStrings;
  next();
};
