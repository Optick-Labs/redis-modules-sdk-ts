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
exports.Redisearch = void 0;
const module_base_1 = require("../module.base");
const redisearch_commander_1 = require("./redisearch.commander");
const redisearch_helpers_1 = require("./redisearch.helpers");
class Redisearch extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(Redisearch.name, options, moduleOptions, clusterOptions);
        this.searchCommander = new redisearch_commander_1.SearchCommander();
        this.searchHelpers = new redisearch_helpers_1.RedisearchHelpers();
    }
    /**
     * Creating an index with a given spec
     * @param index The index of the schema
     * @param indexType The index type of the schema
     * @param schemaFields The filter set after the 'SCHEMA' argument
     * @param parameters The additional parameters of the spec
     * @returns 'OK' or error
     */
    create(index, indexType, schemaFields, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.create(index, indexType, schemaFields, parameters);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Searching the index with a textual query
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameter
     * @returns Array reply, where the first element is the total number of results, and then pairs of document id, and a nested array of field/value.
     */
    search(index, query, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.search(index, query, parameters);
            const response = yield this.sendCommand(command);
            if (this.returnRawResponse === true) {
                return this.handleResponse(response);
            }
            return this.searchHelpers.handleQueryResponse(response);
        });
    }
    /**
     * Runs a search query on an index, and performs aggregate transformations on the results, extracting statistics etc from them
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameters
     * @returns Array Response. Each row is an array and represents a single aggregate result
     */
    aggregate(index, query, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.aggregate(index, query, parameters);
            const response = yield this.sendCommand(command);
            if (this.returnRawResponse === true) {
                return this.handleResponse(response);
            }
            return this.searchHelpers.handleAggregateResponse(response);
        });
    }
    /**
     * Retrieving the execution plan for a complex query
     * @param index The index
     * @param query The query
     * @returns Returns the execution plan for a complex query
     */
    explain(index, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.explain(index, query);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieving the execution plan for a complex query but formatted for easier reading without using redis-cli --raw
     * @param index The index
     * @param query The query
     * @returns A string representing the execution plan.
     */
    explainCLI(index, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.explainCLI(index, query);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response.join(''));
        });
    }
    /**
     * Adding a new field to the index
     * @param index The index
     * @param field The field name
     * @param fieldType The field type
     * @param options The additional optional parameters
     * @returns 'OK' or error
     */
    alter(index, field, fieldType, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.alter(index, field, fieldType, options);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting the index
     * @param index The index
     * @param deleteHash If set, the drop operation will delete the actual document hashes.
     * @returns 'OK' or error
     */
    dropindex(index, deleteHash = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.dropindex(index, deleteHash);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Adding alias fron an index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    aliasadd(name, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.aliasadd(name, index);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Updating alias index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    aliasupdate(name, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.aliasupdate(name, index);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting alias fron an index
     * @param name The alias name
     * @returns 'OK' or error
     */
    aliasdel(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.aliasdel(name);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieving the distinct tags indexed in a Tag field
     * @param index The index
     * @param field The field name
     * @returns The distinct tags indexed in a Tag field
     */
    tagvals(index, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.tagvals(index, field);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Adds a suggestion string to an auto-complete suggestion dictionary
     * @param key The key
     * @param suggestion The suggestion
     * @param score The score
     * @param options The additional optional parameters
     * @returns The current size of the suggestion dictionary
     */
    sugadd(key, suggestion, score, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.sugadd(key, suggestion, score, options);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieving completion suggestions for a prefix
     * @param key The key
     * @param prefix The prefix of the suggestion
     * @param options The additional optional parameter
     * @returns A list of the top suggestions matching the prefix, optionally with score after each entry
     */
    sugget(key, prefix, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.sugget(key, prefix, options);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting a string from a suggestion index
     * @param key The key
     * @param suggestion The suggestion
     */
    sugdel(key, suggestion) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.sugdel(key, suggestion);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieving the size of an auto-complete suggestion dictionary
     * @param key The key
     */
    suglen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.suglen(key);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Updating a synonym group
     * @param index The index
     * @param groupId The group id
     * @param terms A list of terms
     * @param skipInitialScan If set, we do not scan and index.
     * @returns 'OK'
     */
    synupdate(index, groupId, terms, skipInitialScan = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.synupdate(index, groupId, terms, skipInitialScan);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Dumps the contents of a synonym group
     * @param index The index
     * @returns A list of synonym terms and their synonym group ids.
     */
    syndump(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.syndump(index);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Performs spelling correction on a query
     * @param index The index
     * @param query The query
     * @param options The additional optional parameters
     * @returns An array, in which each element represents a misspelled term from the query
     */
    spellcheck(index, query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.spellcheck(index, query, options);
            const response = yield this.sendCommand(command);
            return this.searchHelpers.handleSpellcheckResponse(response);
        });
    }
    /**
     * Adding terms to a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of new terms that were added
     */
    dictadd(dict, terms) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.dictadd(dict, terms);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Deleting terms from a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of terms that were deleted
     */
    dictdel(dict, terms) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.dictdel(dict, terms);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Dumps all terms in the given dictionary
     * @param dict The dictionary
     * @returns An array, where each element is term
     */
    dictdump(dict) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.dictdump(dict);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieving infromation and statistics on the index
     * @param index The index
     * @returns A nested array of keys and values.
     */
    info(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.info(index);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param commandType The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    config(commandType, option, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.searchCommander.config(commandType, option, value);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
}
exports.Redisearch = Redisearch;
