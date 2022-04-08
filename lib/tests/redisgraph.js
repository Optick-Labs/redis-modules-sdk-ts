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
Object.defineProperty(exports, "__esModule", { value: true });
const cli_argument_parser_1 = require("cli-argument-parser");
const chai_1 = require("chai");
const redis_modules_1 = require("../modules/redis-modules");
let redis;
const graphName = 'Test';
describe('RedisGraph Module testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.timeout(10 * 60 * 60);
        before(() => __awaiter(this, void 0, void 0, function* () {
            redis = new redis_modules_1.RedisModules({
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port),
            });
            yield redis.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            yield redis.disconnect();
        }));
        it('query function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.graph_module_query(graphName, 'CREATE (p:Person {name: \'Kurt\', age: 27}) RETURN p');
            (0, chai_1.expect)(response[2].find(item => item === 'Labels added: 1')).to.not.equal(undefined, 'The value of Labels added');
            (0, chai_1.expect)(response[2].find(item => item === 'Nodes created: 1')).to.not.equal(undefined, 'The value of Nodes created');
            (0, chai_1.expect)(response[2].find(item => item === 'Properties set: 2')).to.not.equal(undefined, 'The value of Properties set');
            (0, chai_1.expect)(response[2].find(item => item === 'Cached execution: 0')).to.not.equal(undefined, 'The value of Cached execution');
            response = yield redis.graph_module_query(graphName, `MATCH (p:Person) WHERE p.name=$name RETURN count(p) as count`, { name: 'Kurt' });
            (0, chai_1.expect)(response[2].find(item => item === 'Cached execution: 0')).to.not.equal(undefined, 'The response of the GRAPH.QUERY command');
        }));
        it('readonlyQuery function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.graph_module_readonlyQuery(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p');
            (0, chai_1.expect)(response[2][0]).to.equal('Cached execution: 0', 'The response of the GRAPH.RO_QUERY command');
            response = yield redis.graph_module_readonlyQuery(graphName, 'MATCH (p:Person) WHERE p.age > $age RETURN p', { age: '80' });
            (0, chai_1.expect)(response[2][0]).to.equal('Cached execution: 0', 'The response of the GRAPH.RO_QUERY command');
        }));
        it('profile function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.graph_module_profile(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p');
            (0, chai_1.expect)(response[0]).to.contain('Results | Records produced: 0', 'The response of the GRAPH.QUERY command');
        }));
        it('explain function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.graph_module_explain(graphName, 'MATCH (p:Person) WHERE p.age > 80 RETURN p');
            (0, chai_1.expect)(response[0]).to.equal('Results', 'The response of the GRAPH.EXPLAIN command');
            (0, chai_1.expect)(response[1]).to.contain('Project', 'The response of the GRAPH.EXPLAIN command');
            (0, chai_1.expect)(response[2]).to.contain('Filter', 'The response of the GRAPH.EXPLAIN command');
            (0, chai_1.expect)(response[3]).to.contain('Node By Label Scan | (p:Person)', 'The response of the GRAPH.EXPLAIN command');
        }));
        it.skip('slowlog function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.graph_module_slowlog(1);
            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the GRAPH.SLOWLOG command');
        }));
        it('delete function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.graph_module_delete(graphName);
            (0, chai_1.expect)(response).to.contain('Graph removed', 'The response of the GRAPH.DELETE command');
        }));
        it('config function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.graph_module_config('SET', 'RESULTSET_SIZE', '1000');
            (0, chai_1.expect)(response).to.eql('OK', 'The RESULT SET SIZE');
            let response2 = yield redis.graph_module_config('GET', 'RESULTSET_SIZE');
            (0, chai_1.expect)(response2.RESULTSET_SIZE).to.eql(1000, 'The RESULT SET SIZE');
            response2 = (yield redis.graph_module_config('GET', '*'));
            (0, chai_1.expect)(response2.CACHE_SIZE).to.eql(25, 'The CACHE_SIZE of the module');
        }));
    });
});
