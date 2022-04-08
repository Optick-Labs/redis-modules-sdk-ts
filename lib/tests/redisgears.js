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
var executionId1;
var executionId2;
var executionId3;
describe('RedisGears Module testing', function () {
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
                            });
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
            it('pyexecute function', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_pyexecute('GB().run()', {
                                unblocking: true
                            })];
                        case 1:
                            executionId1 = _a.sent();
                            (0, chai_1.expect)(executionId1).to.equal('0000000000000000000000000000000000000000-0', 'The execution id');
                            console.log("Execution ID: ".concat(executionId1));
                            return [4 /*yield*/, redis.gears_module_pyexecute('GB().run()', {
                                    unblocking: true
                                })];
                        case 2:
                            executionId2 = _a.sent();
                            console.log("Execution ID: ".concat(executionId2));
                            (0, chai_1.expect)(executionId2).to.equal('0000000000000000000000000000000000000000-1', 'The execution id');
                            return [4 /*yield*/, redis.gears_module_pyexecute('GB().run()', {
                                    unblocking: true
                                })];
                        case 3:
                            executionId3 = _a.sent();
                            console.log("Execution ID: ".concat(executionId3));
                            (0, chai_1.expect)(executionId3).to.equal('0000000000000000000000000000000000000000-2', 'The execution id');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('configSet function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_configSet([['ProfileExecutions', '1']])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response count of the \'RG.CONFIGSET\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('configGet function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_configGet(['ProfileExecutions'])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal(0, 'The response count of the \'RG.CONFIGGET\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('getExecution function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_getExecution(executionId1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][3][1]).to.equal('done', 'The response count of the \'RG.GETEXECUTION\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dumpExecutions function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_dumpExecutions()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[1][1]).to.equal(executionId1, 'The execution id');
                            (0, chai_1.expect)(response[0][1]).to.equal(executionId2, 'The execution id');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dumpRegistrations function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_dumpRegistrations()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response count of the \'RG.DUMPREGISTRATIONS\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('getResults function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_getResults(executionId1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(2, 'The response count of the \'RG.GETRESULTS\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('getResultsBlocking function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_getResultsBlocking(executionId1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(2, 'The response count of the \'RG.GETRESULTSBLOCKING\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('infocluster function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_infocluster()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('no cluster mode', 'The response of the \'RG.INFOCLUSTER\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('pystats function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_pystats()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal('TotalAllocated', 'The response of the \'RG.PYSTATS\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('pydumpreqs function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_pydumpreqs()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the \'RG.PYDUMPREQS\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('refreshCluster function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_refreshCluster()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.REFRESHCLUSTER\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('trigger function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_pyexecute("GB('CommandReader').register(trigger='mytrigger')", {
                                unblocking: true
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.gears_module_trigger('mytrigger', ['foo', 'bar'])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal('[\'mytrigger\', \'foo\', \'bar\']', 'The response of the \'RG.TRIGGER\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dropExecution function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_dropExecution(executionId1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.DROPEXECUTION\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('abortExecution function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.gears_module_abortExecution(executionId2)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.ABORTEXECUTION\' Command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('unregister function', function () { return __awaiter(_this, void 0, void 0, function () {
                var registrationId, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            registrationId = "".concat(executionId3.split('-')[0], "-").concat(parseInt(executionId3.split('-')[1]) + 1);
                            return [4 /*yield*/, redis.gears_module_unregister(registrationId)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.UNREGISTER\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
