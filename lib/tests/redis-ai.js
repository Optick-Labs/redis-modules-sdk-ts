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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_argument_parser_1 = require("cli-argument-parser");
var chai_1 = require("chai");
var fs = __importStar(require("fs"));
var redis_modules_1 = require("../modules/redis-modules");
var redis;
describe('AI testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                var clientOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clientOptions = {
                                host: cli_argument_parser_1.cliArguments.host,
                                port: parseInt(cli_argument_parser_1.cliArguments.port)
                            };
                            redis = new redis_modules_1.RedisModules(clientOptions);
                            return [4 /*yield*/, redis.connect()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            after(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.disconnect()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('tensorset function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorset('values-key', 'FLOAT', [2, 2], [1, 2, 3, 4])];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of tensorset');
                            return [4 /*yield*/, redis.ai_module_tensorset('blob-key', 'FLOAT', [1], [Buffer.from('1.11111')])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of tensorset');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('tensorget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorget('values-key', 'VALUES', true)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
                            return [4 /*yield*/, redis.ai_module_tensorget('blob-key', 'BLOB', true)];
                        case 2:
                            response = (_a.sent());
                            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
                            return [4 /*yield*/, redis.ai_module_tensorget('blob-key', 'BLOB', true)];
                        case 3:
                            response = (_a.sent());
                            (0, chai_1.expect)(response.dtype).to.eql('FLOAT', 'The dtype of tensor');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('modelstore function', function () { return __awaiter(_this, void 0, void 0, function () {
                var file, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = fs.readFileSync('./tests/data/models/model1.onnx');
                            return [4 /*yield*/, redis.ai_module_modelstore('blob-model', 'ONNX', 'CPU', file)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelset');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('modelget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var modelName, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            modelName = 'blob-model';
                            return [4 /*yield*/, redis.ai_module_modelget('blob-model', true, true)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.device).to.eql('CPU', "The device of key ".concat(modelName));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('modelexecute function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response, blob;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3])];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, redis.ai_module_tensorset('tensorB', 'FLOAT', [1, 2], [3, 5])];
                        case 2:
                            response = _a.sent();
                            blob = fs.readFileSync('./tests/data/models/graph.pb');
                            return [4 /*yield*/, redis.ai_module_modelstore('mymodel', 'TF', 'CPU', blob, {
                                    inputs: ['a', 'b'],
                                    inputsCount: 2,
                                    outputs: ['c'],
                                    outputsCount: 1
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelstore');
                            return [4 /*yield*/, redis.ai_module_modelexecute('mymodel', {
                                    inputs: ['tensorA', 'tensorB'],
                                    outputs: ['tensorC'],
                                    inputsCount: 2,
                                    outputsCount: 1
                                })];
                        case 4:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of modelexecute');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('modelscan function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_modelscan()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.eql('mymodel', 'The response of mymodel');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('modeldel function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_modeldel('blob-model')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of modeldel');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scriptset function', function () { return __awaiter(_this, void 0, void 0, function () {
                var scriptFileStr, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            scriptFileStr = fs.readFileSync('./tests/data/scripts/script.txt').toString();
                            return [4 /*yield*/, redis.ai_module_scriptset('myscript', {
                                    device: 'CPU',
                                    script: scriptFileStr
                                })];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptset');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scriptget function', function () { return __awaiter(_this, void 0, void 0, function () {
                var scriptName, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            scriptName = 'myscript';
                            return [4 /*yield*/, redis.ai_module_scriptget(scriptName, true, true)];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.device).to.eql('CPU', "The device of script ".concat(scriptName));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scriptexecute function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.ai_module_tensorset('tensorB', 'FLOAT', [1, 2], [3, 5])];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.ai_module_scriptexecute('myscript', 'bar', {
                                    numberOfKeys: 3,
                                    keys: ['tensorA', 'tensorB', 'tensorC'],
                                    numberOfInputs: 2,
                                    inputs: ['tensorA', 'tensorB'],
                                    numberOfOutputs: 1,
                                    outputs: ['tensorC']
                                })];
                        case 3:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptexecute');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scriptscan function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_scriptscan()];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response[0][0]).to.eql('myscript', 'The response of scriptscan');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('info function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_info('myscript')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response.key).to.eql('myscript', 'The response of info');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('scriptdel function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_scriptdel('myscript')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of scriptdel');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('config function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_config('/usr/lib/redis/modules/backends/')];
                        case 1:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql('OK', 'The response of config');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dagexecute function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.ai_module_dagexecute({
                                    type: 'load',
                                    numberOfKeys: 1,
                                    keys: ['tensorA']
                                }, [
                                    'AI.TENSORGET tensorA VALUES'
                                ])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql([
                                [
                                    "2",
                                    "3"
                                ]
                            ], 'The response of dagexecute');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dagexecuteRO function', function () { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, redis.ai_module_tensorset('tensorA', 'FLOAT', [1, 2], [2, 3])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, redis.ai_module_dagexecuteRO({
                                    type: 'load',
                                    numberOfKeys: 1,
                                    keys: ['tensorA']
                                }, [
                                    'AI.TENSORGET tensorA VALUES'
                                ])];
                        case 2:
                            response = _a.sent();
                            (0, chai_1.expect)(response).to.eql([
                                [
                                    "2",
                                    "3"
                                ]
                            ], 'The response of dagexecute_RO');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
