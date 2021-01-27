const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const OK_CODE = 200;
const CREATE_CODE = 201;
const INTERNAL_SERVER_ERROR_CODE = 500;
const urlBD = 'mongodb://localhost:27017/mestodb';

module.exports = {
  REGEX_URL,
  OK_CODE,
  CREATE_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  urlBD,
};
