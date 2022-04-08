"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulePropNames = exports.RedisModules = void 0;
const module_base_1 = require("./module.base");
const redis_ai_1 = require("./redis-ai/redis-ai");
const redis_ai_commander_1 = require("./redis-ai/redis-ai.commander");
const redisbloom_1 = require("./bloom/redisbloom");
const redisbloom_cmk_1 = require("./bloom-cmk/redisbloom-cmk");
const redisbloom_cuckoo_1 = require("./bloom-cuckoo/redisbloom-cuckoo");
const redisbloom_tdigest_1 = require("./bloom-tdigest/redisbloom-tdigest");
const redisbloom_topk_1 = require("./bloom-topk/redisbloom-topk");
const redisearch_1 = require("./redisearch/redisearch");
const redisgears_1 = require("./redisgears/redisgears");
const redisgraph_1 = require("./redisgraph/redisgraph");
const rejson_1 = require("./rejson/rejson");
const ris_1 = require("./ris/ris");
const ris_commander_1 = require("./ris/ris.commander");
const rts_1 = require("./rts/rts");
const redisbloom_tdigest_commander_1 = require("./bloom-tdigest/redisbloom-tdigest.commander");
const redisbloom_commander_1 = require("./bloom/redisbloom.commander");
const redisbloom_cmk_commander_1 = require("./bloom-cmk/redisbloom-cmk.commander");
const redisbloom_cuckoo_commander_1 = require("./bloom-cuckoo/redisbloom-cuckoo.commander");
const redisbloom_topk_commander_1 = require("./bloom-topk/redisbloom-topk.commander");
const redisearch_commander_1 = require("./redisearch/redisearch.commander");
const redisgears_commander_1 = require("./redisgears/redisgears.commander");
const redisgraph_commander_1 = require("./redisgraph/redisgraph.commander");
const rejson_commander_1 = require("./rejson/rejson.commander");
const rts_commander_1 = require("./rts/rts.commander");
const redisearch_helpers_1 = require("./redisearch/redisearch.helpers");
const ris_helpers_1 = require("./ris/ris.helpers");
class RedisModules extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisModules.name, options, moduleOptions, clusterOptions);
        this.bloomCommander = new redisbloom_commander_1.BloomCommander();
        this.bloomCmkCommander = new redisbloom_cmk_commander_1.BloomCmkCommander();
        this.bloomCuckooCommander = new redisbloom_cuckoo_commander_1.BloomCuckooCommander();
        this.bloomTdigestCommander = new redisbloom_tdigest_commander_1.BloomTdigestCommander();
        this.bloomTopkCommander = new redisbloom_topk_commander_1.BloomTopkCommander();
        this.aiCommander = new redis_ai_commander_1.RedisAICommander();
        this.searchCommander = new redisearch_commander_1.SearchCommander();
        this.gearsCommander = new redisgears_commander_1.GearsCommander();
        this.graphCommander = new redisgraph_commander_1.GraphCommander();
        this.rejsonCommander = new rejson_commander_1.RejsonCommander();
        this.risCommander = new ris_commander_1.RedisIntervalSetsCommander();
        this.rtsCommander = new rts_commander_1.RedisTimeSeriesCommander();
        this.searchHelpers = new redisearch_helpers_1.RedisearchHelpers();
        this.risHelpers = new ris_helpers_1.RedisIntervalSetsHelpers();
        this.applyMixins(RedisModules, [
            redis_ai_1.RedisAI, ris_1.RedisIntervalSets, redisbloom_1.RedisBloom, redisbloom_cmk_1.RedisBloomCMK, redisbloom_cuckoo_1.RedisBloomCuckoo, redisbloom_topk_1.RedisBloomTopK, redisbloom_tdigest_1.RedisBloomTDigest, redisearch_1.Redisearch, redisgears_1.RedisGears, redisgraph_1.RedisGraph, rejson_1.ReJSON, rts_1.RedisTimeSeries, ris_1.RedisIntervalSets
        ]);
    }
    /**
     * Applying mixings of given objects into base object
     * @param baseObject The base objects
     * @param givenObjects An array of given objects
     * @param addPrefix If to add a prefix of Object name to the properties as ObjectName_FunctionName
     */
    applyMixins(baseObject, givenObjects, addPrefix = true) {
        givenObjects.forEach(givenObject => {
            Object.getOwnPropertyNames(givenObject.prototype).forEach((name) => {
                if (name !== 'constructor') {
                    const functionName = addPrefix ? `${exports.modulePropNames[givenObject.name]}_${name}` : name;
                    Object.defineProperty(baseObject.prototype, functionName, Object.getOwnPropertyDescriptor(givenObject.prototype, name));
                }
            });
        });
    }
}
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
