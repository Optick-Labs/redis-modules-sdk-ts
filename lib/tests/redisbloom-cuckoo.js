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
var key1 = 'key1cuckoo';
var key2 = '1';
var key3 = 'cuckoo';
var chunks = [];
var redis;
describe('RedisBloom Cuckoo filter testing', function () {
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
            it('reserve function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_reserve(key2, 100, {
                                bucketSize: 1
                            })];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'CF.RESERVE\' command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_add(key1, 'item')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.ADD command');
                            return [4 /*yield*/, redis.bloom_cuckoo_module_add(key2, 'X')];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.ADD command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('addnx function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_addnx(key1, 'item1')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.ADDNX command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('insert function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_insert(key1, ['item4', 'item5'])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal(1, 'The response of the CF.INSERT command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('insertnx function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_insertnx(key3, ['item'])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal(1, 'The response of the CF.INSERTNX command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('exists function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_exists(key1, 'item1')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.EXISTS command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('count function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_count(key1, 'item1')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.COUNT command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scandump function', function () { return __awaiter(_this, void 0, void 0, function () {
                var iter, response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iter = 0;
                            return [4 /*yield*/, redis.bloom_cuckoo_module_scandump(key2, iter)];
                        case 1:
                            response = _a.sent();
                            data = response[1];
                            chunks.push({ iterator: iter, data: data });
                            iter = parseInt(response[0]);
                            _a.label = 2;
                        case 2:
                            if (!(iter != 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, redis.bloom_cuckoo_module_scandump(key2, iter)];
                        case 3:
                            response = _a.sent();
                            iter = parseInt(response[0]);
                            data = response[1];
                            chunks.push({ iterator: iter, data: data });
                            return [3 /*break*/, 2];
                        case 4:
                            (0, chai_1.expect)(chunks.length).gt(0, "The count of chunks of key ".concat(key2));
                            return [2 /*return*/];
                    }
                });
            }); });
            it.skip('loadchunk function', function () { return __awaiter(_this, void 0, void 0, function () {
                var chunk, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chunk = chunks[1];
                            return [4 /*yield*/, redis.bloom_cuckoo_module_loadchunk(key2, chunk.iterator, chunk.data.replace(/�/g, 'fffd'))];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res).to.equal('OK', "The response of load chunk with iterator ".concat(chunk.iterator));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('info function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_info(key1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[1]).to.equal(1080, 'The size of the key');
                            (0, chai_1.expect)(response[3]).to.equal(512, 'The number of buckets of the key');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('del function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.bloom_cuckoo_module_del(key1, 'item1')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the CF.DEL command');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
