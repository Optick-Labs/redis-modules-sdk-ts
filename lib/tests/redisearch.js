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
Object.defineProperty(exports, "__esModule", { value: true });
const cli_argument_parser_1 = require("cli-argument-parser");
const chai_1 = require("chai");
const redis_modules_1 = require("../modules/redis-modules");
const fs = __importStar(require("fs"));
let redis;
const index = 'idx';
const query = '@text:name';
const alias = 'alias';
const sug = {
    key: 'k',
    string: 'str',
    score: 11
};
const dict = {
    name: 'dictX',
    term: 'termY'
};
describe('RediSearch Module testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        before(() => __awaiter(this, void 0, void 0, function* () {
            redis = new redis_modules_1.RedisModules({
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port)
            }, { showDebugLogs: true });
            yield redis.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            yield redis.redis.flushdb();
            yield redis.disconnect();
        }));
        it('create function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.search_module_create(index, 'HASH', [{
                    name: 'name',
                    type: 'TEXT'
                }]);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
            response = yield redis.search_module_create(`${index}1`, 'HASH', [{
                    name: 'name',
                    type: 'TEXT'
                }, {
                    name: 'name2',
                    type: 'TEXT',
                    sortable: true,
                    weight: 2
                }]);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
            response = yield redis.search_module_create(`${index}-json`, 'JSON', [{
                    name: '$.name',
                    type: 'TEXT',
                    as: 'name'
                }]);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.CREATE command');
            yield redis.search_module_dropindex(`${index}1`);
        }));
        it('search function on JSON', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.search_module_search(index, query);
            (0, chai_1.expect)(response).to.equal(0, 'The response of the FT.SEARCH command');
            //FIXME: JSON Needs more tests, also I couldn't find anything related to `RETURN AS` so that also needs tests
            response = yield redis.search_module_search(`${index}-json`, query, {
                return: {
                    num: 3,
                    fields: [
                        { field: '$.name', as: 'name' }
                    ]
                }
            });
            (0, chai_1.expect)(response).to.equal(0, 'The response of the FT.SEARCH command');
            yield redis.search_module_dropindex(`${index}-json`);
        }));
        it('search function response test (creation phase)', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_create(`${index}-searchtest`, 'HASH', [{
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
            });
            yield redis.redis.hset('doc:1', {
                name: 'John Doe',
                age: 25,
                salary: 2500,
                introduction: 'John Doe is a developer at somekind of company.'
            });
            yield redis.redis.hset('doc:2', {
                name: 'Jane Doe',
                age: 30,
                salary: 5000,
                introduction: 'Jane Doe is John Doe\'s sister. She is not a developer, she is a hairstylist.'
            });
            yield redis.redis.hset('doc:3', {
                name: 'Sarah Brown',
                age: 80,
                salary: 10000,
                introduction: 'Sarah Brown is retired with an unusually high "salary".'
            });
        }));
        it('Simple search test with field specified in query', () => __awaiter(this, void 0, void 0, function* () {
            const [count, ...result] = yield redis.search_module_search(`${index}-searchtest`, '@name:Doe');
            (0, chai_1.expect)(count).to.equal(2, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(result[0].key).to.equal('doc:1', 'first document key');
        }));
        it('Simple search tests with field specified using inFields', () => __awaiter(this, void 0, void 0, function* () {
            let res = yield redis.search_module_search(`${index}-searchtest`, 'Doe', {
                inFields: {
                    fields: ['age', 'salary']
                }
            });
            (0, chai_1.expect)(res).to.equal(0, 'Total number of returining document of FT.SEARCH command');
            res = yield redis.search_module_search(`${index}-searchtest`, 'Doe', {
                inFields: {
                    fields: ['name']
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
        }));
        it('Search test with inkeys', () => __awaiter(this, void 0, void 0, function* () {
            let res = yield redis.search_module_search(`${index}-searchtest`, 'Doe', {
                inKeys: {
                    keys: ['doc:1', 'doc:2']
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
            res = yield redis.search_module_search(`${index}-searchtest`, 'Doe', {
                inKeys: {
                    keys: ['doc:3']
                }
            });
            (0, chai_1.expect)(res).to.equal(0, 'Total number of returining document of FT.SEARCH command');
        }));
        it('Search tests with filter', () => __awaiter(this, void 0, void 0, function* () {
            let res = yield redis.search_module_search(`${index}-searchtest`, '*', {
                filter: [{
                        field: 'age',
                        min: 0,
                        max: 35
                    }]
            });
            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
            res = yield redis.search_module_search(`${index}-searchtest`, '*', {
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
            });
            (0, chai_1.expect)(res[0]).to.equal(1, 'Total number of returining document of FT.SEARCH command');
        }));
        it('Search tests with return', () => __awaiter(this, void 0, void 0, function* () {
            let res = yield redis.search_module_search(`${index}-searchtest`, '*', {
                return: {
                    fields: [{
                            field: 'age',
                        }]
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(Object.keys(res[1]).length).to.equal(2, 'Total number of returned key-values');
            (0, chai_1.expect)(Object.keys(res[1]).includes('age')).to.equal(true, 'Age must be returned');
            (0, chai_1.expect)(Object.keys(res[1]).includes('salary')).to.equal(false, 'Salary must not be returned');
            (0, chai_1.expect)(Object.keys(res[1]).includes('name')).to.equal(false, 'Name must not be returned');
            (0, chai_1.expect)(Object.keys(res[2]).length).to.equal(2, 'Total number of returned key-values');
            (0, chai_1.expect)(Object.keys(res[3]).length).to.equal(2, 'Total number of returned key-values');
            res = yield redis.search_module_search(`${index}-searchtest`, 'Sarah', {
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
            });
            (0, chai_1.expect)(res[0]).to.equal(1, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(Object.keys(res[1]).includes('age')).to.equal(true, 'Age must be returned');
            (0, chai_1.expect)(Object.keys(res[1]).includes('salary')).to.equal(true, 'Salary must be returned');
            (0, chai_1.expect)(Object.keys(res[1]).includes('name')).to.equal(false, 'Name must not be returned');
            res = (yield redis.search_module_search(`${index}-searchtest`, '*', {
                return: { fields: [] }
            }));
            (0, chai_1.expect)(res.length).to.equal(4, 'Only keys should be returned (+count of them)');
        }));
        it('Search test with summarize', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield redis.search_module_search(`${index}-searchtest`, 'De*', {
                //! specifying fields in summarize while return is also specified will cause redis (edge version) to crash
                //! Crash in redis image fabe0b38e273
                // return: ['introduction'],
                summarize: {
                    fields: { fields: ['introduction'] },
                    frags: 1,
                    len: 3,
                    separator: ' !?!'
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(res[1].introduction.endsWith('!?!')).to.equal(true, 'Custom summarize separator');
            (0, chai_1.expect)(res[1].introduction.endsWith('!?!')).to.equal(true, 'Custom summarize separator');
        }));
        it('Search tests with highlight', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield redis.search_module_search(`${index}-searchtest`, 'Do*|De*', {
                highlight: {
                    fields: { fields: ['introduction'] },
                    tags: {
                        open: '**',
                        close: '**'
                    }
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(2, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(res[1].name.includes('**')).to.equal(false, 'Name mustn\'t be highlighted');
            (0, chai_1.expect)(res[1].introduction.includes('**developer**')).to.equal(true, 'Introduction must be highlighted');
        }));
        it('Search test with sortby ', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield redis.search_module_search(`${index}-searchtest`, '*', {
                return: { fields: [{ field: 'age' }] },
                sortBy: {
                    field: 'age',
                    sort: 'ASC'
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(res[1].age).to.equal('25', 'Ages should be returned in ascending order');
            (0, chai_1.expect)(res[2].age).to.equal('30', 'Ages should be returned in ascending order');
            (0, chai_1.expect)(res[3].age).to.equal('80', 'Ages should be returned in ascending order');
        }));
        it('Search test with limit', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield redis.search_module_search(`${index}-searchtest`, '*', {
                limit: {
                    first: 0,
                    num: 1
                }
            });
            (0, chai_1.expect)(res[0]).to.equal(3, 'Total number of returining document of FT.SEARCH command');
            (0, chai_1.expect)(res.length).to.equal(2, 'Only one item should be returned');
        }));
        it('aggregate function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_aggregate(index, query);
            (0, chai_1.expect)(response.numberOfItems).to.equal(0, 'The response of the FT.AGGREGATE command');
        }));
        it('aggregate function response', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_create(`${index}-aggreagtetest`, 'HASH', [{
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
            });
            const time = new Date();
            yield redis.redis.hset('person:1', { name: 'John Doe', city: 'London', gender: 'male', timestamp: (time.getTime() / 1000).toFixed(0) });
            yield redis.redis.hset('person:2', { name: 'Jane Doe', city: 'London', gender: 'female', timestamp: (time.getTime() / 1000).toFixed(0) });
            time.setHours(time.getHours() - 3);
            yield redis.redis.hset('person:3', { name: 'Sarah Brown', city: 'New York', gender: 'female', timestamp: (time.getTime() / 1000).toFixed(0) });
            yield redis.redis.hset('person:3', { name: 'Michael Doe', city: 'New York', gender: 'male', timestamp: (time.getTime() / 1000).toFixed(0) });
            let response = yield redis.search_module_aggregate(`${index}-aggreagtetest`, 'Doe', {
                groupby: { properties: ['@city'], nargs: '1' }
            });
            (0, chai_1.expect)(response.numberOfItems).to.equal(2, 'Total number of the FT.AGGREGATE command result');
            (0, chai_1.expect)(response.items[0].name).to.equal('city', 'Aggreagated prop of the FT.AGGREGATE command result');
            response = yield redis.search_module_aggregate(`${index}-aggreagtetest`, '*', {
                apply: [{ expression: 'hour(@timestamp)', as: 'hour' }],
                groupby: { properties: ['@hour'], nargs: '1' }
            });
            (0, chai_1.expect)(response.numberOfItems).to.equal(2, 'Total number of the FT.AGGREGATE command result');
            (0, chai_1.expect)(response.items[0].name).to.equal('hour', 'Aggreagated apply prop of the FT.AGGREGATE command result');
            yield redis.search_module_dropindex(`${index}-aggreagtetest`);
        }));
        it('explain function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_explain(index, query);
            (0, chai_1.expect)(response).to.contain('@NULL:UNION', 'The response of the FT.EXPLAIN command');
        }));
        it('explainCLI function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_explainCLI(index, query);
            (0, chai_1.expect)(response).to.equal('@NULL:UNION {  @NULL:name  @NULL:+name(expanded)}', 'The response of the FT.EXPLAINCLI command');
        }));
        it('alter function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_alter(index, 'tags', 'TAG');
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALTER command');
        }));
        it('aliasadd function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_aliasadd(alias, index);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASADD command');
        }));
        it('aliasupdate function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_aliasupdate(alias, index);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASUPDATE command');
        }));
        it('aliasdel function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_aliasdel(alias);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.ALIASDEL command');
        }));
        it('sugadd function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_sugadd(sug.key, sug.string, sug.score);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGADD command');
        }));
        it('sugget function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_sugget(sug.key, sug.string);
            (0, chai_1.expect)(response).to.equal('str', 'The response of the FT.SUGGET command');
        }));
        it('suglen function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_suglen(sug.key);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGLEN command');
        }));
        it('sugdel function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_sugdel(sug.key, sug.string);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.SUGDEL command');
        }));
        it('tagvalgs function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_tagvals(index, 'tags');
            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the FT.TAGVALS command');
        }));
        it('synupdate function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_synupdate(index, 0, ['term1']);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.SYNUPDATE command');
        }));
        it('syndump function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_syndump(index);
            (0, chai_1.expect)(response.term1).to.equal('0', 'The response of the FT.SYNDUMP command');
        }));
        it('spellcheck function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_create(`${index}-spellcheck`, 'HASH', [{
                    name: "content",
                    type: "TEXT",
                }], {
                prefix: { prefixes: 'colors:' }
            });
            yield redis.redis.hset('colors:1', { content: 'red green blue yellow mellon' });
            let response = yield redis.search_module_spellcheck(`${index}-spellcheck`, "redis");
            (0, chai_1.expect)(response[0].suggestions.length).to.equal(0, 'No suggestion should be found');
            response = yield redis.search_module_spellcheck(`${index}-spellcheck`, "mellow blua");
            (0, chai_1.expect)(response.length).to.equal(2, 'Both word should be spellchecked');
        }));
        it('dictadd function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_dictadd(dict.name, [dict.term]);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.DICTADD command');
        }));
        it('dictdel function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_dictadd(dict.name, [dict.term]);
            const response = yield redis.search_module_dictdel(dict.name, [dict.term]);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the FT.DICDEL command');
        }));
        it('dictdump function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_dictadd(`${dict.name}1`, [`${dict.term}1`]);
            const response = yield redis.search_module_dictdump(`${dict.name}1`);
            (0, chai_1.expect)(response).to.equal('termY1', 'The response of the FT.DICTDUMP command');
            yield redis.search_module_dictdel(`${dict.name}1`, [`${dict.term}1`]);
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_info(index);
            (0, chai_1.expect)(response.index_name).to.equal(index, 'The index name');
        }));
        it('config function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.search_module_config('GET', '*');
            (0, chai_1.expect)(response.EXTLOAD).to.equal(null, 'The EXTLOAD value');
        }));
        it('dropindex function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.search_module_create(`${index}-droptest`, 'HASH', [{
                    name: 'name',
                    type: 'TEXT'
                }]);
            const response = yield redis.search_module_dropindex(`${index}-droptest`);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the FT.DROPINDEX command');
        }));
        it('Testing the parse of search function as JSON', () => __awaiter(this, void 0, void 0, function* () {
            const json = fs.readFileSync('tests/data/models/sample1.json', { encoding: 'utf-8' });
            const parsedJSON = JSON.parse(json);
            yield redis.search_module_create('li-index', 'JSON', [{
                    name: '$.title',
                    type: 'TEXT',
                }, {
                    name: '$.description',
                    type: 'TEXT',
                }]);
            yield Promise.all(parsedJSON.map((p) => __awaiter(this, void 0, void 0, function* () { return yield redis.rejson_module_set(`li:${p.id}`, '$', JSON.stringify(p)); })));
            const result = yield redis.search_module_search('li-index', 'KAS', { limit: { first: 0, num: 20 }, withScores: true });
            const { resultsCount } = result;
            (0, chai_1.expect)(resultsCount).to.equal(1, 'The count of the results');
        }));
    });
});
