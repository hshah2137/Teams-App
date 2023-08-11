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
var graph_1 = require("../Shared/graph");
var querystring = require("querystring");
var nodemailer = require("nodemailer");
var teamsMeetingLink;
var httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, subject, startTime, userId, endTime, user_email, userName, atendee, body, meeting, start_date, end_date, timeZone, formattedStartDate, formattedStartTime, formattedEndDate, formattedEndTime, transporter, mailOptions_creator, mailOptions_atendee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.log("Request received");
                    formData = querystring.parse(req.body);
                    console.log('form', formData);
                    subject = formData.subject;
                    startTime = formData.startTime;
                    userId = formData.userId;
                    console.log(formData.startTime);
                    console.log(formData.subject);
                    endTime = formData.endTime;
                    user_email = formData.email;
                    console.log("email: " + user_email);
                    userName = formData.name;
                    atendee = formData.atendee;
                    return [4 /*yield*/, (0, graph_1.default)(userId, startTime, endTime, subject)];
                case 1:
                    teamsMeetingLink = _a.sent();
                    body = JSON.stringify(teamsMeetingLink);
                    meeting = JSON.parse(body);
                    context.log("meeting:", meeting);
                    console.log("start: " + meeting.start.dateTime);
                    start_date = new Date(meeting.start.dateTime);
                    end_date = new Date(meeting.end.dateTime);
                    timeZone = meeting.start.timeZone;
                    formattedStartDate = start_date.toLocaleDateString();
                    formattedStartTime = start_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    formattedEndDate = end_date.toLocaleDateString();
                    formattedEndTime = end_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    console.log(formattedStartTime);
                    console.log(formattedStartDate);
                    context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: meeting.onlineMeeting.joinUrl
                    };
                    transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ixn.project@gmail.com',
                            pass: 'rclnxpoxybheyjes',
                        },
                    });
                    mailOptions_creator = {
                        from: 'ixn.project@gmail.com',
                        to: user_email,
                        subject: 'Meeting Notification',
                        text: 'Your meeting has been created from ' +
                            formattedStartDate + ' ' + formattedStartTime
                            + ' to ' + formattedEndDate + ' ' + formattedEndTime
                            + '. Use the link below to join the meeting: \n' + meeting.onlineMeeting.joinUrl,
                    };
                    transporter.sendMail(mailOptions_creator, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    mailOptions_atendee = {
                        from: 'ixn.project@gmail.com',
                        to: atendee,
                        subject: 'Meeting Notification',
                        text: 'You have been invited to a meeting created by ' + userName + ', ' + user_email + '. This meeting is from ' +
                            formattedStartDate + ' ' + formattedStartTime
                            + ' to ' + formattedEndDate + ' ' + formattedEndTime +
                            '. \n You can join this meeting with the following link: \n' + meeting.onlineMeeting.joinUrl,
                    };
                    transporter.sendMail(mailOptions_atendee, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = httpTrigger;
