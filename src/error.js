module.exports.getError = (message, code) => {
  const err = new Error(message);
  err.code = code;

  return err;
};

module.exports.codes = {
  FS_ERROR: 'FS_ERROR',
  DIR_NOT_FOUND: 'DIR_NOT_FOUND',
  SCOPE_NOT_FOUND: 'SCOPE_NOT_FOUND',
  SCOPE_INVALID: 'SCOPE_INVALID',
};
