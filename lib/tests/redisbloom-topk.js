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
const key1 = 'key1topk';
describe('RedisBloom Top-K filter testing', function () {
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
        it('reserve function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_reserve(key1, 10, 2, 3, 0.1);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the TOPK.RESERVE command');
        }));
        it('add function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_add(key1, ['bar', 42]);
            (0, chai_1.expect)(response[0]).to.equal(null, 'The response of the TOPK.ADD command');
        }));
        it('incrby function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_incrby(key1, [{
                    name: 42,
                    increment: 1
                }]);
            (0, chai_1.expect)(response[0]).to.equal(null, 'The response of the TOPK.INCRBY command');
        }));
        it('query function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_query(key1, [42, 'nonexist']);
            (0, chai_1.expect)(response[0]).to.equal(1, 'The query response of key 42');
            (0, chai_1.expect)(response[1]).to.equal(0, 'The query response of key nonexist');
        }));
        it('count function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_count(key1, ['foo', 42, 'nonexist']);
            (0, chai_1.expect)(response[0]).to.equal(0, 'The response of the TOPK.COUNT command');
            (0, chai_1.expect)(response[1]).to.equal(2, 'The response of the TOPK.COUNT command');
            (0, chai_1.expect)(response[2]).to.equal(0, 'The response of the TOPK.COUNT command');
        }));
        it('list function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_list(key1);
            (0, chai_1.expect)(response[0]).to.equal('42', 'The response of the TOPK.LIST command');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_topk_module_info(key1);
            (0, chai_1.expect)(response.length).to.equal(8, 'The length of items in the response');
        }));
    });
});
