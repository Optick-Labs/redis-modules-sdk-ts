"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var fs = __importStar(require("fs"));
var redis;
var index = 'idx';
var query = '@text:name';
var alias = 'alias';
var sug = {
    key: 'k',
    string: 'str',
    score: 11
};
var dict = {
    name: 'dictX',
    term: 'termY'
};
describe('RediSearch Module testing', function () {
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
                        case 0: return [4 /*yield*/, redis.redis.flushdb()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.disconnect()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('create function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_create(index, 'HASH', [{
                                    name: 'name',
                                    type: 'TEXT'
                                }])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
                            return [4 /*yield*/, redis.search_module_create("".concat(index, "1"), 'HASH', [{
                                        name: 'name',
                                        type: 'TEXT'
                                    }, {
                                        name: 'name2',
                                        type: 'TEXT',
                                        sortable: true,
                                        weight: 2
                                    }])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
                            return [4 /*yield*/, redis.search_module_create("".concat(index, "-json"), 'JSON', [{
                                        name: '$.name',
                                        type: 'TEXT',
                                        as: 'name'
                                    }])];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
                            return [4 /*yield*/, redis.search_module_dropindex("".concat(index, "1"))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('search function on JSON', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search(index, query)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(0, 'The response of the FT.SEARCH command');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-json"), query, {
                                    return: {
                                        num: 3,
                                        fields: [
                                            { field: '$.name', as: 'name' }
                                        ]
                                    }
                                })];
                        case 2:
                            //FIXME: JSON Needs more tests, also I couldn't find anything related to `RETURN AS` so that also needs tests
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(0, 'The response of the FT.SEARCH command');
                            return [4 /*yield*/, redis.search_module_dropindex("".concat(index, "-json"))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('search function response test (creation phase)', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_create("".concat(index, "-searchtest"), 'HASH', [{
                                    name: 'name',
                                    type: 'TEXT'
                                }, {
                                    name: 'age',
                                    type: 'NUMERIC'
                                }, {
                                    name: 'salary',
                                    type: 'NUMERIC'
                                }, {
                                    name: 'introduction',
                                    type: 'TEXT'
                                }], {
                                prefix: {
                                    prefixes: ["doc", "alma"]
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('doc:1', {
                                    name: 'John Doe',
                                    age: 25,
                                    salary: 2500,
                                    introduction: 'John Doe is a developer at somekind of company.'
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('doc:2', {
                                    name: 'Jane Doe',
                                    age: 30,
                                    salary: 5000,
                                    introduction: 'Jane Doe is John Doe\'s sister. She is not a developer, she is a hairstylist.'
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('doc:3', {
                                    name: 'Sarah Brown',
                                    age: 80,
                                    salary: 10000,
                                    introduction: 'Sarah Brown is retired with an unusually high "salary".'
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Simple search test with field specified in query', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, count, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '@name:Doe')];
                        case 1:
                            _a = _b.sent(), count = _a[0], result = _a.slice(1);
                            (0, chai_1.expect)(count).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(result[0].key).to.equal('doc:1', 'first document key');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Simple search tests with field specified using inFields', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Doe', {
                                inFields: {
                                    fields: ['age', 'salary']
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res).to.equal(0, 'Total number of returining document of FT.SEARCH command');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Doe', {
                                    inFields: {
                                        fields: ['name']
                                    }
                                })];
                        case 2:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search test with inkeys', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Doe', {
                                inKeys: {
                                    keys: ['doc:1', 'doc:2']
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Doe', {
                                    inKeys: {
                                        keys: ['doc:3']
                                    }
                                })];
                        case 2:
                            res = _a.sent();
                            (0, chai_1.expect)(res).to.equal(0, 'Total number of returining document of FT.SEARCH command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search tests with filter', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                filter: [{
                                        field: 'age',
                                        min: 0,
                                        max: 35
                                    }]
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                    filter: [
                                        {
                                            field: 'age',
                                            min: 0,
                                            max: 35,
                                        },
                                        {
                                            field: 'salary',
                                            min: 0,
                                            max: 2500,
                                        }
                                    ]
                                })];
                        case 2:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(1, 'Total number of returining document of FT.SEARCH command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search tests with return', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                return: {
                                    fields: [{
                                            field: 'age',
                                        }]
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(Object.keys(res[1]).length).to.equal(2, 'Total number of returned key-values');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('age')).to.equal(true, 'Age must be returned');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('salary')).to.equal(false, 'Salary must not be returned');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('name')).to.equal(false, 'Name must not be returned');
                            (0, chai_1.expect)(Object.keys(res[2]).length).to.equal(2, 'Total number of returned key-values');
                            (0, chai_1.expect)(Object.keys(res[3]).length).to.equal(2, 'Total number of returned key-values');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Sarah', {
                                    return: {
                                        fields: [
                                            {
                                                field: 'age',
                                            },
                                            {
                                                field: 'salary',
                                            }
                                        ]
                                    }
                                })];
                        case 2:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(1, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('age')).to.equal(true, 'Age must be returned');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('salary')).to.equal(true, 'Salary must be returned');
                            (0, chai_1.expect)(Object.keys(res[1]).includes('name')).to.equal(false, 'Name must not be returned');
                            return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                    return: { fields: [] }
                                })];
                        case 3:
                            res = (_a.sent());
                            (0, chai_1.expect)(res.length).to.equal(4, 'Only keys should be returned (+count of them)');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search test with summarize', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'De*', {
                                //! specifying fields in summarize while return is also specified will cause redis (edge version) to crash
                                //! Crash in redis image fabe0b38e273
                                // return: ['introduction'],
                                summarize: {
                                    fields: { fields: ['introduction'] },
                                    frags: 1,
                                    len: 3,
                                    separator: ' !?!'
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(res[1].introduction.endsWith('!?!')).to.equal(true, 'Custom summarize separator');
                            (0, chai_1.expect)(res[1].introduction.endsWith('!?!')).to.equal(true, 'Custom summarize separator');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search tests with highlight', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), 'Do*|De*', {
                                highlight: {
                                    fields: { fields: ['introduction'] },
                                    tags: {
                                        open: '**',
                                        close: '**'
                                    }
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(res[1].name.includes('**')).to.equal(false, 'Name mustn\'t be highlighted');
                            (0, chai_1.expect)(res[1].introduction.includes('**developer**')).to.equal(true, 'Introduction must be highlighted');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search test with sortby ', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                return: { fields: [{ field: 'age' }] },
                                sortBy: {
                                    field: 'age',
                                    sort: 'ASC'
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(res[1].age).to.equal('25', 'Ages should be returned in ascending order');
                            (0, chai_1.expect)(res[2].age).to.equal('30', 'Ages should be returned in ascending order');
                            (0, chai_1.expect)(res[3].age).to.equal('80', 'Ages should be returned in ascending order');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Search test with limit', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_search("".concat(index, "-searchtest"), '*', {
                                limit: {
                                    first: 0,
                                    num: 1
                                }
                            })];
                        case 1:
                            res = _a.sent();
                            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
                            (0, chai_1.expect)(res.length).to.equal(2, 'Only one item should be returned');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('aggregate function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_aggregate(index, query)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.numberOfItems).to.equal(0, 'The response of the FT.AGGREGATE command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('aggregate function response', function () { return __awaiter(_this, void 0, void 0, function () {
                var time, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_create("".concat(index, "-aggreagtetest"), 'HASH', [{
                                    name: 'name',
                                    type: 'TEXT'
                                },
                                {
                                    name: 'city',
                                    type: 'TEXT'
                                },
                                {
                                    name: 'gender',
                                    type: 'TAG'
                                },
                                {
                                    name: 'timestamp',
                                    type: 'NUMERIC',
                                    sortable: true
                                }
                            ], {
                                prefix: { prefixes: ['person'] }
                            })];
                        case 1:
                            _a.sent();
                            time = new Date();
                            return [4 /*yield*/, redis.redis.hset('person:1', { name: 'John Doe', city: 'London', gender: 'male', timestamp: (time.getTime() / 1000).toFixed(0) })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('person:2', { name: 'Jane Doe', city: 'London', gender: 'female', timestamp: (time.getTime() / 1000).toFixed(0) })];
                        case 3:
                            _a.sent();
                            time.setHours(time.getHours() - 3);
                            return [4 /*yield*/, redis.redis.hset('person:3', { name: 'Sarah Brown', city: 'New York', gender: 'female', timestamp: (time.getTime() / 1000).toFixed(0) })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('person:3', { name: 'Michael Doe', city: 'New York', gender: 'male', timestamp: (time.getTime() / 1000).toFixed(0) })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_aggregate("".concat(index, "-aggreagtetest"), 'Doe', {
                                    groupby: { properties: ['@city'], nargs: '1' }
                                })];
                        case 6:
                            response = _a.sent();
                            (0, chai_1.expect)(response.numberOfItems).to.equal(2, 'Total number of the FT.AGGREGATE command result');
                            (0, chai_1.expect)(response.items[0].name).to.equal('city', 'Aggreagated prop of the FT.AGGREGATE command result');
                            return [4 /*yield*/, redis.search_module_aggregate("".concat(index, "-aggreagtetest"), '*', {
                                    apply: [{ expression: 'hour(@timestamp)', as: 'hour' }],
                                    groupby: { properties: ['@hour'], nargs: '1' }
                                })];
                        case 7:
                            response = _a.sent();
                            (0, chai_1.expect)(response.numberOfItems).to.equal(2, 'Total number of the FT.AGGREGATE command result');
                            (0, chai_1.expect)(response.items[0].name).to.equal('hour', 'Aggreagated apply prop of the FT.AGGREGATE command result');
                            return [4 /*yield*/, redis.search_module_dropindex("".concat(index, "-aggreagtetest"))];
                        case 8:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('explain function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_explain(index, query)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.contain('@NULL:UNION', 'The response of the FT.EXPLAIN command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('explainCLI function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_explainCLI(index, query)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('@NULL:UNION {  @NULL:name  @NULL:+name(expanded)}', 'The response of the FT.EXPLAINCLI command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('alter function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_alter(index, 'tags', 'TAG')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALTER command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('aliasadd function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_aliasadd(alias, index)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASADD command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('aliasupdate function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_aliasupdate(alias, index)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASUPDATE command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('aliasdel function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_aliasdel(alias)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASDEL command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('sugadd function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_sugadd(sug.key, sug.string, sug.score)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGADD command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('sugget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_sugget(sug.key, sug.string)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('str', 'The response of the FT.SUGGET command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('suglen function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_suglen(sug.key)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGLEN command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('sugdel function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_sugdel(sug.key, sug.string)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGDEL command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('tagvalgs function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_tagvals(index, 'tags')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the FT.TAGVALS command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('synupdate function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_synupdate(index, 0, ['term1'])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.SYNUPDATE command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('syndump function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_syndump(index)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.term1).to.equal('0', 'The response of the FT.SYNDUMP command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('spellcheck function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_create("".concat(index, "-spellcheck"), 'HASH', [{
                                    name: "content",
                                    type: "TEXT",
                                }], {
                                prefix: { prefixes: 'colors:' }
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.redis.hset('colors:1', { content: 'red green blue yellow mellon' })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_spellcheck("".concat(index, "-spellcheck"), "redis")];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0].suggestions.length).to.equal(0, 'No suggestion should be found');
                            return [4 /*yield*/, redis.search_module_spellcheck("".concat(index, "-spellcheck"), "mellow blua")];
                        case 4:
                            response = _a.sent();
                            (0, chai_1.expect)(response.length).to.equal(2, 'Both word should be spellchecked');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dictadd function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_dictadd(dict.name, [dict.term])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.DICTADD command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dictdel function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_dictadd(dict.name, [dict.term])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_dictdel(dict.name, [dict.term])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.DICDEL command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dictdump function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_dictadd("".concat(dict.name, "1"), ["".concat(dict.term, "1")])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_dictdump("".concat(dict.name, "1"))];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('termY1', 'The response of the FT.DICTDUMP command');
                            return [4 /*yield*/, redis.search_module_dictdel("".concat(dict.name, "1"), ["".concat(dict.term, "1")])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('info function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_info(index)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.index_name).to.equal(index, 'The index name');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('config function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_config('GET', '*')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.EXTLOAD).to.equal(null, 'The EXTLOAD value');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dropindex function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.search_module_create("".concat(index, "-droptest"), 'HASH', [{
                                    name: 'name',
                                    type: 'TEXT'
                                }])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_dropindex("".concat(index, "-droptest"))];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.DROPINDEX command');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Testing the parse of search function as JSON', function () { return __awaiter(_this, void 0, void 0, function () {
                var json, parsedJSON, result, resultsCount;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            json = fs.readFileSync('tests/data/models/sample1.json', { encoding: 'utf-8' });
                            parsedJSON = JSON.parse(json);
                            return [4 /*yield*/, redis.search_module_create('li-index', 'JSON', [{
                                        name: '$.title',
                                        type: 'TEXT',
                                    }, {
                                        name: '$.description',
                                        type: 'TEXT',
                                    }])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Promise.all(parsedJSON.map(function (p) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, redis.rejson_module_set("li:".concat(p.id), '$', JSON.stringify(p))];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); }))];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.search_module_search('li-index', 'KAS', { limit: { first: 0, num: 20 }, withScores: true })];
                        case 3:
                            result = _a.sent();
                            resultsCount = result.resultsCount;
                            (0, chai_1.expect)(resultsCount).to.equal(1, 'The count of the results');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
