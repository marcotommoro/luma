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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const firebase_config_js_1 = require("./credentials/firebase-config.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(firebase_config_js_1.config),
});
const fs = (0, firestore_1.getFirestore)();
const auth = (0, auth_1.getAuth)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");
    res.send("fuck");
}));
// const mintTo = () => {};
app.post("/auth/mint/", (req, res, next) => {
    // const {} = req.body;
});
app.listen(3000);
console.log("Listen fuck on 3000\n");
//# sourceMappingURL=index.js.map