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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const isUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    return !!user;
});
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield isUserExist(data.email);
    if (userExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Already Exists, Please login.');
    }
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.password !== data.password) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Incorrect Credentials');
    }
    const result = jwtHelpers_1.jwtHelpers.createToken({
        userId: user.id,
        role: user.role,
    }, process.env.JWT_SECRET, '1y');
    return result;
});
exports.AuthService = {
    insertIntoDB,
    login,
    isUserExist,
};
