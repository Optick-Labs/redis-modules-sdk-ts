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
exports.ReJSON = void 0;
const module_base_1 = require("../module.base");
const rejson_commander_1 = require("./rejson.commander");
class ReJSON extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(ReJSON.name, options, moduleOptions, clusterOptions);
        this.rejsonCommander = new rejson_commander_1.RejsonCommander();
    }
    /**
     * Deleting a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    del(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.del(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Clearing a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    clear(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.clear(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Toggling a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The value of the path after the toggle.
     */
    toggle(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.toggle(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Setting a new JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param json The JSON string of the key i.e. '{"x": 4}'
     * @param condition Optional. The condition to set the JSON in.
     * @returns Simple String OK if executed correctly, or Null Bulk if the specified NX or XX conditions were not met.
     */
    set(key, path, json, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.set(key, path, json, condition);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param parameters Additional parameters to arrange the returned values
     * @returns The value at path in JSON serialized form.
     */
    get(key, path, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.get(key, path, parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving values from multiple keys
     * @param keys A list of keys
     * @param path The path of the keys
     * @returns The values at path from multiple key's. Non-existing keys and non-existing paths are reported as null.
     */
    mget(keys, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.mget(keys, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the type of a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @returns Simple String, specifically the type of value.
     */
    type(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.type(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Increasing JSON key value by number
     * @param key The name of the key
     * @param number The number to increase by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    numincrby(key, number, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.numincrby(key, number, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Multiplying JSON key value by number
     * @param key The name of the key
     * @param number The number to multiply by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    nummultby(key, number, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.nummultby(key, number, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Appending string to JSON key string value
     * @param key The name of the key
     * @param string The string to append to key value
     * @param path The path of the key
     * @returns Integer, specifically the string's new length.
     */
    strappend(key, string, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.strappend(key, string, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the length of a JSON key value
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the string's length.
     */
    strlen(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.strlen(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Appending string to JSON key array value
     * @param key The name of the key
     * @param items The items to append to an existing JSON array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    arrappend(key, items, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrappend(key, items, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving JSON key array item by index
     * @param key The name of the key
     * @param scalar The scalar to filter out a JSON key
     * @param path The path of the key
     * @returns Integer, specifically the position of the scalar value in the array, or -1 if unfound.
     */
    arrindex(key, scalar, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrindex(key, scalar, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Inserting item into JSON key array
     * @param key The name of the key
     * @param index The index to insert the JSON into the array
     * @param json The JSON string to insert into the array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    arrinsert(key, index, json, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrinsert(key, index, json, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the length of a JSON key array
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the array's length.
     */
    arrlen(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrlen(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Poping an array item by index
     * @param key The name of the key
     * @param index The index of the array item to pop
     * @param path The path of the key
     * @returns Bulk String, specifically the popped JSON value.
     */
    arrpop(key, index, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrpop(key, index, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Triming an array by index range
     * @param key The name of the key
     * @param start The starting index of the trim
     * @param end The ending index of the trim
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    arrtrim(key, start, end, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.arrtrim(key, start, end, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving an array of JSON keys
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the key names in the object as Bulk Strings.
     */
    objkeys(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.objkeys(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the length of a JSON
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the number of keys in the object.
     */
    objlen(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.objlen(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Executing debug command
     * @param subcommand The subcommand of the debug command
     * @param key The name of the key
     * @param path The path of the key
     * @returns
        MEMORY returns an integer, specifically the size in bytes of the value
        HELP returns an array, specifically with the help message
     */
    debug(subcommand, key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.debug(subcommand, key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * An alias of delCommand
     * @param key The name of the key
     * @param path The path of the key
     * @returns The number of paths deleted (0 or 1).
     */
    forget(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.forget(key, path);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving a JSON key value in RESP protocol
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the JSON's RESP form as detailed.
     */
    resp(key, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rejsonCommander.resp(key, path);
            return yield this.sendCommand(command);
        });
    }
}
exports.ReJSON = ReJSON;
