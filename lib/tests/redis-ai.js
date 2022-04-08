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
const fs = __importStar(require("fs"));
const redis_modules_1 = require("../modules/redis-modules");
let redis;
describe('AI testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        before(() => __awaiter(this, void 0, void 0, function* () {
            const clientOptions = {
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port)
            };
            redis = new redis_modules_1.RedisModules(clientOptions);
            yield redis.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            yield redis.disconnect();
        }));
        it('tensorset function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.ai_module_tensorset('values-key', 'FLOAT', [2, 2], [1, 2, 3, 4]);
            (0, chai_1.expect)(response).to.eql('OK', 'The response of tensorset');
            response = yield redis.ai_module_tensorset('blob-key', 'FLOAT', [1], [Buffer.from('1.11111')]);
            (0, chai_1.expect)(response).to.eql('OK', 'The response of tensorset');
        }));
        it('tensorget function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.ai_module_tensorget('values-key', 'VALUES', true);
            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
            response = (yield redis.ai_module_tensorget('blob-key', 'BLOB', true));
            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
            response = (yield redis.ai_module_tensorget('blob-key', 'BLOB', true));
            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
        }));
        it('modelstore function', () => __awaiter(this, void 0, void 0, function* () {
            const file = fs.readFileSync('./tests/data/models/model1.onnx');
            const response = yield redis.ai_module_modelstore('blob-model', 'ONNX', 'CPU', file);
            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelset');
        }));
        it('modelget function', () => __awaiter(this, void 0, void 0, function* () {
            const modelName = 'blob-model';
            const response = yield redis.ai_module_modelget('blob-model', true, true);
            (0, chai_1.expect)(response.device).to.eql('CPU', `The device of key ${modelName}`);
        }));
        it('modelexecute function', () => __awaiter(this, void 0, void 0, function* () {
            let response = yield redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3]);
            response = yield redis.ai_module_tensorset('tensorB', 'FLOAT', [1, 2], [3, 5]);
            const blob = fs.readFileSync('./tests/data/models/graph.pb');
            response = yield redis.ai_module_modelstore('mymodel', 'TF', 'CPU', blob, {
                inputs: ['a', 'b'],
                inputsCount: 2,
                outputs: ['c'],
                outputsCount: 1
            });
            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelstore');
            response = yield redis.ai_module_modelexecute('mymodel', {
                inputs: ['tensorA', 'tensorB'],
                outputs: ['tensorC'],
                inputsCount: 2,
                outputsCount: 1
            });
            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelexecute');
        }));
        it('modelscan function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_modelscan();
            (0, chai_1.expect)(response[0][0]).to.eql('mymodel', 'The response of mymodel');
        }));
        it('modeldel function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_modeldel('blob-model');
            (0, chai_1.expect)(response).to.eql('OK', 'The response of modeldel');
        }));
        it('scriptset function', () => __awaiter(this, void 0, void 0, function* () {
            const scriptFileStr = fs.readFileSync('./tests/data/scripts/script.txt').toString();
            const response = yield redis.ai_module_scriptset('myscript', {
                device: 'CPU',
                script: scriptFileStr
            });
            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptset');
        }));
        it('scriptget function', () => __awaiter(this, void 0, void 0, function* () {
            const scriptName = 'myscript';
            const response = yield redis.ai_module_scriptget(scriptName, true, true);
            (0, chai_1.expect)(response.device).to.eql('CPU', `The device of script ${scriptName}`);
        }));
        it('scriptexecute function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3]);
            yield redis.ai_module_tensorset('tensorB', 'FLOAT', [1, 2], [3, 5]);
            const response = yield redis.ai_module_scriptexecute('myscript', 'bar', {
                numberOfKeys: 3,
                keys: ['tensorA', 'tensorB', 'tensorC'],
                numberOfInputs: 2,
                inputs: ['tensorA', 'tensorB'],
                numberOfOutputs: 1,
                outputs: ['tensorC']
            });
            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptexecute');
        }));
        it('scriptscan function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_scriptscan();
            (0, chai_1.expect)(response[0][0]).to.eql('myscript', 'The response of scriptscan');
        }));
        it('info function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_info('myscript');
            (0, chai_1.expect)(response.key).to.eql('myscript', 'The response of info');
        }));
        it('scriptdel function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_scriptdel('myscript');
            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptdel');
        }));
        it('config function', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield redis.ai_module_config('/usr/lib/redis/modules/backends/');
            (0, chai_1.expect)(response).to.eql('OK', 'The response of config');
        }));
        it('dagexecute function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3]);
            const response = yield redis.ai_module_dagexecute({
                type: 'load',
                numberOfKeys: 1,
                keys: ['tensorA']
            }, [
                'AI.TENSORGET tensorA VALUES'
            ]);
            (0, chai_1.expect)(response).to.eql([
                [
                    "2",
                    "3"
                ]
            ], 'The response of dagexecute');
        }));
        it('dagexecuteRO function', () => __awaiter(this, void 0, void 0, function* () {
            yield redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3]);
            const response = yield redis.ai_module_dagexecuteRO({
                type: 'load',
                numberOfKeys: 1,
                keys: ['tensorA']
            }, [
                'AI.TENSORGET tensorA VALUES'
            ]);
            (0, chai_1.expect)(response).to.eql([
                [
                    "2",
                    "3"
                ]
            ], 'The response of dagexecute_RO');
        }));
    });
});
