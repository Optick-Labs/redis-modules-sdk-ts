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
var date = new Date(2019, 11, 24, 19).getTime();
var key1 = 'key:2:32';
var key2 = 'key:2:33';
describe('RTS Module testing', function () {
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
            it('create function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_create(key1, {
                                labels: [{
                                        name: 'label',
                                        value: 'value'
                                    }]
                            })];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the create command');
                            return [4 /*yield*/, redis.rts_module_create(key2, {
                                    labels: [{
                                            name: 'label1',
                                            value: 'value1'
                                        }]
                                })];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the create command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('alter function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_alter(key1, 1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the alter command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_add(key1, "".concat(date), '26', { onDuplicate: 'SUM' })];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(date, 'The response of the add command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('madd function', function () { return __awaiter(_this, void 0, void 0, function () {
                var info, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_info(key1)];
                        case 1:
                            info = _a.sent();
                            return [4 /*yield*/, redis.rts_module_madd([{
                                        key: key1,
                                        timestamp: info.firstTimestamp.toString(),
                                        value: '32'
                                    }])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(1, 'The response of the madd command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('incrby function', function () { return __awaiter(_this, void 0, void 0, function () {
                var currentValue, _a, newValue, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = parseInt;
                            return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 1:
                            currentValue = _a.apply(void 0, [(_c.sent())[1].toString()]);
                            return [4 /*yield*/, redis.rts_module_incrby(key1, '1')];
                        case 2:
                            _c.sent();
                            _b = parseInt;
                            return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 3:
                            newValue = _b.apply(void 0, [(_c.sent())[1].toString()]);
                            (0, chai_1.expect)(newValue).to.be.above(currentValue, 'The response of the incrby command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('decrby function', function () { return __awaiter(_this, void 0, void 0, function () {
                var currentValue, _a, newValue, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = parseInt;
                            return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 1:
                            currentValue = _a.apply(void 0, [(_c.sent())[1].toString()]);
                            return [4 /*yield*/, redis.rts_module_decrby(key1, '1')];
                        case 2:
                            _c.sent();
                            _b = parseInt;
                            return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 3:
                            newValue = _b.apply(void 0, [(_c.sent())[1].toString()]);
                            (0, chai_1.expect)(currentValue).to.be.above(newValue, 'The response of the decrby command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('createrule function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_createrule({
                                sourceKey: key1,
                                destKey: key2,
                                aggregation: 'avg',
                                timeBucket: 1
                            })];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the createrule command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('deleterule function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_deleterule(key1, key2)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the deleterule command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('range function', function () { return __awaiter(_this, void 0, void 0, function () {
                var data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 1:
                            data = _a.sent();
                            return [4 /*yield*/, redis.rts_module_range(key1, data[0].toString(), data[1].toString())];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
                            return [4 /*yield*/, redis.rts_module_range(key1, "".concat(data[0]), "".concat(data[1]), {
                                    align: 'start',
                                    aggregation: {
                                        type: 'count',
                                        timeBucket: 10
                                    }
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('revrange function', function () { return __awaiter(_this, void 0, void 0, function () {
                var data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 1:
                            data = _a.sent();
                            return [4 /*yield*/, redis.rts_module_revrange(key1, data[0].toString(), data[1].toString())];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
                            return [4 /*yield*/, redis.rts_module_revrange(key1, "".concat(data[0]), "".concat(data[1]), {
                                    align: 'start',
                                    aggregation: {
                                        type: 'count',
                                        timeBucket: 10
                                    }
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('mrange function', function () { return __awaiter(_this, void 0, void 0, function () {
                var info, fromTimestamp, toTimestamp, key, filter, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_info(key1)];
                        case 1:
                            info = _a.sent();
                            fromTimestamp = (info.firstTimestamp - 1);
                            toTimestamp = (info.lastTimestamp + 10000);
                            key = 'key:2:32';
                            filter = 'label=value';
                            return [4 /*yield*/, redis.rts_module_mrange("".concat(fromTimestamp), "".concat(toTimestamp), filter)];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.equal(key, 'The filtered key name');
                            return [4 /*yield*/, redis.rts_module_mrange("".concat(fromTimestamp), "".concat(toTimestamp), filter, {
                                    groupBy: {
                                        label: 'label',
                                        reducer: 'MAX'
                                    },
                                    withLabels: true
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.equal(filter, 'The value of the filter');
                            (0, chai_1.expect)(response[0][1][0][0]).to.equal('label', 'The name of the label');
                            (0, chai_1.expect)(response[0][1][0][1]).to.equal('value', 'The value of the label value');
                            (0, chai_1.expect)(response[0][1][1][0]).to.equal('__reducer__', 'The key of the reducer');
                            (0, chai_1.expect)(response[0][1][1][1]).to.equal('max', 'The value of the reducer');
                            (0, chai_1.expect)(response[0][1][2][0]).to.equal('__source__', 'The key of the source');
                            (0, chai_1.expect)(response[0][1][2][1]).to.equal(key, 'The value of the source');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('mrevrange function', function () { return __awaiter(_this, void 0, void 0, function () {
                var info, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_info(key1)];
                        case 1:
                            info = _a.sent();
                            return [4 /*yield*/, redis.rts_module_mrevrange((info.firstTimestamp - 1).toString(), (info.lastTimestamp + 10000).toString(), 'label=value')];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.equal('key:2:32', 'The filtered key name');
                            return [4 /*yield*/, redis.rts_module_mrevrange("".concat(info.firstTimestamp - 1), "".concat(info.lastTimestamp + 10000), 'label=value', {
                                    align: '+',
                                    aggregation: {
                                        type: 'count',
                                        timeBucket: 10
                                    }
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.equal('key:2:32', 'The filtered key name');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('get function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_get(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(2, 'The response of the get command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('mget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_mget('label=value')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(1, 'The response of the mget command');
                            return [4 /*yield*/, redis.rts_module_mget('label=value label1=value1')];
                        case 2:
                            response = _a.sent();
                            console.log(response);
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the mget command');
                            return [4 /*yield*/, redis.rts_module_mget('label=value x=(a,b,c)')];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the mget command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('info function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_info(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.totalSamples).to.be.greaterThan(0, 'The total samples of the key');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('queryindex function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_queryindex('label=value')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).eql(1, 'The response of the queryindex command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('del function', function () { return __awaiter(_this, void 0, void 0, function () {
                var samplesCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rts_module_del(key1, date.toString(), new Date().getTime().toString())];
                        case 1:
                            samplesCount = _a.sent();
                            (0, chai_1.expect)(samplesCount).eql(3, 'The response TS.DEL command');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
