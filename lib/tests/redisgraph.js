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
var graphName = 'Test';
describe('RedisGraph Module testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            this.timeout(10 * 60 * 60);
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
            it('query function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_query(graphName, 'CREATE (p:Person {name: \'Kurt\', age: 27}) RETURN p')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[2].find(function (item) { return item === 'Labels added: 1'; })).to.not.equal(undefined, 'The value of Labels added');
                            (0, chai_1.expect)(response[2].find(function (item) { return item === 'Nodes created: 1'; })).to.not.equal(undefined, 'The value of Nodes created');
                            (0, chai_1.expect)(response[2].find(function (item) { return item === 'Properties set: 2'; })).to.not.equal(undefined, 'The value of Properties set');
                            (0, chai_1.expect)(response[2].find(function (item) { return item === 'Cached execution: 0'; })).to.not.equal(undefined, 'The value of Cached execution');
                            return [4 /*yield*/, redis.graph_module_query(graphName, "MATCH (p:Person) WHERE p.name=$name RETURN count(p) as count", { name: 'Kurt' })];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response[2].find(function (item) { return item === 'Cached execution: 0'; })).to.not.equal(undefined, 'The response of the GRAPH.QUERY command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('readonlyQuery function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_readonlyQuery(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[2][0]).to.equal('Cached execution: 0', 'The response of the GRAPH.RO_QUERY command');
                            return [4 /*yield*/, redis.graph_module_readonlyQuery(graphName, 'MATCH (p:Person) WHERE p.age > $age RETURN p', { age: '80' })];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response[2][0]).to.equal('Cached execution: 0', 'The response of the GRAPH.RO_QUERY command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('profile function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_profile(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.contain('Results | Records produced: 0', 'The response of the GRAPH.QUERY command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('explain function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_explain(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0]).to.equal('Results', 'The response of the GRAPH.EXPLAIN command');
                            (0, chai_1.expect)(response[1]).to.contain('Project', 'The response of the GRAPH.EXPLAIN command');
                            (0, chai_1.expect)(response[2]).to.contain('Filter', 'The response of the GRAPH.EXPLAIN command');
                            (0, chai_1.expect)(response[3]).to.contain('Node By Label Scan | (p:Person)', 'The response of the GRAPH.EXPLAIN command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it.skip('slowlog function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_slowlog(1)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the GRAPH.SLOWLOG command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('delete function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_delete(graphName)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.contain('Graph removed', 'The response of the GRAPH.DELETE command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('config function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response, response2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.graph_module_config('SET', 'RESULTSET_SIZE', '1000')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The RESULT SET SIZE');
                            return [4 /*yield*/, redis.graph_module_config('GET', 'RESULTSET_SIZE')];
                        case 2:
                            response2 = _a.sent();
                            (0, chai_1.expect)(response2.RESULTSET_SIZE).to.eql(1000, 'The RESULT SET SIZE');
                            return [4 /*yield*/, redis.graph_module_config('GET', '*')];
                        case 3:
                            response2 = (_a.sent());
                            (0, chai_1.expect)(response2.CACHE_SIZE).to.eql(25, 'The CACHE_SIZE of the module');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
