import { Request, Response, NextFunction } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (req.path === "/register") {
    console.log(!username.length);
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } 
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } 
  }
  
  next();
};
