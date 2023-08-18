"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
function successResponse(res, data = {}, statusCode = 200) {
    res.status(statusCode).json({
        status: "success",
        code: statusCode,
        data,
    });
}
exports.successResponse = successResponse;
//# sourceMappingURL=responseHelper.js.map