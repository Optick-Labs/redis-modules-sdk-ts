import * as Redis from 'ioredis';
import { Module, RedisModuleOptions } from '../module.base';
import { GraphConfigInfo } from './redisgraph.types';
export declare class RedisGraph extends Module {
    private graphCommander;
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param clusterNodes The nodes of the cluster
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     * @param clusterOptions The options of the clusters
     */
    constructor(clusterNodes: Redis.ClusterNode[], moduleOptions?: RedisModuleOptions, clusterOptions?: Redis.ClusterOptions);
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param redisOptions The options of the redis database
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     */
    constructor(redisOptions: Redis.RedisOptions, moduleOptions?: RedisModuleOptions);
    /**
     * Executing the given query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    query(name: string, query: string, params?: {
        [key: string]: string;
    }): Promise<string[][]>;
    /**
     * Executing the given readonly query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    readonlyQuery(name: string, query: string, params?: {
        [key: string]: string;
    }): Promise<string[][]>;
    /**
     * Executing a query and produces an execution plan augmented with metrics for each operation's execution
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan, with details on results produced by and time spent in each operation.
     */
    profile(name: string, query: string): Promise<string[]>;
    /**
     * Completely removing the graph and all of its entities
     * @param name The name of the graph
     * @returns String indicating if operation succeeded or failed.
     */
    delete(name: string): Promise<string>;
    /**
     * Constructing a query execution plan but does not run it. Inspect this execution plan to better understand how your query will get executed
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan
     */
    explain(name: string, query: string): Promise<string[]>;
    /**
     * Retrieving a list containing up to 10 of the slowest queries
     * @param id The id of the graph
     * @returns A list containing up to 10 of the slowest queries issued against the given graph ID.
     */
    slowlog(id: number): Promise<string[]>;
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param command The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    config(commandType: 'GET' | 'SET' | 'HELP', option: string, value?: string): Promise<GraphConfigInfo | 'OK' | string | number>;
}
