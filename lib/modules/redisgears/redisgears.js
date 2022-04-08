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
exports.RedisGears = void 0;
const module_base_1 = require("../module.base");
const redisgears_commander_1 = require("./redisgears.commander");
class RedisGears extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisGears.name, options, moduleOptions, clusterOptions);
        this.gearsCommander = new redisgears_commander_1.GearsCommander();
    }
    /**
     * Aborting an existing execution
     * @param id The id of the execution
     */
    abortExecution(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commander = this.gearsCommander.abortExecution(id);
            return yield this.sendCommand(commander);
        });
    }
    /**
     * Retrieving key's configuration
     * @param key A list of keys
     */
    configGet(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.configGet(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Setting key's configuration
     * @param keyvalue A key value array, i.e. [['key', 'value]]
     */
    configSet(keyvalues) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.configSet(keyvalues);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Dropping an existing execution
     * @param id The id of the execution
     */
    dropExecution(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.dropExecution(id);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Dumping all of the executions
     */
    dumpExecutions() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.dumpExecutions();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Dumping all of the registrations
     */
    dumpRegistrations() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.dumpRegistrations();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving an execution
     * @param id The id of the execution
     * @param options The additional optional parameters
     */
    getExecution(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.getExecution(id, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the results
     * @param id The id of the execution
     */
    getResults(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.getResults(id);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the results that have 'UNBLOCKING' argument (And removing it)
     * @param id The id of the execution
     */
    getResultsBlocking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.getResultsBlocking(id);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving information about the cluster
     */
    infocluster() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.infocluster();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Executing a python function
     * @param func The function
     * @param options The additional optional arguments
     */
    pyexecute(func, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.pyexecute(func, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving memory usage statistics from the 'Python interpreter'
     */
    pystats() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.pystats();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a list of all the python requirements available
     */
    pydumpreqs() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.pydumpreqs();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Refreshing the node's view of the cluster's topology
     */
    refreshCluster() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.refreshCluster();
            return yield this.sendCommand(command);
        });
    }
    /**
     * Triggering the execution of a registered 'CommandReader' function
     * @param trigger The trigger's name
     * @param args The additional arguments
     */
    trigger(trigger, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.trigger(trigger, args);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Removing the registration of a function
     * @param id The id of the execution
     */
    unregister(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.gearsCommander.unregister(id);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisGears = RedisGears;
