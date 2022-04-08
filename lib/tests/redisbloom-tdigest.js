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
var key1 = 'mykey1';
var key2 = 'mykey2';
describe('RedisBloom TDigest filter testing', function () {
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
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_create(key1, 100)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.CREATE\' command');
                            return [4 /*yield*/, redis.bloom_tdigest_module_create(key2, 100)];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.CREATE\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('reset function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_reset(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.RESET\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_add(key1, [{
                                    value: 1500.0,
                                    weight: 1.0
                                }])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.ADD\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('merge function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_merge(key1, key2)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.MERGE\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('max function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_max(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.MAX\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('min function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_min(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.MIN\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('quantile function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_quantile(key1, 0.5)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.QUANTILE\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cdf function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_cdf(key1, 10)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('0', 'The response of \'TDIGEST.CDF\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('info function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_tdigest_module_info(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.Compression).to.eql(100, 'The compression');
                            (0, chai_1.expect)(response.Capacity).to.eql(610, 'The capacity');
                            (0, chai_1.expect)(response['Merged nodes']).to.eql(1, 'The merged nodes');
                            (0, chai_1.expect)(response['Unmerged nodes']).to.eql(0, 'The unmerged nodes');
                            (0, chai_1.expect)(response['Merged weight']).to.eql('1', 'The merged weight');
                            (0, chai_1.expect)(response['Unmerged weight']).to.eql('0', 'The unmerged weight');
                            (0, chai_1.expect)(response['Total compressions']).to.eql(1, 'The total compressions');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
