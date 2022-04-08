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
const key1 = 'key1cmk';
const key2 = 'key1cmk2';
describe('RedisBloom Count-Min-Sketch filter testing', function () {
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
        it('initbydim function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.bloom_cmk_module_initbydim('dest', 1, 2);
            chai_1.expect(response).to.equal('OK', 'The response of CMS.INITBYDIM command');
            response = yield redis.bloom_cmk_module_initbydim(key1, 1, 2);
            chai_1.expect(response).to.equal('OK', 'The response of CMS.INITBYDIM command');
        }));
        it('initbyprob function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_cmk_module_initbyprob(key2, 0.001, 0.01);
            chai_1.expect(response).to.equal('OK', 'The response of CMS.INITBYPROB command');
        }));
        it('incrby function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_cmk_module_incrby(key1, [{
                    name: 'foo',
                    increment: 10
                }]);
            chai_1.expect(response[0]).to.equal(10, 'The response of CMS.INCRBY command');
        }));
        it('query function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_cmk_module_query(key1, ['foo']);
            chai_1.expect(response[0]).to.equal(10, 'The response of CMS.QUERY command');
        }));
        it('merge function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_cmk_module_merge('dest', 1, [key1]);
            chai_1.expect(response).to.equal('OK', 'The response of CMS.MERGE command');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.bloom_cmk_module_info(key1);
            chai_1.expect(response[1]).to.equal(1, 'The width of the key');
            chai_1.expect(response[3]).to.equal(2, 'The depth of the key');
            chai_1.expect(response[5]).to.equal(10, 'The count of the key');
        }));
    });
});
