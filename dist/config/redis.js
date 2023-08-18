"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const logger_js_1 = __importDefault(require("../logger.js"));
const config_js_1 = __importDefault(require("./config.js"));
const redisClient = redis_1.default.createClient({
    url: config_js_1.default.redis.url,
});
redisClient.connect().then((client) => {
    logger_js_1.default.info("connected redis client");
});
redisClient.on("error", (error) => {
    logger_js_1.default.error("Redis Error:", error);
});
exports.default = redisClient;
//# sourceMappingURL=redis.js.map