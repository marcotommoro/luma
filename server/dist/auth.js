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
exports.authMiddleware = void 0;
const firebase_1 = require("./firebase");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    try {
        const tokenId = req.headers.authorization;
        const { uid } = yield firebase_1.auth.verifyIdToken(tokenId);
        console.log(uid);
        res.locals.uid = uid;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map