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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDateTimeAsync = exports.startDateTimeAsync = void 0;
var month = undefined;
var day = undefined;
var hour = undefined;
var minute = undefined;
var second = undefined;
var date = new Date();
var year = date.getFullYear();
var endAsync = undefined;
var startAsync = undefined;
function endDateTimeAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var currentMonth, hourlater;
        return __generator(this, function (_a) {
            if (date.getUTCMonth() + 1 < 10) {
                currentMonth = date.getUTCMonth() + 1;
                month = '0' + currentMonth;
            }
            else {
                month = date.getUTCMonth() + 1;
            }
            if (date.getUTCDate() < 10) {
                day = '0' + date.getUTCDate();
            }
            else {
                day = date.getUTCDate();
            }
            if (date.getUTCHours() + 1 < 10) {
                hourlater = date.getUTCHours() + 1;
                hour = '0' + hourlater;
            }
            else if (date.getUTCHours() + 1 == 24) {
                hour = '00';
            }
            else {
                hour = date.getUTCHours() + 1;
            }
            if (date.getUTCMinutes() < 10) {
                minute = '0' + date.getUTCMinutes();
            }
            else {
                minute = date.getUTCMinutes();
            }
            if (date.getUTCSeconds() < 10) {
                second = '0' + date.getUTCSeconds();
            }
            else {
                second = date.getUTCSeconds();
            }
            endAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
            return [2 /*return*/, endAsync];
        });
    });
}
exports.endDateTimeAsync = endDateTimeAsync;
function startDateTimeAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var currentMonth;
        return __generator(this, function (_a) {
            if (date.getUTCMonth() + 1 < 10) {
                currentMonth = date.getUTCMonth() + 1;
                month = '0' + currentMonth;
            }
            else {
                month = date.getUTCMonth() + 1;
            }
            if (date.getUTCDate() < 10) {
                day = '0' + date.getUTCDate();
            }
            else {
                day = date.getUTCDate();
            }
            if (date.getUTCHours() < 10) {
                hour = '0' + date.getUTCHours();
            }
            else {
                hour = date.getUTCHours();
            }
            if (date.getUTCMinutes() < 10) {
                minute = '0' + date.getUTCMinutes();
            }
            else {
                minute = date.getUTCMinutes();
            }
            if (date.getUTCSeconds() < 10) {
                second = '0' + date.getUTCSeconds();
            }
            else {
                second = date.getUTCSeconds();
            }
            startAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
            return [2 /*return*/, startAsync];
        });
    });
}
exports.startDateTimeAsync = startDateTimeAsync;
