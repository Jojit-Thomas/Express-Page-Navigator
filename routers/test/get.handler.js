module.exports = async function get(req, res, next) {
  try {
    const { id, time } = req.params; // you can access the search params from the request
    console.log({ id, time });
    let value;
    value = "Hello World!"; // get the value according to the logic of your application
    res.send(value);
  } catch (err) {
    next(err);
  }
};

module.exports.params = "/id/time";// you can define the params here
