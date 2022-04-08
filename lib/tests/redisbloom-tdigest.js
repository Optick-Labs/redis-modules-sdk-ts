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
const key1 = 'mykey1';
const key2 = 'mykey2';
describe('RedisBloom TDigest filter testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        it('create function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.bloom_tdigest_module_create(key1, 100);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.CREATE\' command');
            response = yield redis.bloom_tdigest_module_create(key2, 100);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.CREATE\' command');
        }));
        it('reset function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_reset(key1);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.RESET\' command');
        }));
        it('add function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_add(key1, [{
                    value: 1500.0,
                    weight: 1.0
                }]);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.ADD\' command');
        }));
        it('merge function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_merge(key1, key2);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of \'TDIGEST.MERGE\' command');
        }));
        it('max function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_max(key1);
            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.MAX\' command');
        }));
        it('min function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_min(key1);
            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.MIN\' command');
        }));
        it('quantile function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_quantile(key1, 0.5);
            (0, chai_1.expect)(response).to.eql('1500', 'The response of \'TDIGEST.QUANTILE\' command');
        }));
        it('cdf function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_cdf(key1, 10);
            (0, chai_1.expect)(response).to.eql('0', 'The response of \'TDIGEST.CDF\' command');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_tdigest_module_info(key1);
            (0, chai_1.expect)(response.Compression).to.eql(100, 'The compression');
            (0, chai_1.expect)(response.Capacity).to.eql(610, 'The capacity');
            (0, chai_1.expect)(response['Merged nodes']).to.eql(1, 'The merged nodes');
            (0, chai_1.expect)(response['Unmerged nodes']).to.eql(0, 'The unmerged nodes');
            (0, chai_1.expect)(response['Merged weight']).to.eql('1', 'The merged weight');
            (0, chai_1.expect)(response['Unmerged weight']).to.eql('0', 'The unmerged weight');
            (0, chai_1.expect)(response['Total compressions']).to.eql(1, 'The total compressions');
        }));
    });
});
