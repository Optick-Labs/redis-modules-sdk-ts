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
exports.RedisTimeSeries = void 0;
const module_base_1 = require("../module.base");
const rts_commander_1 = require("./rts.commander");
class RedisTimeSeries extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisTimeSeries.name, options, moduleOptions, clusterOptions);
        this.rtsCommander = new rts_commander_1.RedisTimeSeriesCommander();
    }
    /**
     * Creating a new TS key
     * @param key The key
     * @param options The 'TS.CREATE' optional parameter
     * @param options.retention The 'RETENTION' optional parameter
     * @param options.uncompressed The 'UNCOMPRESSED' optional parameter
     * @param options.chunkSize The 'CHUNK_SIZE' optional parameter
     * @param options.labels A list of 'LABELS' optional parameter
     * @param options.duplicatePolicy The 'DUPLICATE_POLICY' optional parameter
     * @returns "OK"
     */
    create(key, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.create(key, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Altering an existing TS key
     * @param key Required. The key
     * @param retention Optional. The retention time
     * @param labels Optional. The labels to update
     *
     */
    alter(key, retention, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.alter(key, retention, labels);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Appending/creating a new sample to series
     * @param key The key
     * @param timestamp The timestamp
     * @param value The value
     * @param options The 'TS.ADD' command optional parameters
     * @param options.onDuplicate The 'ON_DUPLICATE' optional parameter
     * @param options.retention The 'RETENTION' optional parameter
     * @param options.uncompressed The 'UNCOMPRESSED' optional parameter
     * @param options.chunkSize The 'CHUNK_SIZE' optional parameter
     * @param options.labels A list of 'LABELS' optional parameter
     */
    add(key, timestamp, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.add(key, timestamp, value, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Appending new samples to a list of series
     * @param keySets A list of key sets
     * @param keySets.key The key
     * @param keySets.timestamp The timestamp
     * @param keySets.value The value
     */
    madd(keySets) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.madd(keySets);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Creating a new sample that increments the latest sample's value
     * @param key The key
     * @param value The value
     * @param options The 'TS.INCRBY' command optional parameters
     * @param options.timestamp The 'TIMESTAMP' optional parameter
     * @param options.retention The 'RETENTION' optional parameter
     * @param options.uncompressed The 'UNCOMPRESSED' optional parameter
     * @param options.chunkSize The 'CHUNK_SIZE' optional parameter
     * @param options.labels A list of 'LABELS' optional parameter
     */
    incrby(key, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.incrby(key, value, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Creating a new sample that decrements the latest sample's value
     * @param key The key
     * @param value The value
     * @param options The 'TS.DECRBY' command optional parameters
     * @param options.timestamp The 'TIMESTAMP' optional parameter
     * @param options.retention The 'RETENTION' optional parameter
     * @param options.uncompressed The 'UNCOMPRESSED' optional parameter
     * @param options.chunkSize The 'CHUNK_SIZE' optional parameter
     * @param options.labels A list of 'LABELS' optional parameter
     */
    decrby(key, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.decrby(key, value, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Creating a compaction rule
     * @param parameters The 'TS.CREATERULE' command optional parameters
     * @param options.sourceKey The source key
     * @param options.destKey The dest key
     * @param options.aggregation The aggregation type
     * @param options.timeBucket The time bucket
     */
    createrule(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.createrule(parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Deleting a compaction rule
     * @param sourceKey The source key
     * @param destKey The dest key
     */
    deleterule(sourceKey, destKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.deleterule(sourceKey, destKey);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Querying a range in forward directions
     * @param key The key
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param options The 'TS.Range' command optional parameters
     * @param options.count The 'COUNT' optional parameter
     * @param options.aggregation The 'AGGREGATION' optional parameter
     * @param options.aggregation.type The type of the 'AGGREGATION' command
     * @param options.aggregation.timeBucket The time bucket of the 'AGGREGATION' command
     */
    range(key, fromTimestamp, toTimestamp, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.range(key, fromTimestamp, toTimestamp, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Querying a range in reverse directions
     * @param key The key
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param options The 'TS.Range' command optional parameters
     * @param options.count The 'COUNT' optional parameter
     * @param options.aggregation The 'AGGREGATION' optional parameter
     * @param options.aggregation.type The type of the 'AGGREGATION' command
     * @param options.aggregation.timeBucket The time bucket of the 'AGGREGATION' command
     */
    revrange(key, fromTimestamp, toTimestamp, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.revrange(key, fromTimestamp, toTimestamp, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Querying a range across multiple time-series by filters in forward directions
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param filter The filter
     * @param options The 'TS.MRange' command optional parameters
     * @param options.count The 'COUNT' optional parameter
     * @param options.aggregation The 'AGGREGATION' optional parameter
     * @param options.aggregation.type The type of the 'AGGREGATION' command
     * @param options.aggregation.timeBucket The time bucket of the 'AGGREGATION' command
     * @param options.withLabels The 'WITHLABELS' optional parameter
     */
    mrange(fromTimestamp, toTimestamp, filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.mrange(fromTimestamp, toTimestamp, filter, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Querying a range across multiple time-series by filters in reverse directions
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param filter The filter
     * @param options The 'TS.MRange' command optional parameters
     * @param options.count The 'COUNT' optional parameter
     * @param options.aggregation The 'AGGREGATION' optional parameter
     * @param options.aggregation.type The type of the 'AGGREGATION' command
     * @param options.aggregation.timeBucket The time bucket of the 'AGGREGATION' command
     * @param options.withLabels The 'WITHLABELS' optional parameter
     */
    mrevrange(fromTimestamp, toTimestamp, filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.mrevrange(fromTimestamp, toTimestamp, filter, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the last sample of a key
     * @param key The key
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.get(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving the last sample of a key by filter
     * @param filter Required. The filter
     * @param withLabels Optional. If to add the 'WITHLABELS' Optional parameter
     */
    mget(filter, withLabels) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.mget(filter, withLabels);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving information and statistics on the time-series
     * @param key The key
     */
    info(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.info(key);
            const response = yield this.sendCommand(command);
            const info = {};
            for (let i = 0; i < response.length; i += 2) {
                info[response[i]] = response[i + 1];
            }
            return info;
        });
    }
    /**
     * Retrieving all the keys matching the filter list
     * @param filter The filter
     */
    queryindex(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.queryindex(filter);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Delete data points for a given timeseries and interval range in the form of start and end delete timestamps.
     * @param key Key name for timeseries
     * @param fromTimestamp Start timestamp for the range deletion.
     * @param toTimestamp End timestamp for the range deletion.
     * @returns The count of samples deleted
     */
    del(key, fromTimestamp, toTimestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.rtsCommander.del(key, fromTimestamp, toTimestamp);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisTimeSeries = RedisTimeSeries;
