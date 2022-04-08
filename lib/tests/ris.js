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
describe('RedisIntervalSets Module testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        before(() => __awaiter(this, void 0, void 0, function* () {
            redis = new redis_modules_1.RedisModules({
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port),
            }, { showDebugLogs: true });
            yield redis.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            yield redis.disconnect();
        }));
        it('add function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ris_module_add('ages', [{
                    name: 'parents',
                    minimum: 20,
                    maximum: 100
                }, {
                    name: 'kids',
                    minimum: 0,
                    maximum: 100
                }]);
            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.add\' command');
        }));
        it('get function', () => __awaiter(this, void 0, void 0, function* () {
            let sets = yield redis.ris_module_get('ages');
            (0, chai_1.expect)(sets.length).to.eql(2, 'The number of sets');
            sets = yield redis.ris_module_get('ages', 'kids');
            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
            (0, chai_1.expect)(sets[0].minimum).to.eql(0, 'The minimum score of set');
            (0, chai_1.expect)(sets[0].maximum).to.eql(100, 'The maximum score of set');
        }));
        it('score function', () => __awaiter(this, void 0, void 0, function* () {
            let sets = yield redis.ris_module_score('ages', 5);
            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
            (0, chai_1.expect)(sets[0]).to.eql('kids', 'The name of the set');
            sets = yield redis.ris_module_score('ages', 5);
            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
            (0, chai_1.expect)(sets[0]).to.eql('kids', 'The name of the set');
        }));
        it('notScore function', () => __awaiter(this, void 0, void 0, function* () {
            let sets = yield redis.ris_module_notScore('ages', 5);
            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
            (0, chai_1.expect)(sets[0]).to.eql('parents', 'The name of the set');
            sets = yield redis.ris_module_notScore('ages', 5);
            (0, chai_1.expect)(sets.length).to.eql(1, 'The number of sets');
            (0, chai_1.expect)(sets[0]).to.eql('parents', 'The name of the set');
        }));
        it('del function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.ris_module_del('ages', ['kids']);
            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.del\' command');
            const sets = yield redis.ris_module_get('ages');
            (0, chai_1.expect)(sets.length).to.eql(1, 'The sets count');
            response = yield redis.ris_module_del('ages');
            (0, chai_1.expect)(response).to.eql('OK', 'The response of the \'iset.del\' command');
        }));
    });
});
