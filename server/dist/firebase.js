"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.fs = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const firebase_config_js_1 = require("./credentials/firebase-config.js");
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(firebase_config_js_1.config),
});
exports.fs = (0, firestore_1.getFirestore)();
exports.auth = (0, auth_1.getAuth)();
//# sourceMappingURL=firebase.js.map