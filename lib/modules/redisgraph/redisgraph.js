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
exports.RedisGraph = void 0;
const module_base_1 = require("../module.base");
const redisgraph_commander_1 = require("./redisgraph.commander");
class RedisGraph extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisGraph.name, options, moduleOptions, clusterOptions);
        this.graphCommander = new redisgraph_commander_1.GraphCommander();
    }
    /**
     * Executing the given query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    query(name, query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.query(name, query, params);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Executing the given readonly query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    readonlyQuery(name, query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.readonlyQuery(name, query, params);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Executing a query and produces an execution plan augmented with metrics for each operation's execution
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan, with details on results produced by and time spent in each operation.
     */
    profile(name, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.profile(name, query);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Completely removing the graph and all of its entities
     * @param name The name of the graph
     * @returns String indicating if operation succeeded or failed.
     */
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.delete(name);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Constructing a query execution plan but does not run it. Inspect this execution plan to better understand how your query will get executed
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan
     */
    explain(name, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.explain(name, query);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a list containing up to 10 of the slowest queries
     * @param id The id of the graph
     * @returns A list containing up to 10 of the slowest queries issued against the given graph ID.
     */
    slowlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.slowlog(id);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param command The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    config(commandType, option, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.graphCommander.config(commandType, option, value);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
}
exports.RedisGraph = RedisGraph;
