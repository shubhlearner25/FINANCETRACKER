const sanitizeHtml = require('sanitize-html');
// -----------------------------------------------------------------------------
// Middleware: Input Sanitization
// This middleware cleans and sanitizes user input to protect the application
// from injection attacks such as XSS, NoSQL injection, and malformed payloads.
// It ensures incoming request data is safe before being processed by controllers.
// -----------------------------------------------------------------------------

const sanitize = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (typeof obj[k] === 'string') {
        obj[k] = sanitizeHtml(obj[k], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else if (obj[k] !== null && typeof obj[k] === 'object') {
        sanitize(obj[k]);
      }
    }
  }
};

exports.sanitizeMiddleware = () => {
  return (req, res, next) => {
    if (req.body) {
      sanitize(req.body);
    }

    if (req.params) {
      sanitize(req.params);
    }

    if (req.query) {
      sanitize(req.query);
    }

    next();
  };
};
