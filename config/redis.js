import redis from "redis";
import logger from "../logger.js";
import config from "./config.js";

const redisClient = redis.createClient({
  url: config.redis.url,
});

redisClient.connect().then((client) => {
  logger.info("connected redis client");
});

redisClient.on("error", (error) => {
  logger.error("Redis Error:", error);
});

export default redisClient;
