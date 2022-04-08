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
var cli_argument_parser_1 = require("cli-argument-parser");
var chai_1 = require("chai");
var redis_modules_1 = require("../modules/redis-modules");
var redis;
describe('RedisIntervalSets Module testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redis = new redis_modules_1.RedisModules({
                                host: cli_argument_parser_1.cliArguments.host,
                                port: parseInt(cli_argument_parser_1.cliArguments.port),
                            }, { showDebugLogs: true });
                            return [4 /*yield*/, redis.connect()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            after(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.disconnect()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ris_module_add('ages', [{
                                    name: 'parents',
                                    minimum: 20,
                                    maximum: 100
                                }, {
                                    name: 'kids',
                                    minimum: 0,
                                    maximum: 100
                                }])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.add\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('get function', function () { return __awaiter(_this, void 0, void 0, function () {
                var sets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ris_module_get('ages')];
                        case 1:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(2, 'The number of sets');
                            return [4 /*yield*/, redis.ris_module_get('ages', 'kids')];
                        case 2:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
                            (0, chai_1.expect)(sets[0].minimum).to.eql(0, 'The minimum score of set');
                            (0, chai_1.expect)(sets[0].maximum).to.eql(100, 'The maximum score of set');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('score function', function () { return __awaiter(_this, void 0, void 0, function () {
                var sets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ris_module_score('ages', 5)];
                        case 1:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
                            (0, chai_1.expect)(sets[0]).to.eql('kids', 'The name of the set');
                            return [4 /*yield*/, redis.ris_module_score('ages', 5)];
                        case 2:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
                            (0, chai_1.expect)(sets[0]).to.eql('kids', 'The name of the set');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('notScore function', function () { return __awaiter(_this, void 0, void 0, function () {
                var sets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ris_module_notScore('ages', 5)];
                        case 1:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
                            (0, chai_1.expect)(sets[0]).to.eql('parents', 'The name of the set');
                            return [4 /*yield*/, redis.ris_module_notScore('ages', 5)];
                        case 2:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
                            (0, chai_1.expect)(sets[0]).to.eql('parents', 'The name of the set');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('del function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response, sets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ris_module_del('ages', ['kids'])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.del\' command');
                            return [4 /*yield*/, redis.ris_module_get('ages')];
                        case 2:
                            sets = _a.sent();
                            (0, chai_1.expect)(sets.length).to.eql(1, 'The sets count');
                            return [4 /*yield*/, redis.ris_module_del('ages')];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.del\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
