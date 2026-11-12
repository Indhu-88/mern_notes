import ratelimit from "../config/upstash.js";

//ratelimiter limits rate per user
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key"); // it could be user-id /ip-address const{success,limit,remaining,reset}
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log("Error:", error);
    next(error);
  }
};

export default rateLimiter;
