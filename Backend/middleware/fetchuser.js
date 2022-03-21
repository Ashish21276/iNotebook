const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json("Please use valid token");
  }

  try {
    const data = jwt.verify(token, "ashish");
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json("Please use valid token");
  }
};

module.exports = fetchuser;
