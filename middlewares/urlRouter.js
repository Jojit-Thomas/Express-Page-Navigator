const createHttpError = require("http-errors");
const fs = require("fs");
const path = require("path");

//domain/api/role/services

const urlRouter = (req, res, next) => {
  const urlStructure = req.path.split("/");
  urlStructure.splice(0, 1);

  try {
    let handlerPath = "";
    handlerPath = `../routers/${urlStructure[0]}/${urlStructure[1]}.handler.js`;
    if (!urlStructure[1])
      handlerPath = `../routers/${urlStructure[0]}.handler.js`;
    if (urlStructure.length < 1) handlerPath = "";
    if (handlerPath && fs.existsSync(path.join(__dirname, handlerPath))) {
      const handler = require(handlerPath);
      
      if (handler.params) {
        let paramsFormat = handler.params;
        let startParam = urlStructure[1] ? 2 : 1;
        const params = {};
        paramsFormat = paramsFormat.split("/");
        paramsFormat.splice(0, 1);
        let paramIndexToCheck = 0;
        for (let index = startParam; index < urlStructure.length; index++) {
          if(paramIndexToCheck >= paramsFormat.length) break;
          params[paramsFormat[paramIndexToCheck++]] = urlStructure[index];
        }
        req.params = params;
      }
      handler(req, res, next);
    } else {
      res.send(createHttpError.NotFound("Given path not found"));
    }
  } catch (error) {
   next(error)
  }
};

module.exports = urlRouter;
