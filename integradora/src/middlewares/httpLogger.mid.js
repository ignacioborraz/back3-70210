import loggerUtil from "../utils/logger.util.js";

function httpLogger(req, res, next) {
  const message = `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`;
  req.logger = loggerUtil;
  req.logger.HTTP(message);
  next();
}

export default httpLogger;
