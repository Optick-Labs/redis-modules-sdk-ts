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
exports.RedisAI = void 0;
const module_base_1 = require("../module.base");
const redis_ai_commander_1 = require("./redis-ai.commander");
class RedisAI extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisAI.name, options, moduleOptions, clusterOptions);
        this.aiCommander = new redis_ai_commander_1.RedisAICommander();
    }
    /**
     * Setting a tensor
     * @param key The tensor's key name
     * @param type The tensor's data type can be one of: FLOAT , DOUBLE , INT8 , INT16 , INT32 , INT64 , UINT8 or UINT16
     * @param data The tensor's data (binary/numberic)
     * @param shape One or more dimensions, or the number of elements per axis, for the tensor
     */
    tensorset(key, type, shapes, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.tensorset(key, type, shapes, data);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a tensor
     * @param key The tensor's key name
     * @param meta Returns the tensor's metadata
     * @param format The tensor's reply format can be one of the following (BLOB/VALUES)
     */
    tensorget(key, format, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.tensorget(key, format, meta);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Setting a model
     * @param key The model's key name
     * @param backend The backend of the model
     * @param device The devide of the model
     * @param model The Protobuf-serialized model. Since Redis supports strings up to 512MB, blobs for very large
     * @param options Additional optional parameters
     */
    modelstore(key, backend, device, model, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.modelstore(key, backend, device, model, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a model
     * @param key The model's key name
     * @param meta Will return the model's meta information on backend, device and tag
     * @param blob Will return the model's blob containing the serialized model
     */
    modelget(key, meta, blob) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.modelget(key, meta, blob);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting a model
     * @param key The model's key name
     */
    modeldel(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.modeldel(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Running a model
     * @param key The model's key name
     * @param parameters The parameters of 'AI.MODELEXECUTE'
     */
    modelexecute(key, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.modelexecute(key, parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Scanning a model
     */
    modelscan() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.modelscan();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Setting a script
     * @param key The script's key name
     * @param parameters Additional optional parameters
     */
    scriptset(key, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.scriptset(key, parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a script
     * @param key The script's key name
     * @param meta The script's device as a String
     * @param source The script's source code as a String
     */
    scriptget(key, meta, source) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.scriptget(key, meta, source);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting a script
     * @param key The script's key name
     */
    scriptdel(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.scriptdel(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Running a script
     * @param key The script's key nameb
     * @param functionName The name of the function to run
     * @param parameters The parameters of the 'AI.SCRIPTEXECUTE' command
    */
    scriptexecute(key, functionName, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.scriptexecute(key, functionName, parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Scanning a script
     */
    scriptscan() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.scriptscan();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Running a DAG
     * @param parameters Additional parameters required for the 'AI.DAGEXECUTE' command
     * @param commands The commands sent to the 'AI.DAGEXECUTE' command
     */
    dagexecute(parameters, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.dagexecute(parameters, commands);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Running a readonly DAG
     * @param parameters Additional parameters required for the 'AI.DAGEXECUTE_RO' command
     * @param commands The commands sent to the 'AI.DAGEXECUTE_RO' command
     */
    dagexecuteRO(parameters, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.dagexecuteRO(parameters, commands);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving script/model info
     * @param key The key name of a model or script
     * @param RESETSTAT Resets all statistics associated with the key
     */
    info(key, RESETSTAT) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.info(key, RESETSTAT);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Restrieving configuration
     * @param path Specifies the default base backends path to path . The backends path is used when dynamically loading a backend (default: '{module_path}/backends', where module_path is the module's path).
     * @param backend  Loads the DL/ML backend specified by the backend identifier from path . If path is relative, it is resolved by prefixing the BACKENDSPATH to it. If path is absolute then it is used as is.
     */
    config(path, backend) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.aiCommander.config(path, backend);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisAI = RedisAI;
