"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulePropNames = exports.RedisModules = void 0;
var module_base_1 = require("./module.base");
var redis_ai_1 = require("./redis-ai/redis-ai");
var redis_ai_commander_1 = require("./redis-ai/redis-ai.commander");
var redisbloom_1 = require("./bloom/redisbloom");
var redisbloom_cmk_1 = require("./bloom-cmk/redisbloom-cmk");
var redisbloom_cuckoo_1 = require("./bloom-cuckoo/redisbloom-cuckoo");
var redisbloom_tdigest_1 = require("./bloom-tdigest/redisbloom-tdigest");
var redisbloom_topk_1 = require("./bloom-topk/redisbloom-topk");
var redisearch_1 = require("./redisearch/redisearch");
var redisgears_1 = require("./redisgears/redisgears");
var redisgraph_1 = require("./redisgraph/redisgraph");
var rejson_1 = require("./rejson/rejson");
var ris_1 = require("./ris/ris");
var ris_commander_1 = require("./ris/ris.commander");
var rts_1 = require("./rts/rts");
var redisbloom_tdigest_commander_1 = require("./bloom-tdigest/redisbloom-tdigest.commander");
var redisbloom_commander_1 = require("./bloom/redisbloom.commander");
var redisbloom_cmk_commander_1 = require("./bloom-cmk/redisbloom-cmk.commander");
var redisbloom_cuckoo_commander_1 = require("./bloom-cuckoo/redisbloom-cuckoo.commander");
var redisbloom_topk_commander_1 = require("./bloom-topk/redisbloom-topk.commander");
var redisearch_commander_1 = require("./redisearch/redisearch.commander");
var redisgears_commander_1 = require("./redisgears/redisgears.commander");
var redisgraph_commander_1 = require("./redisgraph/redisgraph.commander");
var rejson_commander_1 = require("./rejson/rejson.commander");
var rts_commander_1 = require("./rts/rts.commander");
var redisearch_helpers_1 = require("./redisearch/redisearch.helpers");
var ris_helpers_1 = require("./ris/ris.helpers");
var RedisModules = /** @class */ (function (_super) {
    __extends(RedisModules, _super);
    function RedisModules(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, RedisModules.name, options, moduleOptions, clusterOptions) || this;
        _this.bloomCommander = new redisbloom_commander_1.BloomCommander();
        _this.bloomCmkCommander = new redisbloom_cmk_commander_1.BloomCmkCommander();
        _this.bloomCuckooCommander = new redisbloom_cuckoo_commander_1.BloomCuckooCommander();
        _this.bloomTdigestCommander = new redisbloom_tdigest_commander_1.BloomTdigestCommander();
        _this.bloomTopkCommander = new redisbloom_topk_commander_1.BloomTopkCommander();
        _this.aiCommander = new redis_ai_commander_1.RedisAICommander();
        _this.searchCommander = new redisearch_commander_1.SearchCommander();
        _this.gearsCommander = new redisgears_commander_1.GearsCommander();
        _this.graphCommander = new redisgraph_commander_1.GraphCommander();
        _this.rejsonCommander = new rejson_commander_1.RejsonCommander();
        _this.risCommander = new ris_commander_1.RedisIntervalSetsCommander();
        _this.rtsCommander = new rts_commander_1.RedisTimeSeriesCommander();
        _this.searchHelpers = new redisearch_helpers_1.RedisearchHelpers();
        _this.risHelpers = new ris_helpers_1.RedisIntervalSetsHelpers();
        _this.applyMixins(RedisModules, [
            redis_ai_1.RedisAI, ris_1.RedisIntervalSets, redisbloom_1.RedisBloom, redisbloom_cmk_1.RedisBloomCMK, redisbloom_cuckoo_1.RedisBloomCuckoo, redisbloom_topk_1.RedisBloomTopK, redisbloom_tdigest_1.RedisBloomTDigest, redisearch_1.Redisearch, redisgears_1.RedisGears, redisgraph_1.RedisGraph, rejson_1.ReJSON, rts_1.RedisTimeSeries, ris_1.RedisIntervalSets
        ]);
        return _this;
    }
    /**
     * Applying mixings of given objects into base object
     * @param baseObject The base objects
     * @param givenObjects An array of given objects
     * @param addPrefix If to add a prefix of Object name to the properties as ObjectName_FunctionName
     */
    RedisModules.prototype.applyMixins = function (baseObject, givenObjects, addPrefix) {
        if (addPrefix === void 0) { addPrefix = true; }
        givenObjects.forEach(function (givenObject) {
            Object.getOwnPropertyNames(givenObject.prototype).forEach(function (name) {
                if (name !== 'constructor') {
                    var functionName = addPrefix ? "".concat(exports.modulePropNames[givenObject.name], "_").concat(name) : name;
                    Object.defineProperty(baseObject.prototype, functionName, Object.getOwnPropertyDescriptor(givenObject.prototype, name));
                }
            });
        });
    };
    return RedisModules;
}(module_base_1.Module));
exports.RedisModules = RedisModules;
/**
 * A list of converted Redis 'All in One' sub function prefixes per module
 */
exports.modulePropNames = {
    RedisAI: 'ai_module',
    RedisIntervalSets: 'ris_module',
    RedisBloom: 'bloom_module',
    RedisBloomCMK: 'bloom_cmk_module',
    RedisBloomCuckoo: 'bloom_cuckoo_module',
    RedisBloomTopK: 'bloom_topk_module',
    RedisBloomTDigest: 'bloom_tdigest_module',
    Redisearch: 'search_module',
    RedisGears: 'gears_module',
    RedisGraph: 'graph_module',
    ReJSON: 'rejson_module',
    RedisTimeSeries: 'rts_module',
};
