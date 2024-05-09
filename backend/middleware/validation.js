exports.singupValidation = (req, res, next) => {
  const { username, email, password } = req.body;
  // check for basic validation
  if (_isValidEmail(email) && _isValidUsername(username)) next();
  else return res.status(401).json({ message: "Validation Error" });
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
