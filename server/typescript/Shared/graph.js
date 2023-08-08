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
exports.getUsersAsync = void 0;
var dateTimeFormat_1 = require("./dateTimeFormat");
var identity_1 = require("@azure/identity");
var microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
var azureTokenCredentials_1 = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
require("isomorphic-fetch");
var clientSecretCredential;
var appGraphClient;
function ensureGraphForAppOnlyAuth() {
    if (!clientSecretCredential) {
        clientSecretCredential = new identity_1.ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    }
    if (!appGraphClient) {
        var authProvider = new azureTokenCredentials_1.TokenCredentialAuthenticationProvider(clientSecretCredential, {
            scopes: ['https://graph.microsoft.com/.default']
        });
        appGraphClient = microsoft_graph_client_1.Client.initWithMiddleware({
            authProvider: authProvider
        });
    }
}
function createNewMeetingAsync(userId, start, end, subject) {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, endTime, newMeeting, event, newEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ensureGraphForAppOnlyAuth();
                    return [4 /*yield*/, (0, dateTimeFormat_1.startDateTimeAsync)()];
                case 1:
                    startTime = _a.sent();
                    return [4 /*yield*/, (0, dateTimeFormat_1.endDateTimeAsync)()];
                case 2:
                    endTime = _a.sent();
                    newMeeting = "/users/".concat(userId, "/calendar/events");
                    event = {
                        subject: subject,
                        start: {
                            dateTime: start,
                            timeZone: 'UTC'
                        },
                        end: {
                            dateTime: end,
                            timeZone: 'UTC'
                        },
                        isOnlineMeeting: true
                    };
                    return [4 /*yield*/, appGraphClient.api(newMeeting).post(event)];
                case 3:
                    newEvent = _a.sent();
                    return [2 /*return*/, newEvent];
            }
        });
    });
}
exports.default = createNewMeetingAsync;
function getUsersAsync(email) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            ensureGraphForAppOnlyAuth();
            users = appGraphClient.api('/users')
                .select(['displayName', 'id', 'mail'])
                .filter("imAddresses/any(i:i eq '".concat(email, "')"))
                //.top(25)
                //.orderby('displayName')
                .get();
            return [2 /*return*/, users];
        });
    });
}
exports.getUsersAsync = getUsersAsync;
