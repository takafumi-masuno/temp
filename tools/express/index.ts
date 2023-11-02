export const fillHeader =
  (name = 'cookie', value = '') =>
  (req, _, next) => {
    req.headers[name] ??= value;
    return next();
  };
