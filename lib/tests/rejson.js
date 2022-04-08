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
var key1 = 'key1';
var key2 = 'key2';
var key3 = 'arrkey';
var path = '.';
describe('ReJSON Module testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redis = new redis_modules_1.RedisModules({
                                host: cli_argument_parser_1.cliArguments.host,
                                port: parseInt(cli_argument_parser_1.cliArguments.port)
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
            it('set function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_set(key1, path, '{"x": 1, "str": "yy"}')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
                            return [4 /*yield*/, redis.rejson_module_set(key2, path, '{"x": 3}')];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
                            return [4 /*yield*/, redis.rejson_module_set(key3, path, '{"items": [1]}')];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('get function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_get(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('{"x":1,"str":"yy"}', 'The response of the get command');
                            return [4 /*yield*/, redis.rejson_module_get(key1, '$..x')];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('[1]', 'The value of the X key');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('mget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_mget([key1, key2], path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.contain('{"x":1,"str":"yy"}', 'The response of the mget command');
                            (0, chai_1.expect)(response).to.contain('{"x":3}', 'The response of the mget command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('type function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_type(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('object', 'The response of the type command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('numincrby function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_numincrby(key1, 2, '.x')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('3', 'The response of the numincrby command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('nummultby function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_nummultby(key1, 3, '.x')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('9', 'The response of the nummultby command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('strappend function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response, string;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_strappend(key1, '"rrr"', '.str')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(5, 'The response of the strappend command');
                            return [4 /*yield*/, redis.rejson_module_get(key1, '.str')];
                        case 2:
                            string = _a.sent();
                            (0, chai_1.expect)(string).to.equal('"yyrrr"', 'The response of the get command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('strlen function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_strlen(key1, '.str')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(5, 'The response of the strlen command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrappend function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrappend(key3, ['3', '5', '4', '2'], '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(5, 'The response of the arrappend command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrindex function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrindex(key3, '1', '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(0, 'The response of the arrindex command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrinsert function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrinsert(key3, 1, '{"z": 5}', '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(6, 'The response of the arrinsert command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrlen function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrlen(key3, '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(6, 'The response of the arrlen command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrpop function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrpop(key3, 0, '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('1', 'The response of the arrpop command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('arrtrim function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_arrtrim(key3, 0, 1, '.items')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(2, 'The response of the arrtrim command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('objkeys function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_objkeys(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.toString()).to.equal('x,str', 'The response of the objkeys command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('objlen function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_objlen(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(2, 'The response of the objlen command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('debug function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_debug('MEMORY', key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.be.greaterThan(0, 'The response of the debug command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('forget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_forget(key2, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the forget command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('resp function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_resp(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.toString()).to.equal('{,x,9,str,yyrrr', 'The response of the resp command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('toggle function', function () { return __awaiter(_this, void 0, void 0, function () {
                var key, path, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = 'toggle';
                            path = '.x';
                            return [4 /*yield*/, redis.rejson_module_set(key, '.', '{"x": false, "str": "yy"}')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.rejson_module_toggle(key, path)];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('true', 'The response of JSON.TOGGLE');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('clear function', function () { return __awaiter(_this, void 0, void 0, function () {
                var key, path, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = 'clear';
                            path = '.';
                            return [4 /*yield*/, redis.rejson_module_set(key, path, '{"x": 1, "str": "yy"}')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.rejson_module_clear(key, path)];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of JSON.CLEAR');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('del function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.rejson_module_del(key1, path)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the del command');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
