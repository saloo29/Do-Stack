import jwt from "jsonwebtoken";

const auth = function(req, res, next) {
  const token = req.headers.authorization.split(" ")?.[1];
  console.log(req.headers.authorization);
  if(!token) {
    return res.status(401).json({
      message: "Token missing"
    })
  }

  try{
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedUser.id;
    next();
  } catch(e) {
    return res.status(400).json({
      message: "Invalid or expired token"
    })
  }
}

export default auth;