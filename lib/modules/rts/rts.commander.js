"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisTimeSeriesCommander = void 0;
var RedisTimeSeriesCommander = /** @class */ (function () {
    function RedisTimeSeriesCommander() {
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
    RedisTimeSeriesCommander.prototype.create = function (key, options) {
        var args = [key];
        if (options !== undefined && options.retention !== undefined)
            args = args.concat(['RETENTION', options.retention.toString()]);
        if (options !== undefined && options.uncompressed === true)
            args.push('UNCOMPRESSED');
        if (options !== undefined && options.chunkSize !== undefined)
            args = args.concat(['CHUNK_SIZE', options.chunkSize.toString()]);
        if (options !== undefined && options.duplicatePolicy !== undefined)
            args = args.concat(['DUPLICATE_POLICY', options.duplicatePolicy]);
        if (options !== undefined && options.labels !== undefined && options.labels.length > 0) {
            args.push('LABELS');
            for (var _i = 0, _a = options.labels; _i < _a.length; _i++) {
                var label = _a[_i];
                args = args.concat([label.name, label.value]);
            }
        }
        return {
            command: 'TS.CREATE',
            args: args
        };
    };
    /**
     * Altering an existing TS key
     * @param key Required. The key
     * @param retention Optional. The retention time
     * @param labels Optional. The labels to update
     *
     */
    RedisTimeSeriesCommander.prototype.alter = function (key, retention, labels) {
        var args = [key];
        if (retention !== undefined)
            args = args.concat(['RETENTION', retention.toString()]);
        if (labels !== undefined && labels.length > 0) {
            args.push('LABELS');
            for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                var label = labels_1[_i];
                args = args.concat([label.name, label.value]);
            }
        }
        return {
            command: 'TS.ALTER',
            args: args
        };
    };
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
    RedisTimeSeriesCommander.prototype.add = function (key, timestamp, value, options) {
        var args = [key, timestamp, value];
        if ((options === null || options === void 0 ? void 0 : options.retention) !== undefined) {
            args = args.concat(['RETENTION', "".concat(options.retention)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.uncompressed) === true) {
            args.push('UNCOMPRESSED');
        }
        if (options === null || options === void 0 ? void 0 : options.onDuplicate) {
            args = args.concat(['ON_DUPLICATE', options.onDuplicate]);
        }
        if ((options === null || options === void 0 ? void 0 : options.chunkSize) !== undefined) {
            args = args.concat(['CHUNK_SIZE', "".concat(options.chunkSize)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.labels) !== undefined && options.labels.length > 0) {
            args.push('LABELS');
            for (var _i = 0, _a = options.labels; _i < _a.length; _i++) {
                var label = _a[_i];
                args = args.concat([label.name, label.value]);
            }
        }
        return {
            command: 'TS.ADD',
            args: args
        };
    };
    /**
     * Appending new samples to a list of series
     * @param keySets A list of key sets
     * @param keySets.key The key
     * @param keySets.timestamp The timestamp
     * @param keySets.value The value
     */
    RedisTimeSeriesCommander.prototype.madd = function (keySets) {
        var args = [];
        for (var _i = 0, keySets_1 = keySets; _i < keySets_1.length; _i++) {
            var keySet = keySets_1[_i];
            args = args.concat([keySet.key, keySet.timestamp, keySet.value]);
        }
        return {
            command: 'TS.MADD',
            args: args
        };
    };
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
    RedisTimeSeriesCommander.prototype.incrby = function (key, value, options) {
        var args = [key, value];
        if (options !== undefined && options.retention !== undefined)
            args = args.concat(['RETENTION', options.retention.toString()]);
        if (options !== undefined && options.uncompressed === true)
            args.push('UNCOMPRESSED');
        if (options !== undefined && options.chunkSize !== undefined)
            args = args.concat(['CHUNK_SIZE', options.chunkSize.toString()]);
        if (options !== undefined && options.labels !== undefined && options.labels.length > 0) {
            args.push('LABELS');
            for (var _i = 0, _a = options.labels; _i < _a.length; _i++) {
                var label = _a[_i];
                args = args.concat([label.name, label.value]);
            }
        }
        return {
            command: 'TS.INCRBY',
            args: args
        };
    };
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
    RedisTimeSeriesCommander.prototype.decrby = function (key, value, options) {
        var args = [key, value];
        if (options !== undefined && options.retention !== undefined)
            args = args.concat(['RETENTION', options.retention.toString()]);
        if (options !== undefined && options.uncompressed === true)
            args.push('UNCOMPRESSED');
        if (options !== undefined && options.chunkSize !== undefined)
            args = args.concat(['CHUNK_SIZE', options.chunkSize.toString()]);
        if (options !== undefined && options.labels !== undefined && options.labels.length > 0) {
            args.push('LABELS');
            for (var _i = 0, _a = options.labels; _i < _a.length; _i++) {
                var label = _a[_i];
                args = args.concat([label.name, label.value]);
            }
        }
        return {
            command: 'TS.DECRBY',
            args: args
        };
    };
    /**
     * Creating a compaction rule
     * @param parameters The 'TS.CREATERULE' command optional parameters
     * @param options.sourceKey The source key
     * @param options.destKey The dest key
     * @param options.aggregation The aggregation type
     * @param options.timeBucket The time bucket
     */
    RedisTimeSeriesCommander.prototype.createrule = function (parameters) {
        var args = [parameters.sourceKey, parameters.destKey, 'AGGREGATION', parameters.aggregation, parameters.timeBucket.toString()];
        return {
            command: 'TS.CREATERULE',
            args: args
        };
    };
    /**
     * Deleting a compaction rule
     * @param sourceKey The source key
     * @param destKey The dest key
     */
    RedisTimeSeriesCommander.prototype.deleterule = function (sourceKey, destKey) {
        return {
            command: 'TS.DELETERULE',
            args: [sourceKey, destKey]
        };
    };
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
    RedisTimeSeriesCommander.prototype.range = function (key, fromTimestamp, toTimestamp, options) {
        var args = this.buildRangeCommand(key, fromTimestamp, toTimestamp, options);
        return {
            command: 'TS.RANGE',
            args: args
        };
    };
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
    RedisTimeSeriesCommander.prototype.revrange = function (key, fromTimestamp, toTimestamp, options) {
        var args = this.buildRangeCommand(key, fromTimestamp, toTimestamp, options);
        return {
            command: 'TS.REVRANGE',
            args: args
        };
    };
    /**
     * Building the arguments for 'TS.RANGE'/'TS.REVRANGE' commands
     * @param key The key
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param options The 'TS.RANGE'/'TS.REVRANGE' command optional parameters
     * @returns The arguments of the command
     */
    RedisTimeSeriesCommander.prototype.buildRangeCommand = function (key, fromTimestamp, toTimestamp, options) {
        var args = [key, fromTimestamp, toTimestamp];
        if ((options === null || options === void 0 ? void 0 : options.filterByTS) !== undefined) {
            args = args.concat(['FILTER_BY_TS', options.filterByTS.join(' ')]);
        }
        if ((options === null || options === void 0 ? void 0 : options.filterByValue) !== undefined) {
            args = args.concat(['FILTER_BY_VALUE', "".concat(options.filterByValue.min), "".concat(options.filterByValue.max)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.count) !== undefined) {
            args = args.concat(['COUNT', "".concat(options.count)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.align) !== undefined) {
            args = args.concat(['ALIGN', "".concat(options.align)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.aggregation) !== undefined) {
            args = args.concat(['AGGREGATION', options.aggregation.type, "".concat(options.aggregation.timeBucket)]);
        }
        return args;
    };
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
    RedisTimeSeriesCommander.prototype.mrange = function (fromTimestamp, toTimestamp, filter, options) {
        var args = this.buildMultiRangeCommand(fromTimestamp, toTimestamp, filter, options);
        return {
            command: 'TS.MRANGE',
            args: args
        };
    };
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
    RedisTimeSeriesCommander.prototype.mrevrange = function (fromTimestamp, toTimestamp, filter, options) {
        var args = this.buildMultiRangeCommand(fromTimestamp, toTimestamp, filter, options);
        return {
            command: 'TS.MREVRANGE',
            args: args
        };
    };
    /**
     * Building the arguments for 'TS.MRANGE'/'TS.MREVRANGE' commands
     * @param fromTimestamp The starting timestamp
     * @param toTimestamp The ending timestamp
     * @param filter The filter
     * @param options The 'TS.MRANGE'/'TS.MREVRANGE' command optional parameters
     * @returns The arguments of the command
     */
    RedisTimeSeriesCommander.prototype.buildMultiRangeCommand = function (fromTimestamp, toTimestamp, filter, options) {
        var args = [fromTimestamp, toTimestamp];
        if ((options === null || options === void 0 ? void 0 : options.count) !== undefined) {
            args = args.concat(['COUNT', "".concat(options.count)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.align) !== undefined) {
            args = args.concat(['ALIGN', "".concat(options.align)]);
        }
        if (options === null || options === void 0 ? void 0 : options.aggregation) {
            args = args.concat(['AGGREGATION', "".concat(options.aggregation.type), "".concat(options.aggregation.timeBucket)]);
        }
        if ((options === null || options === void 0 ? void 0 : options.withLabels) === true) {
            args.push('WITHLABELS');
        }
        args = args.concat(['FILTER', "".concat(filter)]);
        if (options === null || options === void 0 ? void 0 : options.groupBy) {
            args = args.concat(['GROUPBY', "".concat(options.groupBy.label), 'REDUCE', "".concat(options.groupBy.reducer)]);
        }
        return args;
    };
    /**
     * Retrieving the last sample of a key
     * @param key The key
     */
    RedisTimeSeriesCommander.prototype.get = function (key) {
        return {
            command: 'TS.GET',
            args: [key]
        };
    };
    /**
     * Retrieving the last sample of a key by filter
     * @param filter Required. The filter
     * @param withLabels Optional. If to add the 'WITHLABELS' Optional parameter
     */
    RedisTimeSeriesCommander.prototype.mget = function (filter, withLabels) {
        var args = [];
        if (withLabels === true) {
            args.push('WITHLABELS');
        }
        args = args.concat(['FILTER'], filter.split(' '));
        return {
            command: 'TS.MGET',
            args: args
        };
    };
    /**
     * Retrieving information and statistics on the time-series
     * @param key The key
     */
    RedisTimeSeriesCommander.prototype.info = function (key) {
        return {
            command: 'TS.INFO',
            args: [key]
        };
    };
    /**
     * Retrieving all the keys matching the filter list
     * @param filter The filter
     */
    RedisTimeSeriesCommander.prototype.queryindex = function (filter) {
        return {
            command: 'TS.QUERYINDEX',
            args: [filter]
        };
    };
    /**
     * Delete data points for a given timeseries and interval range in the form of start and end delete timestamps.
     * @param key Key name for timeseries
     * @param fromTimestamp Start timestamp for the range deletion.
     * @param toTimestamp End timestamp for the range deletion.
     * @returns The count of samples deleted
     */
    RedisTimeSeriesCommander.prototype.del = function (key, fromTimestamp, toTimestamp) {
        return {
            command: 'TS.DEL',
            args: [key, fromTimestamp, toTimestamp]
        };
    };
    return RedisTimeSeriesCommander;
}());
exports.RedisTimeSeriesCommander = RedisTimeSeriesCommander;
