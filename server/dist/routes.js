"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("./firebase");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/fetch-value", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = res.locals;
        const doc = yield firebase_1.fs.doc(uid).get();
        const { lumaValue } = doc.data();
        res.send({ lumaValue });
    }
    catch (e) {
        const error = e;
        next(error);
    }
}));
// authRouter.post(
//   "/",
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {}
// );
//# sourceMappingURL=routes.js.map