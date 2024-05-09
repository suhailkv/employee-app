exports.singupValidation = (req, res, next) => {
  const { username, email, password } = req.body;
  // check for basic validation(ignoring password validation for now)
  if (_isValidEmail(email) && _isValidUsername(username)) next();
  else return res.status(401).json({ message: "Validation Error" });
};
exports.employeePostValidation = (req, res, next) => {
  const { dateOfJoining } = req.body;
  if (_isValidDate(dateOfJoining)) next();
  else res.status(401).json({ message: "Validation Error" });
};
function _isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function _isValidUsername(username) {
  // only accept letters,numbers and underscore , no spaces or other characters
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  return usernamePattern.test(username);
}
function _isValidDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
}
