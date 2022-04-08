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
const key1 = 'key1bloom';
const key2 = '1';
const item1 = 'item1';
const chunks = [];
describe('RedisBloom Module testing', function () {
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
            const response = yield redis.bloom_module_reserve(key2, 0.01, 100);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'BF.RESERVE\' command');
        }));
        it('add function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_add(key1, item1);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the \'BF.ADD\' command');
        }));
        it('madd function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_madd(key1, [item1]);
            (0, chai_1.expect)(response[0]).to.equal(0, 'The response of the \'BF.MADD\' command');
        }));
        it('insert function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_insert(key1, [item1]);
            (0, chai_1.expect)(response[0]).to.equal(0, 'The response of the \'BF.INSERT\' command');
        }));
        it('exists function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_exists(key1, item1);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the \'BF.EXISTS\' command');
        }));
        it('mexists function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_mexists(key1, [item1]);
            (0, chai_1.expect)(response[0]).to.equal(1, 'The response of the \'BF.MEXISTS\' command');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_module_info(key1);
            (0, chai_1.expect)(response[0]).to.equal('Capacity', 'The first item of the information');
            (0, chai_1.expect)(response[1]).to.equal(100, 'The value of the \'Capacity\' item');
        }));
        it('scandump function', () => __awaiter(this, void 0, void 0, function* () {
            let iter = 0;
            let response = yield redis.bloom_module_scandump(key2, iter);
            let data = response[1];
            chunks.push({ iterator: iter, data: data });
            iter = parseInt(response[0]);
            while (iter != 0) {
                response = yield redis.bloom_module_scandump(key2, iter);
                iter = parseInt(response[0]);
                data = response[1];
                chunks.push({ iterator: iter, data: data });
            }
            (0, chai_1.expect)(chunks.length).gt(0, `The count of chunks of key ${key2}`);
        }));
        it('loadchunk function', () => __awaiter(this, void 0, void 0, function* () {
            const chunk = chunks[1];
            const res = yield redis.bloom_module_loadchunk(key2, chunk.iterator, chunk.data);
            (0, chai_1.expect)(res).to.equal('OK', `The response of load chunk with iterator ${chunk.iterator}`);
        }));
    });
});
