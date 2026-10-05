import { readAccessToken } from "../utils/auth.utils.js";

export function authenticate(req, res, next) {
  const accessToken = req.header.authorization?.split(" ")[1];

  if (!accessToken) {
    res.status(400).json({
      message: "Access Token not found in the request header",
    });
  }

  try {
    const decoded = readAccessToken(accessToken);

    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid oe expired access token",
    });
  }
}
