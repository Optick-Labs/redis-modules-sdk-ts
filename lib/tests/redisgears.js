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
let executionId1;
let executionId2;
let executionId3;
describe('RedisGears Module testing', function () {
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
        it('pyexecute function', () => __awaiter(this, void 0, void 0, function* () {
            executionId1 = yield redis.gears_module_pyexecute('GB().run()', {
                unblocking: true
            });
            (0, chai_1.expect)(executionId1).to.equal('0000000000000000000000000000000000000000-0', 'The execution id');
            console.log(`Execution ID: ${executionId1}`);
            executionId2 = yield redis.gears_module_pyexecute('GB().run()', {
                unblocking: true
            });
            console.log(`Execution ID: ${executionId2}`);
            (0, chai_1.expect)(executionId2).to.equal('0000000000000000000000000000000000000000-1', 'The execution id');
            executionId3 = yield redis.gears_module_pyexecute('GB().run()', {
                unblocking: true
            });
            console.log(`Execution ID: ${executionId3}`);
            (0, chai_1.expect)(executionId3).to.equal('0000000000000000000000000000000000000000-2', 'The execution id');
        }));
        it('configSet function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_configSet([['ProfileExecutions', '1']]);
            (0, chai_1.expect)(response.length).to.equal(0, 'The response count of the \'RG.CONFIGSET\' Command');
        }));
        it('configGet function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_configGet(['ProfileExecutions']);
            (0, chai_1.expect)(response[0]).to.equal(0, 'The response count of the \'RG.CONFIGGET\' Command');
        }));
        it('getExecution function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_getExecution(executionId1);
            (0, chai_1.expect)(response[0][3][1]).to.equal('done', 'The response count of the \'RG.GETEXECUTION\' Command');
        }));
        it('dumpExecutions function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_dumpExecutions();
            (0, chai_1.expect)(response[1][1]).to.equal(executionId1, 'The execution id');
            (0, chai_1.expect)(response[0][1]).to.equal(executionId2, 'The execution id');
        }));
        it('dumpRegistrations function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_dumpRegistrations();
            (0, chai_1.expect)(response.length).to.equal(0, 'The response count of the \'RG.DUMPREGISTRATIONS\' Command');
        }));
        it('getResults function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_getResults(executionId1);
            (0, chai_1.expect)(response.length).to.equal(2, 'The response count of the \'RG.GETRESULTS\' Command');
        }));
        it('getResultsBlocking function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_getResultsBlocking(executionId1);
            (0, chai_1.expect)(response.length).to.equal(2, 'The response count of the \'RG.GETRESULTSBLOCKING\' Command');
        }));
        it('infocluster function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_infocluster();
            (0, chai_1.expect)(response).to.equal('no cluster mode', 'The response of the \'RG.INFOCLUSTER\' Command');
        }));
        it('pystats function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_pystats();
            (0, chai_1.expect)(response[0]).to.equal('TotalAllocated', 'The response of the \'RG.PYSTATS\' Command');
        }));
        it('pydumpreqs function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_pydumpreqs();
            (0, chai_1.expect)(response.length).to.equal(0, 'The response of the \'RG.PYDUMPREQS\' Command');
        }));
        it('refreshCluster function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_refreshCluster();
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.REFRESHCLUSTER\' Command');
        }));
        it('trigger function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.gears_module_pyexecute("GB('CommandReader').register(trigger='mytrigger')", {
                unblocking: true
            });
            const response = yield redis.gears_module_trigger('mytrigger', ['foo', 'bar']);
            (0, chai_1.expect)(response[0]).to.equal('[\'mytrigger\', \'foo\', \'bar\']', 'The response of the \'RG.TRIGGER\' Command');
        }));
        it('dropExecution function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_dropExecution(executionId1);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.DROPEXECUTION\' Command');
        }));
        it('abortExecution function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.gears_module_abortExecution(executionId2);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.ABORTEXECUTION\' Command');
        }));
        it('unregister function', () => __awaiter(this, void 0, void 0, function* () {
            const registrationId = `${executionId3.split('-')[0]}-${parseInt(executionId3.split('-')[1]) + 1}`;
            const response = yield redis.gears_module_unregister(registrationId);
            (0, chai_1.expect)(response).to.equal('OK', 'The response of the \'RG.UNREGISTER\' command');
        }));
    });
});
