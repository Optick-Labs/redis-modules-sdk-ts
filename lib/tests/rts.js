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
const date = new Date(2019, 11, 24, 19).getTime();
const key1 = 'key:2:32';
const key2 = 'key:2:33';
describe('RTS Module testing', function () {
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
            let response = yield redis.rts_module_create(key1, {
                labels: [{
                        name: 'label',
                        value: 'value'
                    }]
            });
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the create command');
            response = yield redis.rts_module_create(key2, {
                labels: [{
                        name: 'label1',
                        value: 'value1'
                    }]
            });
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the create command');
        }));
        it('alter function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_alter(key1, 1);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the alter command');
        }));
        it('add function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_add(key1, `${date}`, '26', { onDuplicate: 'SUM' });
            (0, chai_1.expect)(response).to.equal(date, 'The response of the add command');
        }));
        it('madd function', () => __awaiter(this, void 0, void 0, function* () {
            const info = yield redis.rts_module_info(key1);
            const response = yield redis.rts_module_madd([{
                    key: key1,
                    timestamp: info.firstTimestamp.toString(),
                    value: '32'
                }]);
            (0, chai_1.expect)(response.length).to.equal(1, 'The response of the madd command');
        }));
        it('incrby function', () => __awaiter(this, void 0, void 0, function* () {
            const currentValue = parseInt((yield redis.rts_module_get(key1))[1].toString());
            yield redis.rts_module_incrby(key1, '1');
            const newValue = parseInt((yield redis.rts_module_get(key1))[1].toString());
            (0, chai_1.expect)(newValue).to.be.above(currentValue, 'The response of the incrby command');
        }));
        it('decrby function', () => __awaiter(this, void 0, void 0, function* () {
            const currentValue = parseInt((yield redis.rts_module_get(key1))[1].toString());
            yield redis.rts_module_decrby(key1, '1');
            const newValue = parseInt((yield redis.rts_module_get(key1))[1].toString());
            (0, chai_1.expect)(currentValue).to.be.above(newValue, 'The response of the decrby command');
        }));
        it('createrule function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_createrule({
                sourceKey: key1,
                destKey: key2,
                aggregation: 'avg',
                timeBucket: 1
            });
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the createrule command');
        }));
        it('deleterule function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_deleterule(key1, key2);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the deleterule command');
        }));
        it('range function', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield redis.rts_module_get(key1);
            let response = yield redis.rts_module_range(key1, data[0].toString(), data[1].toString());
            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
            response = yield redis.rts_module_range(key1, `${data[0]}`, `${data[1]}`, {
                align: 'start',
                aggregation: {
                    type: 'count',
                    timeBucket: 10
                }
            });
            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
        }));
        it('revrange function', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield redis.rts_module_get(key1);
            let response = yield redis.rts_module_revrange(key1, data[0].toString(), data[1].toString());
            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
            response = yield redis.rts_module_revrange(key1, `${data[0]}`, `${data[1]}`, {
                align: 'start',
                aggregation: {
                    type: 'count',
                    timeBucket: 10
                }
            });
            (0, chai_1.expect)(response.length).to.equal(0, 'The range items length of the response');
        }));
        it('mrange function', () => __awaiter(this, void 0, void 0, function* () {
            const info = yield redis.rts_module_info(key1);
            const fromTimestamp = (info.firstTimestamp - 1);
            const toTimestamp = (info.lastTimestamp + 10000);
            const key = 'key:2:32';
            const filter = 'label=value';
            let response = yield redis.rts_module_mrange(`${fromTimestamp}`, `${toTimestamp}`, filter);
            (0, chai_1.expect)(response[0][0]).to.equal(key, 'The filtered key name');
            response = yield redis.rts_module_mrange(`${fromTimestamp}`, `${toTimestamp}`, filter, {
                groupBy: {
                    label: 'label',
                    reducer: 'MAX'
                },
                withLabels: true
            });
            (0, chai_1.expect)(response[0][0]).to.equal(filter, 'The value of the filter');
            (0, chai_1.expect)(response[0][1][0][0]).to.equal('label', 'The name of the label');
            (0, chai_1.expect)(response[0][1][0][1]).to.equal('value', 'The value of the label value');
            (0, chai_1.expect)(response[0][1][1][0]).to.equal('__reducer__', 'The key of the reducer');
            (0, chai_1.expect)(response[0][1][1][1]).to.equal('max', 'The value of the reducer');
            (0, chai_1.expect)(response[0][1][2][0]).to.equal('__source__', 'The key of the source');
            (0, chai_1.expect)(response[0][1][2][1]).to.equal(key, 'The value of the source');
        }));
        it('mrevrange function', () => __awaiter(this, void 0, void 0, function* () {
            const info = yield redis.rts_module_info(key1);
            let response = yield redis.rts_module_mrevrange((info.firstTimestamp - 1).toString(), (info.lastTimestamp + 10000).toString(), 'label=value');
            (0, chai_1.expect)(response[0][0]).to.equal('key:2:32', 'The filtered key name');
            response = yield redis.rts_module_mrevrange(`${info.firstTimestamp - 1}`, `${info.lastTimestamp + 10000}`, 'label=value', {
                align: '+',
                aggregation: {
                    type: 'count',
                    timeBucket: 10
                }
            });
            (0, chai_1.expect)(response[0][0]).to.equal('key:2:32', 'The filtered key name');
        }));
        it('get function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_get(key1);
            (0, chai_1.expect)(response.length).to.equal(2, 'The response of the get command');
        }));
        it('mget function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.rts_module_mget('label=value');
            (0, chai_1.expect)(response.length).to.equal(1, 'The response of the mget command');
            response = yield redis.rts_module_mget('label=value label1=value1');
            console.log(response);
            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the mget command');
            response = yield redis.rts_module_mget('label=value x=(a,b,c)');
            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the mget command');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_info(key1);
            (0, chai_1.expect)(response.totalSamples).to.be.greaterThan(0, 'The total samples of the key');
        }));
        it('queryindex function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.rts_module_queryindex('label=value');
            (0, chai_1.expect)(response.length).eql(1, 'The response of the queryindex command');
        }));
        it('del function', () => __awaiter(this, void 0, void 0, function* () {
            const samplesCount = yield redis.rts_module_del(key1, date.toString(), new Date().getTime().toString());
            (0, chai_1.expect)(samplesCount).eql(3, 'The response TS.DEL command');
        }));
    });
});
