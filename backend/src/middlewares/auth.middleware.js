import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/token.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized access. No token provided.");
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "Invalid token. User no longer exists.");
    }

    if (!user.isActive) {
      throw new ApiError(403, "User account is deactivated.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired token.");
  }
});
