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
exports.root = void 0;
exports.root = {
    note: ({ id }) => {
        return 10;
    },
    notes: () => __awaiter(void 0, void 0, void 0, function* () {
        return [1, 2, 3, 4, 5, 6];
    }),
    auth: (userToken, request) => {
        // @ts-ignore
        return { uid: request.uid };
    },
    addNote: ({ title, description, }) => __awaiter(void 0, void 0, void 0, function* () {
        return "aggiunta" + title + description;
    }),
};
module.exports = { root: exports.root };
//# sourceMappingURL=resolvers.js.map