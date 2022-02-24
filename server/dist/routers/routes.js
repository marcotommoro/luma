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
exports.userRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/fetch-value", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = res.locals;
        console.log("uid", uid);
        const doc = yield firebase_1.fs
            .collection("users")
            .doc("Rhy29GIf25DP5IKkbI0L")
            .get();
        console.log(doc);
        if (!doc.exists)
            throw new Error("Document doesn't exists.");
        const data = doc.data();
        console.log(data);
        res.send(data);
    }
    catch (e) {
        const error = e;
        next(error);
    }
}));
exports.userRouter.post("/register-role", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = res.locals;
        const { role } = req.body;
        yield firebase_1.fs.collection("users").doc(uid).set({ role, quantity_luma: 0 });
        firebase_1.fs.collection("users").doc();
        res.send("OK!");
    }
    catch (e) {
        const error = e;
        next(error);
    }
}));
exports.userRouter.post("/get-user-info", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = res.locals;
        const doc = yield firebase_1.fs.collection("users").doc(uid).get();
        if (!doc.exists) {
            throw new Error("Document doesn't exists.");
        }
        res.send(doc.data());
    }
    catch (e) {
        const error = e;
        next(error);
    }
}));
//# sourceMappingURL=routes.js.map