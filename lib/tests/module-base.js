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
        while (_) try {
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
/* eslint-disable @typescript-eslint/no-explicit-any */
var cli_argument_parser_1 = require("cli-argument-parser");
var chai_1 = require("chai");
var module_base_1 = require("../modules/module.base");
var clients = [];
describe('Module base testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                var _i, clients_1, client;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clients.push(new module_base_1.Module('Module', {
                                host: cli_argument_parser_1.cliArguments.host,
                                port: parseInt(cli_argument_parser_1.cliArguments.port),
                            }, { isHandleError: false }));
                            _i = 0, clients_1 = clients;
                            _a.label = 1;
                        case 1:
                            if (!(_i < clients_1.length)) return [3 /*break*/, 4];
                            client = clients_1[_i];
                            return [4 /*yield*/, client.connect()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            after(function () { return __awaiter(_this, void 0, void 0, function () {
                var _i, clients_2, client;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, clients_2 = clients;
                            _a.label = 1;
                        case 1:
                            if (!(_i < clients_2.length)) return [3 /*break*/, 4];
                            client = clients_2[_i];
                            return [4 /*yield*/, client.disconnect()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            it('sendCommand function', function () { return __awaiter(_this, void 0, void 0, function () {
                var _i, clients_3, client, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, clients_3 = clients;
                            _a.label = 1;
                        case 1:
                            if (!(_i < clients_3.length)) return [3 /*break*/, 6];
                            client = clients_3[_i];
                            return [4 /*yield*/, client.sendCommand({ command: 'set', args: ['foo', 'bar'] })];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the SET command');
                            return [4 /*yield*/, client.sendCommand({ command: 'get', args: ['foo'] })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('bar', 'The response of the GET command');
                            return [4 /*yield*/, client.sendCommand({ command: 'del', args: ['foo'] })];
                        case 4:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the DEL command');
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            it('handleResponse function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response, parsed;
                return __generator(this, function (_a) {
                    response = 'OK';
                    parsed = clients[0].handleResponse(response);
                    (0, chai_1.expect)(parsed).to.equal(response, 'The parsed response');
                    response = ['key', 'value', 'key2', 'value2'];
                    parsed = clients[0].handleResponse(response);
                    (0, chai_1.expect)(parsed.key).to.equal(response[1], 'The parsed response');
                    (0, chai_1.expect)(parsed.key2).to.equal(response[3], 'The parsed response');
                    response = [
                        'numbers', ['num1', 2]
                    ];
                    parsed = clients[0].handleResponse(response);
                    (0, chai_1.expect)(parsed.numbers.num1).to.equal(response[1][1], 'The parsed response');
                    return [2 /*return*/];
                });
            }); });
            it('isOnlyTwoDimensionalArray function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    response = [
                        [1, 2, 3],
                        1
                    ];
                    (0, chai_1.expect)(clients[0].isOnlyTwoDimensionalArray(response)).to.equal(false, 'If array is two dimensional');
                    response = [
                        [1, 2, 3],
                        [6]
                    ];
                    (0, chai_1.expect)(clients[0].isOnlyTwoDimensionalArray(response)).to.equal(true, 'If array is two dimensional');
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
});
