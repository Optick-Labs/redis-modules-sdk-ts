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
const key1 = 'key1';
const key2 = 'key2';
const key3 = 'arrkey';
const path = '.';
describe('ReJSON Module testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        before(() => __awaiter(this, void 0, void 0, function* () {
            redis = new redis_modules_1.RedisModules({
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port)
            }, { showDebugLogs: true });
            yield redis.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            yield redis.disconnect();
        }));
        it('set function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.rejson_module_set(key1, path, '{"x": 1, "str": "yy"}');
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
            response = yield redis.rejson_module_set(key2, path, '{"x": 3}');
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
            response = yield redis.rejson_module_set(key3, path, '{"items": [1]}');
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the set command');
        }));
        it('get function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.rejson_module_get(key1, path);
            (0, chai_1.expect)(response).to.equal('{"x":1,"str":"yy"}', 'The response of the get command');
            response = yield redis.rejson_module_get(key1, '$..x');
            (0, chai_1.expect)(response).to.equal('[1]', 'The value of the X key');
        }));
        it('mget function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_mget([key1, key2], path);
            (0, chai_1.expect)(response).to.contain('{"x":1,"str":"yy"}', 'The response of the mget command');
            (0, chai_1.expect)(response).to.contain('{"x":3}', 'The response of the mget command');
        }));
        it('type function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_type(key1, path);
            (0, chai_1.expect)(response).to.equal('object', 'The response of the type command');
        }));
        it('numincrby function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_numincrby(key1, 2, '.x');
            (0, chai_1.expect)(response).to.equal('3', 'The response of the numincrby command');
        }));
        it('nummultby function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_nummultby(key1, 3, '.x');
            (0, chai_1.expect)(response).to.equal('9', 'The response of the nummultby command');
        }));
        it('strappend function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_strappend(key1, '"rrr"', '.str');
            (0, chai_1.expect)(response).to.equal(5, 'The response of the strappend command');
            const string = yield redis.rejson_module_get(key1, '.str');
            (0, chai_1.expect)(string).to.equal('"yyrrr"', 'The response of the get command');
        }));
        it('strlen function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_strlen(key1, '.str');
            (0, chai_1.expect)(response).to.equal(5, 'The response of the strlen command');
        }));
        it('arrappend function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrappend(key3, ['3', '5', '4', '2'], '.items');
            (0, chai_1.expect)(response).to.equal(5, 'The response of the arrappend command');
        }));
        it('arrindex function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrindex(key3, '1', '.items');
            (0, chai_1.expect)(response).to.equal(0, 'The response of the arrindex command');
        }));
        it('arrinsert function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrinsert(key3, 1, '{"z": 5}', '.items');
            (0, chai_1.expect)(response).to.equal(6, 'The response of the arrinsert command');
        }));
        it('arrlen function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrlen(key3, '.items');
            (0, chai_1.expect)(response).to.equal(6, 'The response of the arrlen command');
        }));
        it('arrpop function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrpop(key3, 0, '.items');
            (0, chai_1.expect)(response).to.equal('1', 'The response of the arrpop command');
        }));
        it('arrtrim function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_arrtrim(key3, 0, 1, '.items');
            (0, chai_1.expect)(response).to.equal(2, 'The response of the arrtrim command');
        }));
        it('objkeys function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_objkeys(key1, path);
            (0, chai_1.expect)(response.toString()).to.equal('x,str', 'The response of the objkeys command');
        }));
        it('objlen function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_objlen(key1, path);
            (0, chai_1.expect)(response).to.equal(2, 'The response of the objlen command');
        }));
        it('debug function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_debug('MEMORY', key1, path);
            (0, chai_1.expect)(response).to.be.greaterThan(0, 'The response of the debug command');
        }));
        it('forget function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_forget(key2, path);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the forget command');
        }));
        it('resp function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_resp(key1, path);
            (0, chai_1.expect)(response.toString()).to.equal('{,x,9,str,yyrrr', 'The response of the resp command');
        }));
        it('toggle function', () => __awaiter(this, void 0, void 0, function* () {
            const key = 'toggle';
            const path = '.x';
            yield redis.rejson_module_set(key, '.', '{"x": false, "str": "yy"}');
            const response = yield redis.rejson_module_toggle(key, path);
            (0, chai_1.expect)(response).to.equal('true', 'The response of JSON.TOGGLE');
        }));
        it('clear function', () => __awaiter(this, void 0, void 0, function* () {
            const key = 'clear';
            const path = '.';
            yield redis.rejson_module_set(key, path, '{"x": 1, "str": "yy"}');
            const response = yield redis.rejson_module_clear(key, path);
            (0, chai_1.expect)(response).to.equal(1, 'The response of JSON.CLEAR');
        }));
        it('del function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rejson_module_del(key1, path);
            (0, chai_1.expect)(response).to.equal(1, 'The response of the del command');
        }));
    });
});
