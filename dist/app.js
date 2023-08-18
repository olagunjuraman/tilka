"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
// import books from "./routes/book.route";
const error_middleware_1 = require("./middlewares/error.middleware");
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(limiter);
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json({
        success: true,
        data: "Server is active",
    });
});
app.use("/api/v1/auth", auth_route_1.default);
// app.use("/api/v1/books", books);
app.use((req, res, next) => {
    logger_1.default.error(`Route not found: ${req.path}`);
    throw (0, error_middleware_1.unknownResourceError)(`The route you are trying to reach (${req.path}) does not exist`);
});
app.use((err, req, res, next) => {
    (0, error_middleware_1.handleError)(err, res);
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`The server is listening on ${PORT} in ${process.env.NODE_ENV}`);
});
//# sourceMappingURL=app.js.map