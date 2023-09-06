import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) throw new ErrorResponse(`Access Denied`, 403);

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
});
